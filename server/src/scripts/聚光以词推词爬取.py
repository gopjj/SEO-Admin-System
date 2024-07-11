import datetime
import json
import os
import pickle
import sys
import time
from pathlib import Path
from traceback import print_exc

import cloudscraper


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


def main():
    words = sys.argv[1].split(',')
    username = "shuyi001@foodigigroup.com"
    password = "FOO@shuyi01"
    client = cloudscraper.create_scraper(
        browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True},
        debug=False)
    Path("./data/jgData").mkdir(parents=True, exist_ok=True)
    session_dir = './sessions'
    if not manage_session(client, username, password, session_dir):
        print("登录状态异常")
        return
    recommend_url = "https://ad.xiaohongshu.com/api/leona/rtb/tool/keyword/common/recommend"
    datas = []
    current_date_str = datetime.date.today().strftime('%Y-%m-%d')
    for word in words:
        data = {
            "requestType": "search",
            "trackId": "ae16ee8b-009e-45cb-a24a-49cf1da431a5",
            "priceUplift": 0,
            "keyword": word,
            "highEffectRec": 0
        }
        res_json = handle_requests(client, recommend_url, "post", data)
        try:
            for item in res_json["data"].get("wordList", []):
                if word == item["keyword"]:
                    data = {
                        "collectedDate": current_date_str,
                        "keyword": item["keyword"],
                        "monthpv": item["monthpv"],
                        "competitionScore": '无数据' if item["competitionScore"] == 0 else str(item["competitionScore"]),
                        "competitionLevel": item["competitionLevel"],
                        "recommendReason": str(item["recommendReason"]),
                        "bid": item["bid"] / 100,
                    }
                    datas.append(data)
        except Exception:
            print_exc()
            print(res_json)
    current_date_str = datetime.date.today().strftime('%Y-%m-%d')
    with open("./data/jgData/" + current_date_str + '_yicituici_data.json', 'w', encoding='utf-8') as file:
        json.dump(datas, file, ensure_ascii=False, indent=4)
        print(f"保存{"./data/jgData/" + current_date_str + '_yicituici_data.json'}数据成功")


if __name__ == "__main__":
    main()
