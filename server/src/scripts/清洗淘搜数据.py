import os
import sys

import pandas as pd
import json


def find_brands_columns(data_frame):
    brands = {}
    current_brand = None
    start_col = None
    for col in range(data_frame.shape[1]):
        if pd.notna(data_frame.iloc[0, col]):
            if current_brand is not None:
                brands[current_brand] = (start_col, col)
            current_brand = str(data_frame.iloc[0, col]).split(' ')[0]
            start_col = col
    if current_brand is not None:
        brands[current_brand] = (start_col, data_frame.shape[1])
    return brands


path = sys.argv[1]
data = []
dfs = pd.read_excel(f"./data/tbData/" + path, header=None, sheet_name=None)
for sheet_name, df in dfs.items():
    brands = find_brands_columns(df)

    for brand, (start, end) in brands.items():
        brand_data = df.iloc[:, start:end].copy()
        brand_data.loc[:, '日期'] = df.iloc[:, start]
        brand_data.loc[:, '搜索人气'] = df.iloc[:, start + 1]
        for index, row in brand_data.iterrows():
            if pd.notna(row['日期']) and pd.notna(row['搜索人气']):
                if row["日期"] == "日期":
                    continue
                data.append({
                    "date": row['日期'].strftime("%Y-%m-%d"),
                    "search": row['搜索人气'],
                    "brand": brand.lower()
                })
json_data = json.dumps(data, ensure_ascii=False, indent=4)

with open(f"./data/tbData/{path.split('.')[0]}.json", 'w', encoding='utf-8') as file:
    file.write(json_data)
