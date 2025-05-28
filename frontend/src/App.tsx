import React, { useState, useEffect } from "react";
import HomePage from "./components/HomePage";
import Survey from "./components/Survey/Survey";
import WeChatLogin from "./components/WeChatLogin";
import { getUserInfo, isLoggedIn } from "./components/utils/wx-mock.ts";
import "./App.css";

type AppView = "login" | "home" | "survey";

interface UserInfo {
  token: string;
  openid: string;
  userId: number;
  nickname?: string;
  headimgurl?: string;
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>("login");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    // 检查用户是否已登录
    if (isLoggedIn()) {
      const savedUserInfo = getUserInfo();
      if (savedUserInfo) {
        setUserInfo(savedUserInfo);
        setCurrentView("home");
      }
    }
  }, []);

  const handleLoginSuccess = (user: UserInfo) => {
    console.log('登录成功，用户信息:', user);
    setUserInfo(user);
    setCurrentView("home");
  };

  const handleEnterSurvey = () => {
    setCurrentView("survey");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const handleBackToLogin = () => {
    setCurrentView("login");
  };

  const handleLogout = () => {
    setUserInfo(null);
    setCurrentView("login");
    // 清除本地存储将在WeChatLogin组件中的logout功能处理
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "login":
        return (
            <WeChatLogin
                onLoginSuccess={handleLoginSuccess}
            />
        );
      case "home":
        return (
            <HomePage
                onEnterSurvey={handleEnterSurvey}
                userInfo={userInfo}
                onLogout={handleLogout}
            />
        );
      case "survey":
        return (
            <Survey
                onBackToHome={handleBackToHome}
                userInfo={userInfo}
            />
        );
      default:
        return (
            <WeChatLogin
                onLoginSuccess={handleLoginSuccess}
            />
        );
    }
  };

  return (
      <div className="app-container">
        {renderCurrentView()}
      </div>
  );
};

export default App;