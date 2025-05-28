/**
 * 微信登录工具 - TypeScript版本（修复版）
 */

import config from './config.js';

// 类型定义
interface UserInfo {
    token: string;
    openid: string;
    userId: number;
    nickname?: string;
    headimgurl?: string;
    loginType?: string;
    loginTime?: number;
}

interface LoginResponse {
    code: number;
    msg: string;
    data: UserInfo;
}

interface WxEnvironment {
    isWxEnv: boolean;
    isWxMiniProgram: boolean;
    isWxWork: boolean;
    systemInfo: {
        userAgent: string;
        platform: string;
        language: string;
        cookieEnabled: boolean;
        onLine: boolean;
        protocol: string;
        host: string;
        screen: {
            width: number;
            height: number;
        };
    };
    canUseRealLogin: boolean;
    environment: string;
}

// 模拟的openid前缀
const MOCK_OPENID_PREFIX = 'mock_openid_';

/**
 * 生成微信登录URL
 */
export function generateWeChatLoginUrl(): string {
    return config.generateWeChatLoginUrl();
}

/**
 * 真实微信登录流程
 */
export function realWeChatLogin(): Promise<UserInfo> {
    return new Promise((resolve, reject) => {
        console.log('[WeChat] 启动真实微信登录流程...');

        const loginUrl = generateWeChatLoginUrl();
        console.log('[WeChat] 登录URL:', loginUrl);

        // 打开微信登录窗口
        const popup = window.open(
            loginUrl,
            'wechat_login',
            'width=400,height=500,scrollbars=yes,resizable=yes'
        );

        // 监听消息
        const handleMessage = (event: MessageEvent): void => {
            if (event.origin !== window.location.origin) return;

            if (event.data.type === 'WECHAT_LOGIN_SUCCESS') {
                window.removeEventListener('message', handleMessage);
                popup?.close();
                resolve(event.data.userInfo as UserInfo);
            } else if (event.data.type === 'WECHAT_LOGIN_ERROR') {
                window.removeEventListener('message', handleMessage);
                popup?.close();
                reject(new Error(event.data.error || '微信登录失败'));
            }
        };

        window.addEventListener('message', handleMessage);

        // 监听弹窗关闭
        const checkClosed = setInterval(() => {
            if (popup?.closed) {
                clearInterval(checkClosed);
                window.removeEventListener('message', handleMessage);
                reject(new Error('用户取消登录'));
            }
        }, 1000);
    });
}

/**
 * 模拟微信登录流程
 */
export function mockWxLogin(): Promise<LoginResponse> {
    return new Promise((resolve) => {
        console.log('[Mock] 模拟微信登录中...');

        // 模拟的用户数据
        const mockUserData: UserInfo = {
            token: 'mock_token_' + Date.now(),
            openid: MOCK_OPENID_PREFIX + Math.random().toString(36).substring(2),
            userId: Math.floor(Math.random() * 1000),
            nickname: '微信用户' + Math.floor(Math.random() * 100),
            headimgurl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKQMM4m7NHuicr1g3vF2vcODomjQ3Q3faSUqQkKUgVk9N/132',
            loginType: 'mock'
        };

        // 模拟网络延迟
        setTimeout(() => {
            console.log('[Mock] 登录成功:', mockUserData);
            resolve({
                code: 0,
                msg: '登录成功',
                data: mockUserData
            });
        }, 500);
    });
}

/**
 * 智能登录 - 根据环境和配置自动选择登录方式
 */
export function smartLogin(forceReal = false): Promise<UserInfo | LoginResponse> {
    const canUseReal = config.canUseRealWeChatLogin();
    const shouldUseReal = forceReal || (config.isProduction() && canUseReal);

    if (shouldUseReal) {
        console.log('[Smart Login] 使用真实微信登录');
        return realWeChatLogin();
    } else {
        console.log('[Smart Login] 使用模拟登录 (开发环境)');
        return mockWxLogin();
    }
}

/**
 * 判断当前登录是否为模拟登录
 */
export function isMockLogin(): boolean {
    const userInfo = getUserInfo();
    if (!userInfo) return false;

    return Boolean(userInfo.openid && userInfo.openid.startsWith(MOCK_OPENID_PREFIX));
}

/**
 * 检查微信环境
 */
export function checkWxEnvironment(): WxEnvironment {
    const userAgent = navigator.userAgent;

    // 判断是否在微信环境中
    const isWxEnv = /MicroMessenger/i.test(userAgent);
    const isWxMiniProgram = /miniProgram/i.test(userAgent);
    const isWxWork = /wxwork/i.test(userAgent);

    // 获取系统信息
    const systemInfo = {
        userAgent,
        platform: navigator.platform,
        language: navigator.language,
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        protocol: window.location.protocol,
        host: window.location.host,
        screen: {
            width: screen.width,
            height: screen.height
        }
    };

    return {
        isWxEnv,
        isWxMiniProgram,
        isWxWork,
        systemInfo,
        canUseRealLogin: config.canUseRealWeChatLogin(),
        environment: config.env
    };
}

/**
 * 保存用户登录信息到本地存储
 */
export function saveUserInfo(userInfo: UserInfo): boolean {
    try {
        const loginTime = Date.now();
        const loginData: UserInfo = {
            ...userInfo,
            loginTime,
            loginType: userInfo.loginType || (isMockLogin() ? 'mock' : 'real')
        };

        localStorage.setItem(config.storage.token, userInfo.token);
        localStorage.setItem(config.storage.userInfo, JSON.stringify(loginData));
        localStorage.setItem(config.storage.loginTime, loginTime.toString());
        localStorage.setItem(config.storage.loginType, loginData.loginType || 'unknown');

        if (config.enableLog) {
            console.log('[Storage] 用户信息保存成功:', loginData);
        }
        return true;
    } catch (error) {
        console.error('[Storage] 用户信息保存失败:', error);
        return false;
    }
}

/**
 * 获取本地存储的用户信息
 */
export function getUserInfo(): UserInfo | null {
    try {
        const token = localStorage.getItem(config.storage.token);
        const userInfo = localStorage.getItem(config.storage.userInfo);
        const loginTime = localStorage.getItem(config.storage.loginTime);
        const loginType = localStorage.getItem(config.storage.loginType);

        if (token && userInfo) {
            const userData = JSON.parse(userInfo) as UserInfo;
            return {
                token,
                loginTime: loginTime ? parseInt(loginTime) : undefined,
                loginType: loginType || 'unknown',
                ...userData
            };
        }
        return null;
    } catch (error) {
        console.error('[Storage] 获取用户信息失败:', error);
        return null;
    }
}

/**
 * 清除本地存储的用户信息
 */
export function clearUserInfo(): boolean {
    try {
        localStorage.removeItem(config.storage.token);
        localStorage.removeItem(config.storage.userInfo);
        localStorage.removeItem(config.storage.loginTime);
        localStorage.removeItem(config.storage.loginType);

        if (config.enableLog) {
            console.log('[Storage] 用户信息清除成功');
        }
        return true;
    } catch (error) {
        console.error('[Storage] 用户信息清除失败:', error);
        return false;
    }
}

/**
 * 检查用户是否已登录
 */
export function isLoggedIn(): boolean {
    const token = localStorage.getItem(config.storage.token);
    const userInfo = localStorage.getItem(config.storage.userInfo);

    if (!token || !userInfo) return false;

    // 检查登录是否过期
    const loginTime = localStorage.getItem(config.storage.loginTime);
    if (loginTime) {
        const elapsed = Date.now() - parseInt(loginTime);
        if (elapsed > config.tokenExpiry) {
            if (config.enableLog) {
                console.log('[Auth] 登录已过期，自动清除');
            }
            clearUserInfo();
            return false;
        }
    }

    return true;
}

