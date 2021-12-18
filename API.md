# 挑战网技术部二考后端要求

#### 二考后端要求完成一个学生自主选课选课系统的后端，要求能够根据请求，返回正确的响应。我们将排课系统简化从周一到周日共7天(可以使用数字1-7)，每天时间分为5个时间段(可以用数字1-5来表示)，每一个时间段最多有一节课，一天最多排五场课，要保证同一个时间不能有两门课，在数据库中要包含课的时间信息。

#### 关于选课的详细信息：不同种类的课为时间不同或者课程不同。比如周四的高数课和周五的高数课不是同一种课，周四的高数课和周四的线代课也是不同种类的的课。换言之，可以同时选择周四的高数课和周五的高数课，也可以同时选择位于周四不同时间段的高数课和线代课。

#### 每种课每人只能选一次，同时每种课每周也只有一次课，每次课在一周内占用的时间是固定的，不考虑一门课一周有两次课和一次课占两个时间段。

#### 可以使用联表查询的地方要使用联表查询

#### ！！！请注意，URL、request要求和文档要求保持一致，response可以不同但内容必须完整！！！

#### 注意：POST和PUT方法可以有请求体，GET和DELETE方法没有请求体。

## 响应

### 当请求成功时，返回以下内容

+ Response 200

  {
    "success": true,
    "data": {
      ...
    }
  }


### 当请求失败时，返回以下内容

+ Response 200

  {
    "success": false,
    "error": "报错信息"
  }
  

# 模块

## 模块目录

