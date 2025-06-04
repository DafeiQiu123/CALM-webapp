import React, { useState } from "react";
import step3Pressure1 from "../../assets/Survey1/pressure1.gif";
import step3Pressure2 from "../../assets/Survey1/pressure2.gif";
import step3Pressure3 from "../../assets/Survey1/pressure3.gif";

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

const Step3: React.FC<Step3Props> = ({ onNext, onBack }) => {
  const [userInput, setUserInput] = useState("");

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第一步：了解问题所在</h2>
        </div>

        <div className="content-section">
          <p
            className="content-text content-bold"
            style={{ fontSize: "1.5rem" }}
          >
            压力通常会在身体上表现出来。
          </p>

          {/* 图片展示区域 - 使用 GIF 动画 */}
          <div style={{ margin: "3rem 0" }}>
            {/* 主要图片 */}
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  maxWidth: "24rem",
                  height: "16rem",
                  background: "linear-gradient(135deg, #ffeaa7, #fab1a0)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={step3Pressure1}
                  alt="压力对大脑的影响"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="font-size: 4rem">🧠💭</span>';
                    }
                  }}
                />
              </div>
            </div>

            {/* 两张小图片 */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  width: "12rem",
                  height: "12rem",
                  background: "linear-gradient(135deg, #fdcb6e, #e17055)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={step3Pressure2}
                  alt="焦虑的表现"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="font-size: 3rem">😰</span>';
                    }
                  }}
                />
              </div>
              <div
                style={{
                  width: "12rem",
                  height: "12rem",
                  background: "linear-gradient(135deg, #fd79a8, #e84393)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={step3Pressure3}
                  alt="心率加速"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "1rem",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="font-size: 3rem">💓</span>';
                    }
                  }}
                />
              </div>
            </div>
          </div>

          {/* 常见压力反应 */}
          <div style={{ margin: "3rem 0" }}>
            <h3
              className="content-text content-bold"
              style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}
            >
              常见的压力反应有：
            </h3>
            <p className="content-text" style={{ fontSize: "1.25rem" }}>
              肌肉紧绷 | 胸闷 | 刺痛 | 出汗 | 心率加速 | 呼吸急促
            </p>
          </div>

          {/* 用户问答区域 */}
          <div style={{ margin: "3rem 0" }}>
            <h3
              className="content-text content-bold"
              style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}
            >
              当感受到压力时，你的身体会发生什么变化？
            </h3>
            <textarea
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="form-textarea"
              placeholder="请在这里写下你的感受..."
            />
          </div>

          {/* 提示信息 */}
          <div className="tip-box" style={{ borderLeftColor: "#667eea" }}>
            <span className="tip-icon">💡</span>
            <p
              className="tip-text"
              style={{
                fontSize: "1.125rem",
                color: "#667eea",
                fontWeight: "500",
              }}
            >
              即使你无法改变让你烦恼的事情，你仍然可以使用平静技巧来缓解身体上的压力感。
            </p>
          </div>
        </div>

        {/* 导航按钮 */}
        <div className="navigation">
          <button onClick={onBack} className="nav-button">
            <span className="nav-icon">←</span>
          </button>
          <button onClick={onNext} className="nav-button">
            <span className="nav-icon">→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step3;
