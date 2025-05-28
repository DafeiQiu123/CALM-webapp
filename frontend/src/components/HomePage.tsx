import React from "react";
import { clearUserInfo } from "./utils/wx-mock.ts";

interface UserInfo {
  token: string;
  openid: string;
  userId: number;
  nickname?: string;
  headimgurl?: string;
}

interface HomePageProps {
  onEnterSurvey: () => void;
  userInfo: UserInfo | null;
  onLogout: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnterSurvey, userInfo, onLogout }) => {
  const handleLogout = () => {
    clearUserInfo();
    onLogout();
  };

  return (
      <div className="homepage fade-in">
        <div className="homepage-content">
          {/* 用户信息区域 */}
          {userInfo && (
              <div className="user-info-header">
                <div className="user-avatar-container">
                  <img
                      src={userInfo.headimgurl || 'https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEKQMM4m7NHuicr1g3vF2vcODomjQ3Q3faSUqQkKUgVk9N/132'}
                      alt="用户头像"
                      className="user-avatar"
                  />
                  <div className="user-info-text">
                <span className="user-nickname">
                  {userInfo.nickname || '微信用户'}
                </span>
                    <span className="user-status">已登录</span>
                  </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="logout-btn"
                >
                  退出
                </button>
              </div>
          )}

          <h1 className="homepage-title">平静训练营</h1>
          <p className="homepage-subtitle">心灵成长的旅程</p>

          <div className="homepage-icon">
            <span>🧘‍♀️</span>
          </div>

          {/* 欢迎信息 */}
          {userInfo && (
              <div className="welcome-message">
                <p className="welcome-text">
                  ✅ 欢迎回来，{userInfo.nickname || '用户'}！
                </p>
                <p className="welcome-subtitle">
                  准备好开始您的心灵成长之旅了吗？
                </p>
              </div>
          )}

          <button onClick={onEnterSurvey} className="enter-survey-btn">
            进入问卷
          </button>

          <div className="homepage-description">
            <p>帮助你掌握应对压力和焦虑的技巧，提升心理韧性</p>
          </div>

          <div className="homepage-features">
            <div className="feature-item slide-in">
              <span className="feature-check">✓</span>
              <span className="feature-text">科学的放松技术</span>
            </div>
            <div className="feature-item slide-in">
              <span className="feature-check">✓</span>
              <span className="feature-text">简单易学的冥想练习</span>
            </div>
            <div className="feature-item slide-in">
              <span className="feature-check">✓</span>
              <span className="feature-text">有效的情绪管理方法</span>
            </div>
            <div className="feature-item slide-in">
              <span className="feature-check">✓</span>
              <span className="feature-text">专业的心理健康指导</span>
            </div>
          </div>

          {/* 用户统计信息 */}
          {userInfo && (
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">已完成问卷</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">练习天数</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">0</span>
                  <span className="stat-label">获得徽章</span>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};

export default HomePage;