/**
 * 发送登录请求到后端
 */
export async function sendLoginRequest(
    code: string,
    userInfo: unknown, // 改为 unknown 类型避免 any
    loginType: 'web' | 'miniprogram' = 'web'
): Promise<LoginResponse> {
    const apiUrl = loginType === 'web' ? config.api.wxWebLogin : config.api.wxLogin;

    const loginData = {
        code: code,
        userInfo: JSON.stringify(userInfo),
        loginType: loginType,
        timestamp: Date.now()
    };

    if (config.enableLog) {
        console.log('[API] 发送登录请求:', { ...loginData, userInfo: '...' });
        console.log('[API] 请求地址:', apiUrl);
    }

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), config.timeout);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json() as LoginResponse;

        if (config.enableLog) {
            console.log('[API] 登录响应:', result);
        }

        return result;
    } catch (error) {
        console.error('[API] 登录请求失败:', error);
        throw error;
    }
}

/**
 * 完整的登录流程
 */
export async function loginFlow(mode: 'auto' | 'real' | 'mock' = 'auto'): Promise<UserInfo> {
    try {
        let loginResponse: UserInfo | LoginResponse;

        switch (mode) {
            case 'real':
                // 强制使用真实微信登录
                console.log('[Login Flow] 强制使用真实微信登录');
                loginResponse = await realWeChatLogin();
                break;

            case 'mock':
                // 强制使用模拟登录
                console.log('[Login Flow] 强制使用模拟登录');
                loginResponse = await mockWxLogin();
                break;

            default:
                // 自动选择模式
                console.log('[Login Flow] 自动选择登录模式');

                if (config.canUseRealWeChatLogin() && config.isProduction()) {
                    // 生产环境且支持真实登录
                    try {
                        loginResponse = await realWeChatLogin();
                    } catch (error) {
                        console.warn('[Login Flow] 真实登录失败，降级到模拟登录:', error);
                        loginResponse = await mockWxLogin();
                    }
                } else {
                    // 开发环境或不支持真实登录
                    loginResponse = await mockWxLogin();
                }
        }

        // 处理登录响应 - 使用类型守卫
        const userData: UserInfo = isLoginResponse(loginResponse)
            ? loginResponse.data
            : loginResponse;

        // 保存登录信息
        if (saveUserInfo(userData)) {
            if (config.enableLog) {
                console.log('[Login Flow] 登录流程完成:', userData);
            }
            return userData;
        } else {
            throw new Error('保存用户信息失败');
        }

    } catch (error) {
        console.error('[Login Flow] 登录流程失败:', error);
        throw error;
    }
}

/**
 * 类型守卫：判断是否为 LoginResponse
 */
function isLoginResponse(response: UserInfo | LoginResponse): response is LoginResponse {
    return 'code' in response && 'data' in response;
}

/**
 * 退出登录
 */
export async function logout(): Promise<boolean> {
    try {
        // 尝试调用后端退出接口
        if (config.api.logout && isLoggedIn()) {
            const token = localStorage.getItem(config.storage.token);
            try {
                await fetch(config.api.logout, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            } catch (error) {
                console.warn('[Logout] 后端退出接口调用失败:', error);
            }
        }

        // 清除本地存储
        clearUserInfo();

        if (config.enableLog) {
            console.log('[Logout] 退出登录成功');
        }

        return true;
    } catch (error) {
        console.error('[Logout] 退出登录失败:', error);
        return false;
    }
}

// 导出配置
export { config };

// 导出类型
export type { UserInfo, LoginResponse, WxEnvironment };

// 默认导出
export default {
    generateWeChatLoginUrl,
    realWeChatLogin,
    mockWxLogin,
    smartLogin,
    isMockLogin,
    checkWxEnvironment,
    saveUserInfo,
    getUserInfo,
    clearUserInfo,
    isLoggedIn,
    sendLoginRequest,
    loginFlow,
    logout,
    config
};