# 问卷调查系统API

## 项目介绍
这是一个简单的问卷调查系统API，提供了以下功能：
1. 微信小程序用户登录
2. 问卷答题提交
3. 答案数据统计和查询

## 技术栈
- Spring Boot 2.7.12
- MyBatis-Plus 3.5.3.1
- MySQL 8.0
- JWT
- Swagger 3.0
- Lombok

## 系统架构
项目采用经典的三层架构：
- 控制层（Controller）：处理HTTP请求和响应
- 服务层（Service）：实现业务逻辑
- 数据访问层（Repository）：操作数据库

## 核心功能
### 1. 微信小程序用户登录
- 接口：`/api/wx/login`
- 方法：POST
- 参数：
  ```json
  {
    "code": "微信登录code"
  }
  ```
- 返回：
  ```json
  {
    "code": 0,
    "msg": "登录成功",
    "data": {
      "token": "JWT令牌",
      "openid": "微信openid",
      "userId": 123
    }
  }
  ```

### 2. 提交答案
- 接口：`/api/answer/submit`
- 方法：POST
- 参数：
  ```json
  [
    {
      "questionnaireId": 1,
      "questionId": 1,
      "userId": "微信openid",
      "userType": 1,
      "content": "答案内容"
    }
  ]
  ```
- 返回：
  ```json
  {
    "code": 0,
    "msg": "提交成功"
  }
  ```

### 3. 查询答案
- 接口：`/api/answer/list`
- 方法：GET
- 参数：
  - questionnaireId: 问卷ID
  - questionId: 问题ID
  - userId: 用户ID
- 返回：
  ```json
  {
    "code": 0,
    "msg": "操作成功",
    "data": [
      {
        "id": 1,
        "questionnaireId": 1,
        "questionId": 1,
        "userId": "openid",
        "content": "答案内容",
        "createTime": "2023-05-01 12:00:00"
      }
    ]
  }
  ```

## 部署说明
### 环境要求
- JDK 1.8+
- Maven 3.6+
- MySQL 8.0+

### 配置步骤
1. 创建MySQL数据库`questionnaire`
2. 修改`application.yml`中的数据库连接信息
3. 执行以下命令构建项目：
   ```bash
   mvn clean package
   ```
4. 启动项目：
   ```bash
   java -jar target/questionnaire-api.jar
   ```

## 接口文档
启动项目后，访问Swagger接口文档：
```
http://localhost:8080/swagger-ui/index.html
``` 