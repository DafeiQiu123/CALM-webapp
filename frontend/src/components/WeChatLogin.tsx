import React, { useState, useEffect } from 'react';
import {
    loginFlow,
    checkWxEnvironment,
    generateWeChatLoginUrl,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    config,
    type UserInfo,
    type WxEnvironment
} from './utils/wx-mock';
import '../WeChatLogin.css';

interface WeChatLoginProps {
    onLoginSuccess: (userInfo: UserInfo) => void;
    onBack?: () => void;
}

const WeChatLogin: React.FC<WeChatLoginProps> = ({ onLoginSuccess, onBack }) => {
    const [loading, setLoading] = useState(false);
    const [wxEnv, setWxEnv] = useState<WxEnvironment | null>(null);
    const [loginMode, setLoginMode] = useState<'auto' | 'real' | 'mock'>('auto');
    const [loginStatus, setLoginStatus] = useState<string>('');

    useEffect(() => {
        const envInfo = checkWxEnvironment();
        setWxEnv(envInfo);
    }, []);

    // 主要登录处理
    const handleLogin = async (mode: 'auto' | 'real' | 'mock' = loginMode): Promise<void> => {
        setLoading(true);
        setLoginStatus(`正在${mode === 'real' ? '启动微信' : mode === 'mock' ? '模拟' : '智能'}登录...`);

        try {
            const result = await loginFlow(mode);
            setLoginStatus('登录成功！');

            setTimeout(() => {
                onLoginSuccess(result);
            }, 800);

        } catch (error) {
            console.error('登录失败:', error);
            setLoginStatus('登录失败');

            setTimeout(() => {
                setLoginStatus('');
                alert(`登录失败: ${error instanceof Error ? error.message : String(error)}`);
            }, 1000);
        } finally {
            setTimeout(() => {
                setLoading(false);
                setLoginStatus('');
            }, 1500);
        }
    };

    // 快捷登录方法
    const quickMockLogin = (): void => {
        handleLogin('mock').catch(console.error);
    };

    // 打开微信二维码
    const openWeChatQR = (): void => {
        const loginUrl = generateWeChatLoginUrl();
        window.open(loginUrl, 'wechat_login', 'width=400,height=500,scrollbars=yes,resizable=yes');
    };

    // 处理模式选择变化
    const handleModeChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        setLoginMode(event.target.value as 'auto' | 'real' | 'mock');
    };

    return (
        <div className="wechat-login-container">
            <div className="wechat-login-box">
                {/* 返回按钮 */}
                {onBack && (
                    <button className="back-button" onClick={onBack} type="button">
                        ←
                    </button>
                )}

                <div className="wechat-title">平静训练营</div>
                <div className="wechat-subtitle">心灵成长的旅程</div>

                <div className="wechat-logo">
                    <div className="wechat-logo-placeholder">💬</div>
                </div>

                <div className="wechat-description">
                    <div className="description-text">使用微信账号登录</div>
                </div>

                {/* 环境提示 */}
                {wxEnv && (
                    <div className={`env-tip ${wxEnv.isWxEnv ? 'env-wechat' : 'env-browser'}`}>
                        {wxEnv.isWxEnv ? '🟢 微信环境' : '🔵 浏览器环境'} |
                        {wxEnv.environment} |
                        {wxEnv.canUseRealLogin ? '支持真实登录' : '建议模拟登录'}
                    </div>
                )}


                {/* 登录模式选择 */}
                <div className="login-mode-selector">
                    <label className="mode-label">登录模式:</label>
                    <select
                        value={loginMode}
                        onChange={handleModeChange}
                        className="mode-select"
                        disabled={loading}
                    >
                        <option value="auto">智能选择 (推荐)</option>
                        <option value="real">真实微信登录</option>
                        <option value="mock">模拟登录 (开发)</option>
                    </select>
                </div>

                {/* 主要登录按钮 */}
                <button
                    className="wechat-login-btn"
                    onClick={() => handleLogin().catch(console.error)}
                    disabled={loading}
                    type="button"
                >
                    {loading ? loginStatus || '登录中...' : '微信一键登录'}
                </button>

                {/* 快捷登录按钮 */}
                <div className="quick-login-buttons">
                    <button
                        className="quick-btn mock-btn"
                        onClick={quickMockLogin}
                        disabled={loading}
                        title="使用模拟数据快速登录，适合开发测试"
                        type="button"
                    >
                        🎮 模拟登录
                    </button>

                    <button
                        className="quick-btn real-btn"
                        onClick={openWeChatQR}
                        disabled={loading}
                        title="打开微信扫码登录页面"
                        type="button"
                    >
                        📱 扫码登录
                    </button>
                </div>
            </div>

            {/* 加载遮罩 */}
            {loading && (
                <div className="loading-overlay">
                    <div className="loading-box">
                        <div className="loading-spinner"></div>
                        <div className="loading-text">
                            {loginStatus || '登录中...'}
                        </div>
                        <div className="loading-subtitle">
                            模式: {loginMode === 'real' ? '真实微信登录' : loginMode === 'mock' ? '模拟登录' : '智能选择'}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeChatLogin;