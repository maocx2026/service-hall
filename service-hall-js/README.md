# 服务大厅

## 安装

### 编译依赖

这个项目使用 [node](https://nodejs.org/) 和 [yarn](https://yarnpkg.com/)。请确保你本地安装了它们。

- node 需要 [16.18.x](https://nodejs.org/en/download/) 或以上TLS版本（v17.x及以上未测试，不建议使用）
- yarn 需要 [1.22.x](https://yarnpkg.com/getting-started/install) 或以上版本

### 服务器依赖

1. 运行系统

    在 CentOS 下运行 node v16 版本，需要手动安装特定工具，具体安装命令如下：

    `yum install centos-release-scl`

    `yum install devtoolset-7-gcc*`

    使用安装工具生效

    `source /opt/rh/devtoolset-7/enable` 或者 `scl enable devtoolset-7 bash`

    



## 运行示例（测试/开发使用）

1. 克隆代码，执行命令 ```git clone https://git.doocom.net/szlib/szlib-review-order-js```
2. 进入工程文件夹，执行命令 ```szlib-review-order-js```
3. 安装项目依赖，执行命令 ```yarn install --production=false```
4. 配置 [.env](#.env配置文件说明) 配置项
5. 启动示例，执行命令 ```yarn run serve```

## 构建（生产用）

1. 克隆代码，执行命令 ```git clone https://git.doocom.net/szlib/szlib-review-order-js```
2. 进入工程文件夹，执行命令 ```cd szlib-review-order-js```
3. 安装项目 Webpack 依赖，执行命令 ```yarn install --production=true```
4. 配置 [.env](#.env配置文件说明) 配置项
5. Webpack 构建，执行命令 ```yarn run build```

## 部署

### 复制环境生产使用文件

生产环境下，只需要使用部分文件夹和文件，具体如下：

| 路径                       | 备注                                           |
|---------------------------|------------------------------------------------|
| dist/                     |                                                |
| .env                      | 非必要，环境变量配置                              |

### 配置 nginx

由于构建完后，会生成 dist/ 文件夹，该文件夹内容为静态访问资源，需通过 nginx 配置。

找到 nginx 配置文件，具体修改如下：

```
server {
  ...

  location /my-library/ { /* 访问路径 */
    root   html;
    index  index.html index.htm;
  }
}
```
## .env配置文件说明

项目运行前需要配置 .env 文件，.env 文件不存在项目的版本管理系统(git)当中，需要单独创建，.env 配置文件需存放在项目根目录中。

项目提供配置对照文件 .env.sample，可复制该文件创建 .env 文件。

请注意，提供 .env 配置文件的目的，是为了不能修改直接系统环境变量的情况下，做为补充的配置手段。如果你已经在环境变量配置对应的项，则可以不用创建 .env 文件。

### 项目 .env 文件所需的配置选项

| 键值                            | 备注                               | 必填 | 默认值                           | 示例                     | 构建时使用 | 说明                                                                            | 最后修改时间          |
|--------------------------------|------------------------------------|-----|---------------------------------|--------------------------|----------|--------------------------------------------------------------------------------|---------------------|
| VUE_APP_PORT   | 项目运行端口号 |     | 8080                            | 8080                     |          | 本地调试时指定端口号 |                     |
| VUE_APP_PUBLIC_PATH | 根目录                              |     | /                               | /test-folder/            | ✓        | 部署应用包时的基本url |                     |

#### 外部跳转（外链）相关配置
| 键值                            | 备注                               | 必填 | 默认值                  | 示例                                                               | 构建时使用 | 说明                                       | 最后修改时间          |
|--------------------------------|------------------------------------|-----|------------------------|-------------------------------------------------------------------|-----------|-------------------------------------------|---------------------|
| VUE_APP_ONLINE_DATA_SOURCE_URL | 在线数字资源URL          | ✓   |                        | https://www.szlib.org.cn/digitalResource/index.html | ✓ | 具体生产配置地址请找运维咨询                   |                     |
| VUE_APP_MY_CONSULTANT_URL | 我的咨询 url                | ✓   |                        | https://www.szlib.org.cn/Reference/MyReference.jsp  | ✓          | 具体生产配置地址请找运维咨询                   |                     |
| VUE_APP_MY_SUBJECT_URL | 我的课题url                 | ✓   |                        | https://www.szlib.org.cn/Reference/MyProject.jsp | ✓         | 具体生产配置地址请找运维咨询                   |                     |
| VUE_APP_OPAC_URL | OPAC 详情页基本url    | ✓   |                        | https://www.szlib.org.cn/opac/searchDetail | ✓         | 具体生产配置地址请找运维咨询                   |                     |
| VUE_APP_WEB_HOME_URL | 官网首页url   | ✓   |                        | https://www.szlib.org.cn/ | ✓         | 具体生产配置地址请找运维咨询                   |                     |

## 主要使用技术框架

- [webpack](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Vue.js](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [vue-i18n](https://kazupon.github.io/vue-i18n/)