[普通用户模块](#user)

[管理员模块](#admin)

<a id="user"><a>

## 普通用户模块

### 接口列表

[用户注册](#register) `POST {base_url}/api/register`

[用户登录](#login) `POST {bause_url}/api/login`

[用户登出](#logout) `DELETE {base_url}/api/logout`

[用户查询所有课程的列表](#get-course) `GET {base_url}/api/course`

[用户查询自己已选课的信息](#get-schedule) `GET {base_ulr}/api/schedule`

[选择一门课](#select-course) `POST {base_url}/api/course/select`

[退选一门课](#delete-course) `DELETE {base_url}/api/course/delete/:id`

### 接口详情

#### 注意： 除了注册和登录，其他API在未登录的情况下不能操作，应该返回未登录的信息。

<a id="register"><a>

#### 用户注册 `POST {base_url}/api/register`

+ 要求
  + 要求用户在注册时学/工号不能重复，如果重复，则应该注册失败
  + 注册的同时登录
  + 初始为非管理员（要变成管理员需要修改数据库）
  + 注册，登录和登出使用session处理 

+ Request 

      {
        "number": "学号",
        "name": "姓名",
        "password": "密码"
      }

+ Response

      {
        "success": true,
        "data": {
          "userId": 1, //用户id
          "number": "学号", //这一项为字符串
          "name": "姓名" // 同上，这一项为字符串
        }
      }

<a id="login"><a>

#### 用户登录 `POST {base_url}/api/login`

+ Request 

      {
        "number": "学号",
        "password": "密码"
      }

+ Response

      {
        "success": true,
        "data": {
          "userId": 1, //用户id
          "number": "学号",
          "name": "姓名"
        }
      }

<a id="logout"><a>

#### 用户登出 `DELETE {base_url}/api/logout`

+ Request 

      // 无需参数，使用session处理

+ Response

      {
        "success": true,
        "data": {
          "login": true //如果之前处于登录状态，则为true，否则为false
        }
      }

<a id="get-course"><a>

#### 用户查询所有课程信息 `GET {base_url}/api/course`

+ 要求

  + 查询参数为页数和每页的研制数量，即返回数据应该是该是第(page-1) * limit+1条到page * limit条记录，此后的查询和此方式一致
  + 返回内容中需要有总数，和一个数组，数组中每个元素包含课程的各项信息

+ Request 
      
      // 注意: 这一项的参数不是请求体，而且是url后面的`?page=1&limit=2`部分
      {
        "page": 1, //第几页(从1开始)
        "limit": 10 //一页几条记录
      }

+ Response

      {
        "success": true,
        "data": {
          "total": 100, //总数量
          "list": [
            {
              "id": 1, //课程id
              "name": "课程名称",
              "capacity": 20, //课程容量
              "number": 18 //已经选择的人数
              "day": 1 // 使用数字1-7来分别表示星期一至星期日,
              "time": 2 // 表示为当天的第几次课
            }
            ···
          ]
        }
      }

<a id="get-shedule"><a>

#### 用户查询自己已选课的课表信息 `GET {base_ulr}/api/schedule` 

+ Request 
      
      // 注意: 这一项的参数不是请求体，而且是url后面的`?page=1&limit=2`部分
      {
        "page": 1, //第几页(从1开始)
        "limit": 10 //一页几条记录     
      }

+ Response

      {
        "success": true,
        "data": {
          "total": 100, //总数量
          "list": [
            {
              "id": 1, //课程id
              "name": "课程名称",
              "capacity": 20, //课程容量
              "number": 18, //已经选择的人数
              "day": 1, // 使用数字1-7来分别表示星期一至星期日,
              "time": 2 // 表示为当天的第几次课
            }
          ]
        }
      }

<a id="select-course"><a>

#### 选择一门课 `POST {base_url}/api/course/select`

+ 要求

  + 一门课只能选一次
  + 同一个时间点如果已经有课，那么不能再选这门课

+ Request 

      {
        "courseId": 1,
      }

+ Response

      {
        "success": true,
      }

<a id="delete-course"><a>

#### 退选一门课 `DELETE {base_url}/api/course/delete/:id`

+ Request 

      //无需请求体，url中id为选课记录的id

+ Response

      {
        "success": true
      }

<a id="admin"><a>

## 管理员模块

### 接口列表

[查看用户列表](#userlist) `GET {base_url}/api/admin/userlist`

[添加新课程](#add-course) `POST {base_url}/api/admin/addcourse`

[删除课程](#delete-course) `DELETE {base_url}/api/admin/delete/course/:id`

[查询某个用户的课表信息](#get-select-user) `GET {base_url}/api/admin/shcedule/user`

[查询某课程被选的情况](#get-select-course) `GET {base_url}/api/admin/schdule/course`

[修改一门课的信息](#change-courseinfo) `PUT {base_url}/api/admin/changeinfo`

### 接口详情

<a id="userlist"><a>

#### 查看用户列表 `GET {base_url}/api/admin/userlist`

+ Request 

      // 注意: 这一项的参数不是请求体，而且是url后面的?`page=1&limit=2`部分
      {
        "page": 1, //第几页
        "limit": 1,   //一页几条记录
      }

+ Response

      {
        "success": true,
        "data": {
          "total": 100, //总数
          "list": [
            {
              "userId": 1, //用户的id
              "number": "学/工号",
              "name": "姓名"
            }
          ]
        }
      }

<a id="add-course"><a>

#### 添加新课程 `POST {base_url}/api/admin/addcourse`

+ Request 

      {
        "name": "课程名",
        "capacity": 100,
        "time": 1,
        "day": 2
      }

+ Response

      {
        "success": true
        "data": {
          "id": 1 //课程的id
        }
      }

<a id="delete-course"><a>

#### 删除课程 `DELETE {base_url}/api/admin/delete/course/:id`

+ Request 

      // 无需请求体，url中id为课程id  

+ Response

      {
        "success": true,
      }

<a id="get-select-user"><a>

#### 查询某个用户的课表信息 `GET {base_url}/api/admin/shcedule/user`

+ Request 

      {
        "userId": 1,
        "page": 1,
        "limit": 10
      }

+ Response

      {
        "success": true,
        "data": {
          "total": 100, //总数
          "list": [
            {
              "id": 1, //选课记录的id
              "courseId": 1, //课程的id
              "userId": 1, //用户的id
              "courseName": "课程名字",
              "capacity": 10, //课程容量
              "number": 8, //已经选择这门课的人数
            }
          ]
        }
      }

<a id="get-select-course"><a>

#### 查询某课表被选情况(查看选择这门课的学生情况) `GET {base_url}/api/admin/schdule/course`

+ Request 

      // 注意: 这一项的参数不是请求体，而且是url后面的?`page=1&limit=2`部分
      {
        "courseId": 1,
        "page": 1,
        "limit": 10
      }

+ Response

      {
        "success": true,
        "data": {
          "total": 100,
          "list": [
            "userId": 1,
            "user": {
              "number": "学/工号",
              "name": "姓名"
            }
          ]
        }
      }

#### 修改一门课的信息 `PUT {base_url}/api/admin/changeinfo`

+ 要求
  + 以下选项中除了课程id以外，其他的是可以修改的选项，课程id不能修改，只是作为查询的条件
  + 可修改的内容有几项则修改几项，不一定要求全部都有，但是不能一项都没有

+ Request

    {
      "id": 1, //课程id
      "name": "课程的名字", 
      "number": 1,
      "capacity": 20, //课程容量
      "day": 1, // 使用数字1-7来分别表示星期一至星期日,
      "time": 2 // 表示为当天的第几次课
    }

+ Response

    {
      "success": true
    }