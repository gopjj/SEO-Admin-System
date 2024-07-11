import datetime
import json
import os
import pickle
import time
from pathlib import Path
from traceback import print_exc

import cloudscraper

username = "panda.yan@foodigigroup.com"
password = "FOO@888888"


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


def get_valid_cookie_file(directory, max_age_seconds=604800):
    if not os.path.exists(directory):
        os.makedirs(directory)
        return None
    for filename in os.listdir(directory):
        if filename.startswith('pgy'):
            filepath = os.path.join(directory, filename)
            if is_valid_cookie_file(filepath, max_age_seconds):
                return filepath
            else:
                os.remove(filepath)
    return None


def get_notes_len(client, data):
    note_list_url = 'https://pgy.xiaohongshu.com/api/solar/content/note/list'
    response = handle_requests(client, note_list_url, 'post', data)
    note_total_count = response["data"]["total"]
    return note_total_count


def handle_notes_and_save(client, data, note_total_count):
    print("开始获取笔记数据")
    data["pageSize"] = note_total_count
    note_list = client.post('https://pgy.xiaohongshu.com/api/solar/content/note/list', json=data).json()["data"]["list"]
    notes = []
    current_date_str = datetime.date.today().strftime('%Y-%m-%d')
    for note in note_list:
        note_data = {
            "collectedDate": current_date_str,
            "kolNickName": note["kolNickName"],
            "kolPrice": "￥" + str(note["kolPrice"]),
            "noteTitle": note["noteTitle"],
            "duration": note["duration"] if note["duration"] != 0 else "-",
            "engageRate": str(note["engageRate"]) + "%" if note["engageRate"] != 0 else "-",
            "engageNum": note["engageNum"],
            "avgViewTime": note["avgViewTime"],
            "bizId": note["bizId"],
            "cmtNum": note["cmtNum"],
            "likeNum": note["likeNum"],
            "shareNum": note["shareNum"],
            "readNum": note["readNum"],
            "impNum": note["impNum"],
            "favNum": note["favNum"],
            "followCnt": note["followCnt"],
            "noteCover": note["noteCover"],
            "noteId": note["noteId"],
            "notePublishTime": note["notePublishTime"],
            "noteType": "图文" if note["noteType"] == 1 else "视频",
            "spuName": note["spuName"],
            "readUvNum": note["readUvNum"],
            "totalPlatformPrice": "￥" + str(note["totalPlatformPrice"]),
            "videoPlay5sRate": str(note["videoPlay5sRate"]) + "%" if note["videoPlay5sRate"] != 0 else "-",
            "picRead3sRate": str(note["picRead3sRate"]) + "%" if note["picRead3sRate"] != 0 else "-",
            "kolFanNum": note["kolFanNum"]
        }
        notes.append(note_data)

    with open("./data/pgyData/" + current_date_str + '_notes_data.json', 'w', encoding='utf-8') as file:
        json.dump(notes, file, ensure_ascii=False, indent=4)
        print(f"保存{'./data/pgyData/' + current_date_str + '_notes_data.json'}数据成功")


def manage_session(client, session_dir):
    service_url = "https://pgy.xiaohongshu.com"
    login_url = "https://customer.xiaohongshu.com/api/cas/loginWithAccount"
    session_url = "https://pgy.xiaohongshu.com/api/solar/loginWithTicket"
    cookie_path = get_valid_cookie_file(session_dir)
    if cookie_path:
        load_cookies(client, cookie_path)
        print("载入Cookies成功")
    else:
        login_data = {"account": username, "password": password, "service": service_url}
        res_json = handle_requests(client, login_url, "post", login_data)
        if res_json and "data" in res_json:
            ticket = res_json["data"]
            session_data = {"ticket": ticket}
            res_json = handle_requests(client, session_url, "post", session_data)
            if res_json:
                cookie_path = os.path.join(session_dir, f'pgy_cookies_{time.time()}.pkl')
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


def main():
    client = cloudscraper.create_scraper(
        browser={'browser': 'chrome', 'platform': 'windows', 'desktop': True},
        debug=False)
    Path("./data/pgyData").mkdir(parents=True, exist_ok=True)
    session_dir = './sessions'
    if not manage_session(client, session_dir):
        print("登录状态异常")
        return
    data = {
        "operatorUserIds": [],
        "startTime": "",
        "endTime": "",
        "pageNum": 1,
        "pageSize": 10,
        "sorts": []
    }
    note_total_count = get_notes_len(client, data)
    handle_notes_and_save(client, data, note_total_count)


if __name__ == "__main__":
    main()
