import React, { useState, useRef } from "react";
import step5QuickCalm from "../../assets/Survey1/step5_quickcalm.jpg";
import step5QuickCalmSound from "../../assets/Survey1/step5_quickcalmsound.mp3";
import step5QuickCalmExample from "../../assets/Survey1/step5_quickcalmexample.jpg";
import step5QuickCalmVideo from "../../assets/Survey1/step5_quickcalmvideo.mp4";

interface Step7Props {
  onNext: () => void;
  onBack: () => void;
}

const Step7: React.FC<Step7Props> = ({ onNext, onBack }) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [hasTriedPractice, setHasTriedPractice] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoPlay = () => {
    setIsVideoPlaying(true);
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setHasTriedPractice(true);
  };

  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">快速平静示例与练习</h2>
        </div>

        <div className="content-section">
          {/* 示例介绍 */}
          <div style={{ margin: "2rem 0" }}>
            <p
              style={{
                textAlign: "center",
                fontSize: "1.25rem",
                fontStyle: "italic",
                color: "#666",
                marginBottom: "2rem",
                fontWeight: "600",
              }}
            >
              示例
            </p>

            <p
              className="content-text"
              style={{
                fontSize: "1.125rem",
                marginBottom: "2rem",
                textAlign: "center",
              }}
            >
              看看小羽同学是怎么进行
              <strong style={{ color: "#ff9800" }}>快速平静</strong>的。
            </p>
          </div>

          {/* 示例图片 */}
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #e1f5fe, #b3e5fc)",
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
                src={step5QuickCalmExample}
                alt="小羽同学示例"
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
                      '<span style="font-size: 4rem">👧</span>';
                  }
                }}
              />
            </div>
          </div>

          {/* 示例音频分享 */}
          <div style={{ margin: "2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #e8f5e8, #c8e6c9)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(76, 175, 80, 0.2)",
              }}
            >
              <div style={{ marginBottom: "1rem", textAlign: "center" }}>
                <span style={{ fontSize: "2rem" }}>🎙️</span>
                <h4
                  style={{
                    color: "#2e7d32",
                    margin: "0.5rem 0",
                    fontSize: "1.1rem",
                  }}
                >
                  听听小羽同学的分享
                </h4>
              </div>

              <audio
                controls
                style={{
                  width: "100%",
                  borderRadius: "0.5rem",
                  marginBottom: "1rem",
                }}
                onPlay={handleAudioPlay}
                onEnded={handleAudioEnded}
                onError={(e) => {
                  console.error("音频加载失败:", e);
                }}
              >
                <source src={step5QuickCalmSound} type="audio/mp3" />
                您的浏览器不支持音频播放。
              </audio>

              <p
                style={{
                  color: "#2e7d32",
                  margin: "0",
                  fontSize: "0.9rem",
                  textAlign: "center",
                  opacity: 0.9,
                }}
              >
                {isAudioPlaying
                  ? "正在播放小羽的分享..."
                  : "点击播放听听小羽怎么说"}
              </p>
            </div>
          </div>

          {/* 文字版示例 */}
          <div style={{ margin: "3rem 0" }}>
            <div
              style={{
                background: "#FFFFFE",
                border: "3px solid #ff9800",
                borderRadius: "1.5rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                position: "relative",
              }}
            >
              {/* 引用标记 */}
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
                💭 小羽同学的分享
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p
                  className="content-text"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.8",
                    color: "#495057",
                    fontStyle: "italic",
                    margin: "0",
                  }}
                >
                  "这是我在快速平静的时候会做的。我会先深吸一口气，然后屏住呼吸，
                  想象我在自己的房间里，我的狗狗就在我的身边。然后，我会放松我的肩膀，
                  从腹部慢慢地呼气，同时继续想象我和狗狗在房间里的情景。
                  这能让我很快感觉好起来。"
                </p>
              </div>
            </div>
          </div>

          {/* 轮到你了标题 */}
          <div style={{ textAlign: "center", margin: "3rem 0 2rem" }}>
            <h3
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                color: "#ff9800",
                fontStyle: "italic",
                textShadow: "2px 2px 4px rgba(255, 152, 0, 0.3)",
              }}
            >
              ✨ 轮到你了！ ✨
            </h3>
          </div>

          <p
            className="content-text"
            style={{
              fontSize: "1.2rem",
              marginBottom: "2rem",
              textAlign: "center",
              fontWeight: "500",
            }}
          >
            跟随动画中的指导，练习
            <strong style={{ color: "#ff9800" }}>快速平静</strong>。
          </p>

          {/* 练习视频区域 */}
          <div style={{ margin: "2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #fff3e0, #ffcc02)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(255, 152, 0, 0.3)",
                textAlign: "center",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontSize: "2rem", color: "#e65100" }}>🎯</span>
                <h4
                  style={{
                    color: "#e65100",
                    margin: "0.5rem 0",
                    fontSize: "1.2rem",
                  }}
                >
                  快速平静练习视频
                </h4>
              </div>

              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "500px",
                  margin: "0 auto",
                  borderRadius: "1rem",
                  overflow: "hidden",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                }}
              >
                <video
                  ref={videoRef}
                  width="100%"
                  height="auto"
                  controls
                  style={{
                    borderRadius: "1rem",
                    cursor: "pointer",
                  }}
                  onPlay={handleVideoPlay}
                  onEnded={handleVideoEnded}
                  onClick={handleVideoClick}
                  onError={(e) => {
                    console.error("视频加载失败:", e);
                  }}
                  poster={step5QuickCalm}
                >
                  <source src={step5QuickCalmVideo} type="video/mp4" />
                  您的浏览器不支持视频播放。
                  {/* 视频加载失败的备用内容 */}
                  <div
                    style={{
                      background: "#f8f9fa",
                      border: "2px dashed #dee2e6",
                      borderRadius: "1rem",
                      padding: "3rem",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "4rem",
                        height: "4rem",
                        background: "#ff9800",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1rem",
                        cursor: "pointer",
                      }}
                    >
                      <span style={{ fontSize: "2rem", color: "white" }}>
                        ▶️
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "1.125rem",
                        color: "#6c757d",
                        margin: "0",
                      }}
                    >
                      快速平静练习动画
                    </p>
                  </div>
                </video>
              </div>

              <p
                style={{
                  color: "#e65100",
                  margin: "1rem 0 0",
                  fontSize: "0.95rem",
                  fontWeight: "500",
                }}
              >
                {isVideoPlaying
                  ? "正在播放练习指导..."
                  : hasTriedPractice
                  ? "练习完成！感觉如何？"
                  : "点击播放跟随练习"}
              </p>
            </div>
          </div>

          {/* 练习完成反馈 */}
          {hasTriedPractice && (
            <div
              className="feedback-box fade-in"
              style={{ borderLeftColor: "#ff9800" }}
            >
              <h4 className="feedback-title" style={{ color: "#ff9800" }}>
                练习完成！🌟
              </h4>
              <p className="feedback-text">
                太棒了！你已经完成了快速平静的练习。
                <strong>这个技巧特别适合在紧急情况下使用</strong>——
                比如考试前、演讲前，或者任何你突然感到紧张的时候。
                记住这四个步骤，它们能帮助你快速恢复平静！
              </p>
            </div>
          )}

          {/* 练习提示 */}
          <div className="tip-box" style={{ borderLeftColor: "#4caf50" }}>
            <span className="tip-icon">💡</span>
            <p
              className="tip-text"
              style={{
                fontSize: "1.125rem",
                color: "#4caf50",
                fontWeight: "500",
              }}
            >
              <strong>练习建议：</strong>
              刚开始可能会觉得有些困难，这很正常！
              多练习几次，你会发现这个技巧变得越来越自然。
              你可以在安全的环境中先练习，然后在需要的时候使用。
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

export default Step7;
