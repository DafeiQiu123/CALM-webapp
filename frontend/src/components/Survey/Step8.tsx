import React, { useState } from "react";

interface Step8Props {
  onNext: () => void;
  onBack: () => void;
}

const Step8: React.FC<Step8Props> = ({ onNext, onBack }) => {
  const [adviceAnswers, setAdviceAnswers] = useState({
    recommendedTechnique: "",
    whenAndWhere: "",
    howItHelps: "",
  });

  const [practiceAnswers, setPracticeAnswers] = useState({
    chosenTechnique: "",
    practiceTime: "",
    customTime: "",
    expectedFeeling: "",
  });

  const techniques = [
    { value: "breathing", label: "缓慢深呼吸", icon: "🫁" },
    { value: "imagination", label: "想象宁静场景", icon: "🌅" },
    { value: "muscle", label: "放松肌肉", icon: "💪" },
    { value: "quick", label: "快速平静", icon: "⚡" },
  ];

  const practiceTimeOptions = [
    { value: "morning", label: "早上醒来后在床上", icon: "🛏️" },
    { value: "afterBrush", label: "刷完牙后在自己房间里", icon: "🪥" },
    { value: "beforeHomework", label: "写作业前坐在书桌边", icon: "📚" },
    { value: "other", label: "其他（请在下方填写）", icon: "✏️" },
  ];

  const handleAdviceChange = (field: string, value: string) => {
    setAdviceAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const handlePracticeChange = (field: string, value: string) => {
    setPracticeAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    return (
      adviceAnswers.recommendedTechnique &&
      adviceAnswers.whenAndWhere.trim() &&
      adviceAnswers.howItHelps.trim() &&
      practiceAnswers.chosenTechnique &&
      practiceAnswers.practiceTime &&
      (practiceAnswers.practiceTime !== "other" ||
        practiceAnswers.customTime.trim()) &&
      practiceAnswers.expectedFeeling.trim()
    );
  };

  const handleNext = () => {
    if (canProceed()) {
      onNext();
    } else {
      alert("请完成所有必填项");
    }
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第四步：让平静技巧融入你的生活</h2>
        </div>

        <div className="content-section">
          {/* 引言 */}
          <div style={{ margin: "2rem 0" }}>
            <p
              className="content-text"
              style={{ fontSize: "1.125rem", lineHeight: "1.7" }}
            >
              这些平静技巧不会让我们的愤怒情绪彻底消失——毕竟每个人都会有生气的时候。
              但是，如果我们经常使用这些平静技巧，甚至每天都用，我们可以更少感到愤怒，
              也更少和人争吵或是陷入麻烦。
            </p>
          </div>

          {/* 任务说明 */}
          <div
            style={{
              background: "linear-gradient(135deg, #e3f2fd, #bbdefb)",
              borderRadius: "1rem",
              padding: "1.5rem 2rem",
              margin: "2rem 0",
              border: "2px solid #2196f3",
              boxShadow: "0 4px 15px rgba(33, 150, 243, 0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1976d2",
                marginBottom: "1rem",
              }}
            >
              为了更好地帮助你理解如何将平静技巧融入日常生活，接下来你将要……
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                >
                  首先：
                </span>
                <span className="content-text" style={{ margin: "0" }}>
                  给一位想要学会保持冷静的低年级同学一些建议。
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <span
                  style={{
                    color: "#1976d2",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                  }}
                >
                  然后：
                </span>
                <span className="content-text" style={{ margin: "0" }}>
                  制定一个计划，说明你要怎么在日常生活中练习这种技巧。
                </span>
              </div>
            </div>
          </div>

          {/* 第一部分：给同学建议 */}
          <div style={{ margin: "3rem 0" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#e91e63",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              📢 帮助低年级同学
            </h3>

            {/* 同学求助信息 */}
            <div
              style={{
                background: "#fff3e0",
                border: "3px solid #ff9800",
                borderRadius: "1.5rem",
                padding: "2rem",
                margin: "2rem 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-10px",
                  left: "2rem",
                  background: "#ff9800",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                😔 求助信息
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p
                  className="content-text"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "#e65100",
                    fontStyle: "italic",
                    margin: "0",
                  }}
                >
                  "你好！我现在真的很痛苦，每天吃晚饭的时候都会和父母吵架。
                  我总是控制不住大吼大叫被他们训斥，这让我更崩溃了。我该怎么办？"
                </p>
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "#bf360c",
                    textAlign: "right",
                    margin: "1rem 0 0",
                    fontWeight: "600",
                  }}
                >
                  —— 一名低年级同学
                </p>
              </div>
            </div>

            {/* 推荐技巧选择 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                你会推荐哪一种平静技巧给这名低年级同学呢？
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "1.5rem",
                }}
              >
                （可能好几种技巧都会对TA有帮助，但我们现在先选择一种）
              </p>

              <div className="option-list">
                {techniques.map((technique) => (
                  <div
                    key={technique.value}
                    onClick={() =>
                      handleAdviceChange(
                        "recommendedTechnique",
                        technique.value
                      )
                    }
                    className={`option-item ${
                      adviceAnswers.recommendedTechnique === technique.value
                        ? "option-selected"
                        : ""
                    }`}
                  >
                    <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                      {technique.icon}
                    </span>
                    <span className="option-text">{technique.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 使用时间地点 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                这名低年级同学可以在什么时间、什么地点使用这种平静技巧？
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "1rem",
                }}
              >
                比如：在教室里当老师提问时
              </p>
              <textarea
                className="form-textarea"
                value={adviceAnswers.whenAndWhere}
                onChange={(e) =>
                  handleAdviceChange("whenAndWhere", e.target.value)
                }
                placeholder="请描述具体的时间和地点..."
                style={{ minHeight: "100px" }}
              />
            </div>

            {/* 帮助效果 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                你认为这种平静技巧会对TA有什么帮助？
              </h4>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#666",
                  marginBottom: "1rem",
                }}
              >
                尝试这个平静技巧后，TA可能会有什么样的感觉？
              </p>
              <textarea
                className="form-textarea"
                value={adviceAnswers.howItHelps}
                onChange={(e) =>
                  handleAdviceChange("howItHelps", e.target.value)
                }
                placeholder="请描述这个技巧可能带来的帮助和感受..."
                style={{ minHeight: "100px" }}
              />
            </div>
          </div>

          {/* 第二部分：制定自己的练习计划 */}
          <div style={{ margin: "4rem 0" }}>
            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#4caf50",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              📅 制定你的练习计划
            </h3>

            {/* 选择技巧 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                在今天学到的平静技巧中，哪一种是你最想经常练习，甚至每天都练习的呢？
              </h4>

              <div
                className="tip-box"
                style={{ borderLeftColor: "#4caf50", margin: "1rem 0" }}
              >
                <span className="tip-icon">💡</span>
                <p className="tip-text">
                  可以是你今天学到的最喜欢的平静技巧，也可以是你想要练习的技巧。
                  当然，你也可以练习多种技巧！但现在，我们先为其中一种制定一个练习计划。
                </p>
              </div>

              <div className="option-list">
                {techniques.map((technique) => (
                  <div
                    key={technique.value}
                    onClick={() =>
                      handlePracticeChange("chosenTechnique", technique.value)
                    }
                    className={`option-item ${
                      practiceAnswers.chosenTechnique === technique.value
                        ? "option-selected"
                        : ""
                    }`}
                  >
                    <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                      {technique.icon}
                    </span>
                    <span className="option-text">{technique.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 练习时间地点 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1.5rem",
                }}
              >
                你计划要在什么时间、什么地点练习这个平静技巧？
              </h4>

              <div className="option-list">
                {practiceTimeOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() =>
                      handlePracticeChange("practiceTime", option.value)
                    }
                    className={`option-item ${
                      practiceAnswers.practiceTime === option.value
                        ? "option-selected"
                        : ""
                    }`}
                  >
                    <span style={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                      {option.icon}
                    </span>
                    <span className="option-text">{option.label}</span>
                  </div>
                ))}
              </div>

              {/* 自定义时间输入 */}
              {practiceAnswers.practiceTime === "other" && (
                <div style={{ marginTop: "1rem" }}>
                  <input
                    type="text"
                    className="form-input"
                    value={practiceAnswers.customTime}
                    onChange={(e) =>
                      handlePracticeChange("customTime", e.target.value)
                    }
                    placeholder="请描述你的练习时间和地点..."
                  />
                </div>
              )}
            </div>

            {/* 预期感受 */}
            <div style={{ margin: "2rem 0" }}>
              <h4
                className="content-text content-bold"
                style={{
                  fontSize: "1.25rem",
                  marginBottom: "1rem",
                }}
              >
                如果你经常练习这个平静技巧，你觉得自己会有什么样的感觉？
              </h4>
              <textarea
                className="form-textarea"
                value={practiceAnswers.expectedFeeling}
                onChange={(e) =>
                  handlePracticeChange("expectedFeeling", e.target.value)
                }
                placeholder="请描述你预期的感受和变化..."
                style={{ minHeight: "120px" }}
              />
            </div>
          </div>

          {/* 完成提示 */}
          {canProceed() && (
            <div
              className="feedback-box fade-in"
              style={{ borderLeftColor: "#4caf50" }}
            >
              <h4 className="feedback-title" style={{ color: "#4caf50" }}>
                计划制定完成！🎉
              </h4>
              <p className="feedback-text">
                太棒了！你已经完成了建议分享和练习计划制定。
                <strong>坚持练习是关键</strong>
                ——记住，平静技巧需要时间来发挥最大效果。
                相信自己，你一定能做到！
              </p>
            </div>
          )}
        </div>

        {/* 导航按钮 */}
        <div className="navigation">
          <button onClick={onBack} className="nav-button">
            <span className="nav-icon">←</span>
          </button>
          <button
            onClick={handleNext}
            className="nav-button"
            style={{
              opacity: canProceed() ? 1 : 0.5,
              cursor: canProceed() ? "pointer" : "not-allowed",
            }}
          >
            <span className="nav-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step8;
