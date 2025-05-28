import React, { useState } from "react";

interface SurveyStartProps {
  onNext: () => void;
  onBack: () => void;
}

const SurveyStart: React.FC<SurveyStartProps> = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const options = [
    "我经常感到压力大、焦虑不安或担心。",
    "我经常感到紧张、情绪低落或空虚无聊。",
    "我容易生气、争吵，陷入不必要的麻烦。",
  ];

  const handleNext = () => {
    if (selectedOption !== null) {
      onNext();
    } else {
      alert("请选择一个选项");
    }
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第一步：了解问题所在</h2>
        </div>

        {/* 内容 */}
        <div className="content-section">
          <p className="content-text">每个人都会遇到问题。</p>
          <p className="content-text content-bold">
            以下哪一个问题是你曾经遇到过的，或者你觉得在将来可能会遇到的？
          </p>

          {/* 提示框 */}
          <div className="tip-box">
            <span className="tip-icon">💡</span>
            <p className="tip-text">
              如果你面临多个困扰，或者不确定该选哪个，也没关系！就挑一个，我们今天一起先来解决它。
            </p>
          </div>
        </div>

        {/* 选项列表 */}
        <div className="option-list">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelectedOption(index)}
              className={`option-item ${
                selectedOption === index ? "option-selected" : ""
              }`}
            >
              <p className="option-text">{option}</p>
            </div>
          ))}
        </div>

        {/* 导航按钮 */}
        <div className="navigation">
          <button onClick={onBack} className="nav-button">
            <span className="nav-icon">←</span>
          </button>
          <button onClick={handleNext} className="nav-button">
            <span className="nav-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyStart;
