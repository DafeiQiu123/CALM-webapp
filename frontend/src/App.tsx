import React, { useState } from "react";
import HomePage from "./components/HomePage";
import Survey from "./components/Survey/Survey";
import "./App.css"; // 导入样式文件

type AppView = "home" | "survey";

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>("home");

  const handleEnterSurvey = () => {
    setCurrentView("survey");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return <HomePage onEnterSurvey={handleEnterSurvey} />;
      case "survey":
        return <Survey onBackToHome={handleBackToHome} />;
      default:
        return <HomePage onEnterSurvey={handleEnterSurvey} />;
    }
  };

  return <div className="app-container">{renderCurrentView()}</div>;
};

export default App;
