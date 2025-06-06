import React, { useState } from "react";
import step5Skills from "../../assets/Survey1/step5_skills.jpg";
import step5Imagine from "../../assets/Survey1/step5_imagine.jpg";
import step5RelaxMuscle from "../../assets/Survey1/step5_relaxmuscle.jpg";

interface Step5Props {
  onNext: () => void;
  onBack: () => void;
}

const Step5: React.FC<Step5Props> = ({ onNext, onBack }) => {
  const [userAnswers, setUserAnswers] = useState({
    place: "",
    see: "",
    hear: "",
    touch: "",
    smell: "",
    taste: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setUserAnswers((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第三步：学习平静技巧</h2>
        </div>

        <div className="content-section">
          {/* 引言 */}
          <p
            className="content-text"
            style={{ fontSize: "1.125rem", lineHeight: "1.7" }}
          >
            正如你所读到的，今天我们学习的平静技巧能有效帮助青少年缓解紧张。
            我们已经学会了第一个技巧 -{" "}
            <strong style={{ color: "#667eea" }}>缓慢深呼吸</strong>，
            接下来让我们继续学习其他的吧！
          </p>

          {/* 技巧展示图片 */}
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
                borderRadius: "1rem",
                padding: "1.5rem",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={step5Skills}
                alt="平静技巧概览"
                style={{
                  maxWidth: "500px",
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.5rem",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span style="font-size: 4rem">🧘‍♀️</span>';
                  }
                }}
              />
            </div>
          </div>

          {/* 小提醒卡片 */}
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
            <h4
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#1976d2",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              💡 小提醒
            </h4>

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
                  +
                </span>
                <span className="content-text" style={{ margin: "0" }}>
                  每个人喜欢的平静技巧不同
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
                  +
                </span>
                <span className="content-text" style={{ margin: "0" }}>
                  找到对你最有效的那些平静技巧！
                </span>
              </div>
            </div>
          </div>

          {/* 想象图片 */}
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <img
              src={step5Imagine}
              alt="想象练习"
              style={{
                maxWidth: "200px",
                width: "100%",
                height: "auto",
                borderRadius: "50%",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                const parent = target.parentElement;
                if (parent) {
                  parent.innerHTML = '<span style="font-size: 3rem">🌅</span>';
                }
              }}
            />
          </div>

          {/* 技巧2指导卡片 */}
          <div className="instruction-card">
            <h3 className="instruction-title">
              如何 <span className="highlight-blue">想象宁静场景</span>：
            </h3>

            <div>
              <div className="step-container">
                <div className="step-number">1</div>
                <div>
                  <p
                    className="step-text"
                    style={{ fontWeight: "600", marginBottom: "0.5rem" }}
                  >
                    如果你愿意，可以闭上眼睛。
                  </p>
                  <p
                    className="step-text"
                    style={{ fontSize: "0.95rem", opacity: "0.8" }}
                  >
                    当然，你也可以在过程中睁着眼睛。
                  </p>
                </div>
              </div>

              <div className="step-container">
                <div className="step-number">2</div>
                <div>
                  <p
                    className="step-text"
                    style={{ fontWeight: "600", marginBottom: "0.5rem" }}
                  >
                    想象一个能让你感到完全安全和平静的地方。
                  </p>
                  <p
                    className="step-text"
                    style={{ fontSize: "0.95rem", opacity: "0.8" }}
                  >
                    它可以是你曾去过的地方，也可以是你虚构出来的任何地方。
                  </p>
                </div>
              </div>

              <div className="step-container">
                <div className="step-number">3</div>
                <div>
                  <p
                    className="step-text"
                    style={{ fontWeight: "600", marginBottom: "0.5rem" }}
                  >
                    在脑海中描绘出这个地方。
                  </p>
                  <p
                    className="step-text"
                    style={{ fontSize: "0.95rem", opacity: "0.8" }}
                  >
                    专注于在这个场景里你能看到、听到、闻到、触碰到和尝到的事物。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="content-text">
            在你自己尝试之前，可以先看看使用这个技巧的示例。
          </p>

          {/* 示例卡片 */}
          <div style={{ margin: "2rem 0" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.125rem",
                fontStyle: "italic",
                color: "#666",
                marginBottom: "1.5rem",
              }}
            >
              示例
            </p>

            <div
              style={{
                background: "#FFFFFE",
                border: "3px solid #667eea",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h4
                style={{
                  color: "#667eea",
                  fontWeight: "bold",
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                }}
              >
                技巧2：想象宁静场景
              </h4>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#333",
                    }}
                  >
                    你选择了什么地方？
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>沙滩</p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#333",
                    }}
                  >
                    你看到了什么？听到了什么？
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>拍打的海浪，海鸥</p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#333",
                    }}
                  >
                    你触碰到了什么？
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>
                    我脚上沾满了粗糙的沙子
                  </p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#333",
                    }}
                  >
                    你闻到了什么？
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>海风</p>
                </div>

                <div>
                  <p
                    style={{
                      fontWeight: "600",
                      marginBottom: "0.25rem",
                      color: "#333",
                    }}
                  >
                    你尝到了什么？
                  </p>
                  <p style={{ margin: "0", color: "#666" }}>
                    香草味冰淇淋，椰子汁
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 轮到你了 */}
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "#667eea",
                fontStyle: "italic",
              }}
            >
              轮到你了！
            </h4>
          </div>

          <p className="content-text" style={{ marginBottom: "2rem" }}>
            假装自己真的在你想象的那个地方，回答以下问题。五个问题不一定都要回答，你想回答多少就回答多少。
          </p>

          {/* 用户输入区域 */}
          <div style={{ margin: "2rem 0" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  你选择了什么宁静场景？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.place}
                  onChange={(e) => handleInputChange("place", e.target.value)}
                  placeholder="例如：森林、海边、房间..."
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  👁️ 你看到了什么？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.see}
                  onChange={(e) => handleInputChange("see", e.target.value)}
                  placeholder="描述你看到的景象..."
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  👂🏻 你听到了什么？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.hear}
                  onChange={(e) => handleInputChange("hear", e.target.value)}
                  placeholder="描述你听到的声音..."
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  ✋🏻 你触碰到了什么？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.touch}
                  onChange={(e) => handleInputChange("touch", e.target.value)}
                  placeholder="描述你触碰到的感觉..."
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  👃🏻 你闻到了什么？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.smell}
                  onChange={(e) => handleInputChange("smell", e.target.value)}
                  placeholder="描述你闻到的气味..."
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontWeight: "600",
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                  }}
                >
                  👅 你尝到了什么？
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={userAnswers.taste}
                  onChange={(e) => handleInputChange("taste", e.target.value)}
                  placeholder="描述你尝到的味道..."
                />
              </div>
            </div>
          </div>

          {/* 肌肉放松提示 */}
          <div style={{ margin: "3rem 0" }}>
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <img
                src={step5RelaxMuscle}
                alt="肌肉放松"
                style={{
                  maxWidth: "200px",
                  width: "100%",
                  height: "auto",
                  borderRadius: "50%",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML =
                      '<span style="font-size: 3rem">💪</span>';
                  }
                }}
              />
            </div>

            <div className="tip-box" style={{ borderLeftColor: "#28a745" }}>
              <span className="tip-icon">💪</span>
              <p
                className="tip-text"
                style={{
                  fontSize: "1.125rem",
                  color: "#28a745",
                  fontWeight: "500",
                }}
              >
                你还可以在深呼吸的同时配合收紧和放松肌肉来平复情绪。
                初次练习时，最好有专家指导。你可以跳转下一页进行尝试！
              </p>
            </div>
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

export default Step5;
