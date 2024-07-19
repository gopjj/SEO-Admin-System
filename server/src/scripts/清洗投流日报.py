import re
import sys

import pandas as pd
import json

path = sys.argv[1]
match = re.search(r'【(.*?)】', path)
brand = ''
if match:
    brand = match.group(1).lower()
df = pd.read_excel(f"./data/dailyData/" + path, index_col=0)
start_date = pd.to_datetime(df.columns[1])
end_date = pd.to_datetime(df.columns[-1])
full_date_range = pd.date_range(start=start_date, end=end_date, freq='D')
records = []
for index, row in df.iterrows():
    dates_processed = set()
    for date, value in row.items():
        date = pd.to_datetime(date)
        if pd.notna(value):
            records.append({
                "brand": brand,
                "author": index,
                "date": date.strftime('%Y-%m-%d'),
                "data": value
            })
            dates_processed.add(date)

    missing_dates = full_date_range.difference(dates_processed)
    for missing_date in missing_dates:
        records.append({
            "brand": brand,
            "author": index,
            "date": missing_date.strftime('%Y-%m-%d'),
            "data": 0
        })
json_data = json.dumps(records, ensure_ascii=False, indent=4)
with open(f"./data/dailyData/{path.split('.')[0]}.json", 'w', encoding='utf-8') as json_file:
    json_file.write(json_data)

