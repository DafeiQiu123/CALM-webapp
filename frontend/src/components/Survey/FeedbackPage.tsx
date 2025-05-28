import React, { useState } from "react";

interface FeedbackPageProps {
  onBack: () => void;
  onComplete: () => void;
}

const FeedbackPage: React.FC<FeedbackPageProps> = ({ onBack, onComplete }) => {
  const [feedback, setFeedback] = useState({
    q1: null as number | null,
    q2: null as number | null,
    q3: null as number | null,
    like1: "",
    like2: "",
    like3: "",
    improve1: "",
    improve2: "",
    improve3: "",
    q6: null as number | null,
    q7: null as number | null,
    q8: null as number | null,
    otherFeedback: "",
  });

  const handleOptionSelect = (questionKey: string, value: number) => {
    setFeedback((prev) => ({ ...prev, [questionKey]: value }));
  };

  const handleInputChange = (key: string, value: string) => {
    setFeedback((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const requiredQuestions = ["q1", "q2", "q3", "q6", "q7", "q8"];
    const notAnswered = requiredQuestions.filter(
      (key) => feedback[key as keyof typeof feedback] === null
    );

    if (notAnswered.length > 0) {
      alert("请回答所有单选题");
      return;
    }

    alert("提交成功！感谢您的反馈！");
    onComplete();
  };

  const renderQuestion = (
    questionKey: string,
    title: string,
    options: string[]
  ) => (
    <div style={{ marginBottom: "3rem" }}>
      <h3
        className="content-text content-bold"
        style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
      >
        {title}
      </h3>
      <div className="option-list">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionSelect(questionKey, index + 1)}
            className={`option-item ${
              feedback[questionKey as keyof typeof feedback] === index + 1
                ? "option-selected"
                : ""
            }`}
          >
            <p className="option-text">{option}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        <div className="content-section">
          <div style={{ marginBottom: "3rem" }}>
            <h2
              className="content-text content-bold"
              style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}
            >
              为了帮助我们提升"平静训练营"的使用体验，我们想要了解您的使用感受！
            </h2>
            <p className="content-text">
              您的反馈将会是匿名的，并将被保存和分享给我们的团队。
            </p>
          </div>

          {renderQuestion(
            "q1",
            '1. 总的来说，您喜欢"平静训练营"的外观和体验吗？',
            [
              "我讨厌它的外观和体验",
              "我不喜欢它的外观和体验",
              "我有一点喜欢它的外观和体验",
              "我喜欢它的外观和体验",
              "我非常喜欢它的外观和体验",
            ]
          )}

          {renderQuestion("q2", "2. 总的来说，您能够理解里面的内容吗？", [
            "我感到非常困惑",
            "我不太理解",
            "我有一点理解",
            "我整体上能理解",
            "我能完全理解",
          ])}

          {renderQuestion(
            "q3",
            '3. 在完成"平静训练营"之后，您相信平静技巧能够在多大程度上帮助到您？',
            [
              "平静技巧会伤害我",
              "平静技巧对我没有帮助",
              "平静技巧会对我有一点帮助",
              "平静技巧会对我有帮助",
              "平静技巧会对我有很大的帮助",
            ]
          )}

          {/* 文本输入问题 */}
          <div style={{ marginBottom: "3rem" }}>
            <h3
              className="content-text content-bold"
              style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
            >
              4. 您喜欢"平静训练营"的三个地方是什么？
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      marginRight: "1rem",
                    }}
                  >
                    {num})
                  </span>
                  <input
                    type="text"
                    className="form-input"
                    onChange={(e) =>
                      handleInputChange(`like${num}`, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "3rem" }}>
            <h3
              className="content-text content-bold"
              style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
            >
              5. "平静训练营"的哪三个地方您认为是可以改进的？
            </h3>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <span
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      marginRight: "1rem",
                    }}
                  >
                    {num})
                  </span>
                  <input
                    type="text"
                    className="form-input"
                    onChange={(e) =>
                      handleInputChange(`improve${num}`, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {renderQuestion(
            "q6",
            '6. 您会在多大程度上把"平静训练营"推荐给你的学生/朋友？',
            [
              "我会告诉他们不要尝试",
              "我不会推荐它",
              "我会有一点推荐它",
              "我会推荐它",
              "我会强烈推荐它",
            ]
          )}

          {renderQuestion(
            "q7",
            '7. 您认为其他的青少年会有多喜欢"平静训练营"？',
            [
              "他们会讨厌它",
              "他们不会喜欢它",
              "他们会有点喜欢它",
              "他们会喜欢它",
              "他们会非常喜欢它",
            ]
          )}

          {renderQuestion(
            "q8",
            '8. 您认为"平静训练营"会对其他青少年的帮助有多大？',
            [
              "它不会对他们造成伤害",
              "它不会对他们有帮助",
              "它会对他们有一点帮助",
              "它会对他们有帮助",
              "它会对他们有很大帮助",
            ]
          )}

          <div style={{ marginBottom: "3rem" }}>
            <h3
              className="content-text content-bold"
              style={{ fontSize: "1.25rem", marginBottom: "1.5rem" }}
            >
              9. 您有什么其他想告诉我们的吗？
            </h3>
            <textarea
              className="form-textarea"
              placeholder="请输入您的想法..."
              onChange={(e) =>
                handleInputChange("otherFeedback", e.target.value)
              }
            />
          </div>

          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <button onClick={handleSubmit} className="submit-button">
              提交反馈
            </button>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="navigation">
          <button onClick={onBack} className="nav-button">
            <span className="nav-icon">←</span>
          </button>
          <div style={{ width: "4rem" }}></div> {/* 占位符，保持对齐 */}
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;
