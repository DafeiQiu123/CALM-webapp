import React from "react";

interface HomePageProps {
  onEnterSurvey: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onEnterSurvey }) => {
  return (
    <div className="homepage fade-in">
      <div className="homepage-content">
        <h1 className="homepage-title">平静训练营</h1>
        <p className="homepage-subtitle">心灵成长的旅程</p>

        <div className="homepage-icon">
          <span>🧘‍♀️</span>
        </div>

        <button onClick={onEnterSurvey} className="enter-survey-btn">
          进入问卷
        </button>

        <div className="mt-8 text-gray-600">
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
      </div>
    </div>
  );
};

export default HomePage;
