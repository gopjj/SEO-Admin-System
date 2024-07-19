import os
import time
import pickle
import datetime
from pathlib import Path
from traceback import print_exc

import cloudscraper

import pandas as pd

# 如需增加品类词，请在此处修改
selected_categories = ['美妆个护', '母婴', '宠物']
username = "shuyi001@foodigigroup.com"
password = "FOO@shuyi01"


def get_attribute_dict(client, taxonomy_id):
    attribute_base_url = "https://ad.xiaohongshu.com/api/leona/rtb/tool/keyword/industry/taxonomy/attribute?taxonomyId="
    attribute_dict = {}
    attribute_url = attribute_base_url + taxonomy_id
    res_json = handle_requests(client, attribute_url, "get")
    for sub_item in res_json["data"]:
        attribute_dict.update({sub_item['taxonomyName']: sub_item['taxonomyId']})
    return attribute_dict


def process_children(children, current_info, info_list, taxonomy_data):
    for child in children:
        new_info = current_info + [child['taxonomyName']]
        if 'children' in child and child['children'][0]['taxonomyLevel'] != 100:
            process_children(child['children'], new_info, info_list, taxonomy_data)
        else:
            info_list.append(new_info)
            taxonomy_data.append((child['taxonomyName'], child.get('taxonomyId')))


def extract_info_data(data, selected_categories):
    info_list = []
    taxonomy_data = []
    for item in data:
        if item['taxonomyName'] in selected_categories:
            process_children(item['children'], [item['taxonomyName']], info_list, taxonomy_data)
    return info_list, taxonomy_data


def extract_recommend_data(client, info_list, taxonomy_data):
    rows = []
    recommend_url = "https://ad.xiaohongshu.com/api/leona/rtb/tool/keyword/common/recommend"
    for i, (key, value) in enumerate(taxonomy_data):
        print("+++")
        print(info_list[i])
        print(key + ": 数据完成")
        print("+++")
        row = create_title_row(info_list[i])
        rows.append(row)
        attribute_dict = get_attribute_dict(client, value)
        recommend_data = {
            "attributeList": list(attribute_dict.values()),
            "taxonomyId": value,
            "requestType": "industry",
            "priceUplift": 0,
            "attributeNameList": list(attribute_dict.keys())
        }
        res_json = handle_requests(client, recommend_url, "post", recommend_data)
        if "wordBagList" not in res_json['data']:
            for item in res_json['data']["wordList"]:
                row = create_row(item)
                rows.append(row)
        else:
            for word_bag in res_json['data']["wordBagList"]:
                for item in word_bag["wordList"]:
                    row = create_row(item, word_bag['bagName'])
                    rows.append(row)
        print(i + 1, len(taxonomy_data))
    return rows


def create_title_row(info):
    columns = ['词包', '关键词', '推荐理由', '竞争指数', '竞争水平', '月均搜索指数', '市场出价']
    row = {}
    for j in range(len(columns)):
        row[columns[j]] = info[j] if j < len(info) else ''
    return row


def create_row(item, bag_name=''):
    return {
        '词包': bag_name,
        '关键词': item["keyword"],
        '推荐理由': item['recommendReason'],
        '竞争指数': '无' if item['competitionScore'] == 0 else item['competitionScore'],
        '竞争水平': item['competitionLevel'],
        '月均搜索指数': item['monthpv'],
        '市场出价': item['bid'] / 100,
    }


def manage_session(client, username, password, session_dir):
    service_url = "https://ad.xiaohongshu.com"
    login_url = "https://customer.xiaohongshu.com/api/cas/loginWithAccount"
    session_url = "https://ad.xiaohongshu.com/api/leona/session"
    cookie_path = get_valid_cookie_file(session_dir)
    if cookie_path:
        load_cookies(client, cookie_path)
        print("载入Cookies成功")
    else:
        login_data = {"account": username, "password": password, "service": service_url}
        res_json = handle_requests(client, login_url, "post", login_data)
        if res_json and "data" in res_json:
            ticket = res_json["data"]
            session_data = {"ticket": ticket, "clientId": service_url}
            res_json = handle_requests(client, session_url, "post", session_data)
            if res_json:
                cookie_path = os.path.join(session_dir, f'juguang_cookies_{time.time()}.pkl')
                save_cookies(client, cookie_path)
                print("登录成功，Cookies保存成功")
            else:
                print("登录失败")
                return False
    return True


def handle_requests(client, url, method, data=None):
    try:
        if method == 'post':
            response = client.post(url, json=data)
        else:
            response = client.get(url)
        if response.status_code != 200:
            print(f"失败请求：{url}: {response.status_code} - {response.text}")
            return None
        return response.json()
    except Exception:
        print(f"{method}异常请求：{url}: {print_exc()}")
        return None


def save_cookies(client, path):
    with open(path, 'wb') as f:
        pickle.dump(client.cookies, f)


def load_cookies(client, path):
    with open(path, 'rb') as f:
        cookies = pickle.load(f)
        client.cookies.update(cookies)


def is_valid_cookie_file(path, max_age_seconds):
    timestamp = float(path.split('_')[-1].replace('.pkl', ''))
    if (time.time() - timestamp) < max_age_seconds:
        return True
    return False


def get_valid_cookie_file(directory, max_age_seconds=432000):
    if not os.path.exists(directory):
        os.makedirs(directory)
        return None
    for filename in os.listdir(directory):
        if filename.startswith('juguang'):
            filepath = os.path.join(directory, filename)
            if is_valid_cookie_file(filepath, max_age_seconds):
                return filepath
            else:
                os.remove(filepath)
    return None


def save_data(rows, filepath):
    print("数据存储中...请勿关闭程序")
    data_frame = pd.DataFrame(
        columns=['词包', '关键词', '推荐理由', '竞争指数', '竞争水平', '月均搜索指数', '市场出价'])
    data_rows = pd.DataFrame(rows)
    data_frame = pd.concat([data_frame, data_rows], ignore_index=True)
    data_frame.to_excel(filepath, index=False)
    print(f"数据已导出到{filepath}")


def main():
    current_date_str = datetime.date.today().strftime('%Y-%m-%d')
    Path("./juguangData").mkdir(parents=True, exist_ok=True)
    excel_filepath = "./data/jgData/" + current_date_str + "_" + str(selected_categories) + '_行业推词.xlsx'
    session_dir = './sessions'
    taxonomies_url = "https://ad.xiaohongshu.com/api/leona/rtb/tool/keyword/industry/taxonomy"
    client = cloudscraper.create_scraper(
        browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True},
        debug=False)

    if not manage_session(client, username, password, session_dir):
        print("登录状态异常")
        return
    res_json = handle_requests(client, taxonomies_url, "get")
    info_list, taxonomy_data = extract_info_data(res_json["data"]['children'], selected_categories)
    rows = extract_recommend_data(client, info_list, taxonomy_data)
    save_data(rows, excel_filepath)


if __name__ == "__main__":
    main()
