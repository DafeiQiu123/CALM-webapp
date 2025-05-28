/**
 * 配置文件 - 支持微信网页登录和小程序登录
 */

// 服务器配置
const serverOptions = {
    // 生产环境 - 真实部署的服务器
    // production: 'https://your-server-domain.com',

    // 开发环境 - 本地局域网IP
    development: 'http://wj.funyog.com:7070' // 使用您的实际IP地址
};

// 选择当前使用的环境
const currentEnv = 'development'; // 可选：'production', 'development'

// 设置当前使用的服务器地址
const baseUrl = serverOptions[currentEnv];

// 导出配置
export default {
    // 环境信息
    env: currentEnv,

    // API基础URL
    baseUrl,

    // 请求超时时间（毫秒）
    timeout: 10000,

    // 微信配置
    wx: {
        // 微信小程序AppID
        miniProgramAppId: 'wxd16967caf15e5be1', // 确保与后端配置保持一致

        // 微信网页登录AppID（开放平台）
        webAppId: 'wx1ec2f8367bfba264', // 你的微信开放平台AppID

        // 微信网页登录配置
        webLogin: {
            appId: 'wx1ec2f8367bfba264',
            redirectUri: encodeURIComponent(window.location.origin + '/wechat-callback'),
            responseType: 'code',
            scope: 'snsapi_login',
            state: () => 'wechat_login_' + Date.now() // 动态生成state
        }
    },

    // 是否开启日志
    enableLog: true,

    // 是否开启调试模式
    debug: currentEnv === 'development',

    // API端点
    api: {
        // 微信小程序登录
        wxLogin: `${baseUrl}/api/wx/login`,

        // 微信网页登录
        wxWebLogin: `${baseUrl}/api/wx/web-login`,

        // 用户信息相关
        userInfo: `${baseUrl}/api/user/info`,
        logout: `${baseUrl}/api/user/logout`,

        // 问卷相关
        survey: {
            submit: `${baseUrl}/api/survey/submit`,
            list: `${baseUrl}/api/survey/list`,
            detail: `${baseUrl}/api/survey/detail`
        }
    },

    // 存储键名
    storage: {
        token: 'user_token',
        userInfo: 'user_info',
        loginTime: 'login_time',
        loginType: 'login_type' // 'miniprogram' | 'web'
    },

    // 登录过期时间（7天，毫秒）
    tokenExpiry: 7 * 24 * 60 * 60 * 1000,

    // 微信登录URL生成器
    generateWeChatLoginUrl() {
        const { appId, redirectUri, responseType, scope, state } = this.wx.webLogin;
        return `https://open.weixin.qq.com/connect/qrconnect?` +
            `appid=${appId}&` +
            `redirect_uri=${redirectUri}&` +
            `response_type=${responseType}&` +
            `scope=${scope}&` +
            `state=${typeof state === 'function' ? state() : state}`;
    },

    // 环境检测
    isProduction() {
        return this.env === 'production';
    },

    isDevelopment() {
        return this.env === 'development';
    },

    // 是否支持真实微信登录
    canUseRealWeChatLogin() {
        // 生产环境 + HTTPS 或 微信环境
        const isHttps = window.location.protocol === 'https:';
        const isWeChatEnv = /MicroMessenger/i.test(navigator.userAgent);
        return (this.isProduction() && isHttps) || isWeChatEnv;
    }
};