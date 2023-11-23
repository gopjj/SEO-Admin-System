# SEO-Admin-System

SEO admin system

## Client

### Setup

yarn

yarn start

## Server

### Setup

prerequisite：

1. Install NodeJS : https://nodejs.org/en
2. Install mongoDb on local enviroment: https://www.mongodb.com/try/download/community

yarn

yarn start



代码目录
```js
+-- src/                               ---核心代码目录
|   +-- pages                          ---所有页面存放目录
|   |	+-- brand                      ---品牌页面存放组件目录
|   |   |	+--componet				   ---组件存放目录
|	|	| 	|	---search.tsx		   ---图表查询组件
|	|	| 	|	---brand.tsx		   ---品牌表格组件
|	|	| 	|	---brand1.tsx		   ---品牌1表格组件
|	|	| 	|	---brand2.tsx          ---品牌2表格组件
|   |   +-- dashboard                  ---首页组件
|   |   |   +--api
|	|	|	|	---index.ts			   ---后端api接口
|	|	|	+--componet
| 	|	|	|	+--styles
|	|	|	|	|	---daily.module.css		---日报样式
|	|	|	|	|	---dashboard.module.css	---首页样式
|	|	|	|	|	---datacard.module.css	---数据卡片样式
|	|	|	|	|	---module.css			---首页样式
|	|	|	|	|	---progress.css			---进度样式
|	|	|	|	---daily.tsx				---日报组件
|	|	|	|	---dashboardChart1.tsx		---表格1组件
|	|	|	|	---databoardChart2.tsx		---表格组件
|	|	|	|	---datacard.tsx				---数据卡片组件
|	|	|	|	---keyword.tsx				---关键词组件好
|	|	|	|	---record.tsx				---收录组件
|	|	|	---dashboard.tsx				---首页组件
|   |   +-- login  				       ---登录组件
|	|	|	+--styles
| 	| 	| 	|	---login.module.css    ---登录样式模块文件
|	|	|	---login.tsx			   ---登录组件
|   |    +-- charts  
```

## Server

### Setup

prerequisite：

1. Install NodeJS : https://nodejs.org/en
2. Install mongoDb on local enviroment: https://www.mongodb.com/try/download/community

yarn

yarn start
