import React, { useState } from "react";
import step5RelaxMuscle from "../../assets/Survey1/step5_relaxmuscle.jpg";
import step5RelaxSound from "../../assets/Survey1/step5_relaxsound.mp3";
import step5QuickCalm from "../../assets/Survey1/step5_quickcalm.jpg";

interface Step6Props {
  onNext: () => void;
  onBack: () => void;
}

const Step6: React.FC<Step6Props> = ({ onNext, onBack }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasCompletedExercise, setHasCompletedExercise] = useState(false);

  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
    setHasCompletedExercise(true);
  };

  const handleDownloadAudio = () => {
    const link = document.createElement("a");
    link.href = step5RelaxSound;
    link.download = "放松肌肉指导语.mp3";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第三步：学习平静技巧（续）</h2>
        </div>

        <div className="content-section">
          {/* 肌肉放松部分 */}
          <div style={{ margin: "3rem 0" }}>
            {/* 肌肉放松图片 */}
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #e8f5e8, #f0f8ff)",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={step5RelaxMuscle}
                  alt="肌肉放松练习"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="font-size: 4rem">💪</span>';
                    }
                  }}
                />
              </div>
            </div>

            {/* 肌肉放松指导 */}
            <div className="instruction-card">
              <h3 className="instruction-title">
                如何 <span className="highlight-blue">放松肌肉</span>：
              </h3>

              <div>
                <div className="step-container">
                  <div className="step-number">1</div>
                  <p className="step-text">
                    点击播放键，听听专家讲解如何放松肌肉。
                  </p>
                </div>

                <div className="step-container">
                  <div className="step-number">2</div>
                  <p className="step-text">
                    在听的同时，完整地跟随音频里的指示。
                  </p>
                </div>

                <div className="step-container">
                  <div className="step-number">3</div>
                  <p className="step-text">
                    跟着完成8分钟的练习后，看看你有什么样的感觉。
                  </p>
                </div>

                <div className="step-container">
                  <div className="step-number">4</div>
                  <p className="step-text">
                    点击下方文字下载音频。你可以在日常生活中，使用该音频自主练习放松肌肉。
                  </p>
                </div>
              </div>
            </div>

            {/* 音频播放器 */}
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #4caf50, #388e3c)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
                }}
              >
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2rem", color: "white" }}>🎯</span>
                  <h4
                    style={{
                      color: "white",
                      margin: "0.5rem 0",
                      fontSize: "1.1rem",
                    }}
                  >
                    肌肉放松指导语（8分钟）
                  </h4>
                </div>

                <audio
                  controls
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "0.5rem",
                    marginBottom: "1rem",
                  }}
                  onPlay={handleAudioPlay}
                  onEnded={handleAudioEnded}
                  onError={(e) => {
                    console.error("音频加载失败:", e);
                  }}
                >
                  <source src={step5RelaxSound} type="audio/mp3" />
                  您的浏览器不支持音频播放。
                </audio>

                <p
                  style={{
                    color: "white",
                    margin: "0.5rem 0",
                    fontSize: "0.9rem",
                    opacity: 0.9,
                  }}
                >
                  {isAudioPlaying
                    ? "正在播放指导语..."
                    : hasCompletedExercise
                    ? "练习完成！"
                    : "点击播放开始练习"}
                </p>

                <button
                  onClick={handleDownloadAudio}
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "2px solid white",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "white";
                    e.currentTarget.style.color = "#4caf50";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "rgba(255, 255, 255, 0.2)";
                    e.currentTarget.style.color = "white";
                  }}
                >
                  📥 下载音频文件
                </button>
              </div>
            </div>

            {/* 练习完成反馈 */}
            {hasCompletedExercise && (
              <div
                className="feedback-box fade-in"
                style={{ borderLeftColor: "#4caf50" }}
              >
                <h4 className="feedback-title" style={{ color: "#4caf50" }}>
                  练习完成！🎉
                </h4>
                <p className="feedback-text">
                  很好！你已经完成了8分钟的肌肉放松练习。
                  <strong>注意感受你身体的变化</strong>——你现在感觉如何？
                  肌肉是否比之前更放松了？
                </p>
              </div>
            )}
          </div>

          {/* 快速平静部分 */}
          <div style={{ margin: "4rem 0" }}>
            {/* 快速平静图片 */}
            <div style={{ textAlign: "center", margin: "2rem 0" }}>
              <div
                style={{
                  background: "linear-gradient(135deg, #fff3e0, #ffe0b2)",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                  overflow: "hidden",
                }}
              >
                <img
                  src={step5QuickCalm}
                  alt="快速平静技巧"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML =
                        '<span style="font-size: 4rem">⚡</span>';
                    }
                  }}
                />
              </div>
            </div>

            {/* 使用场景说明 */}
            <div
              style={{
                background: "linear-gradient(135deg, #fff8e1, #ffecb3)",
                borderRadius: "1rem",
                padding: "1.5rem",
                margin: "2rem 0",
                border: "2px solid #ffc107",
                boxShadow: "0 4px 15px rgba(255, 193, 7, 0.2)",
              }}
            >
              <h4
                style={{
                  fontSize: "1.25rem",
                  fontWeight: "600",
                  color: "#f57c00",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                ⚡ 什么时候使用快速平静：
              </h4>
              <p
                className="content-text"
                style={{ margin: "0", fontSize: "1.1rem" }}
              >
                在你突然感到非常不开心，并希望快速让自己好转的时候。
                你可能坐在教室里准备参加考试，突然感觉很不好。 这个时候，
                <strong>快速平静</strong>就可以很好地帮助到你。
              </p>
            </div>

            {/* 快速平静指导 */}
            <div className="instruction-card">
              <h3 className="instruction-title">
                如何 <span style={{ color: "#ff9800" }}>快速平静</span>：
              </h3>

              <div>
                <div className="step-container">
                  <div
                    className="step-number"
                    style={{ background: "#ff9800" }}
                  >
                    1
                  </div>
                  <p className="step-text">用鼻子吸气，屏住呼吸几秒钟。</p>
                </div>

                <div className="step-container">
                  <div
                    className="step-number"
                    style={{ background: "#ff9800" }}
                  >
                    2
                  </div>
                  <p className="step-text">
                    在屏住呼吸的同时，想象让你感到平静的场景，并将这个画面保持在脑海中。
                  </p>
                </div>

                <div className="step-container">
                  <div
                    className="step-number"
                    style={{ background: "#ff9800" }}
                  >
                    3
                  </div>
                  <p className="step-text">
                    放松身体紧张的部位。比如，如果你发现自己拳头紧握，就松开手。
                  </p>
                </div>

                <div className="step-container">
                  <div
                    className="step-number"
                    style={{ background: "#ff9800" }}
                  >
                    4
                  </div>
                  <p className="step-text">
                    尽可能慢地呼气，同时想着你的宁静场景，并放松紧张的身体部位。
                  </p>
                </div>
              </div>
            </div>

            {/* 下一步提示 */}
            <div className="tip-box" style={{ borderLeftColor: "#ff9800" }}>
              <span className="tip-icon">👀</span>
              <p
                className="tip-text"
                style={{
                  fontSize: "1.125rem",
                  color: "#ff9800",
                  fontWeight: "500",
                }}
              >
                在尝试之前，请跳转下一页查看一个示例。
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

export default Step6;
