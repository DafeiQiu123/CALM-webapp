import React, { useState } from "react";
import step4Chart from "../../assets/Survey1/step4_chart.png";
import step4Sound from "../../assets/Survey1/step4_sound.mp3";

interface Step4Props {
  onNext: () => void;
  onBack: () => void;
}

const Step4: React.FC<Step4Props> = ({ onNext, onBack }) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const handleAudioPlay = () => {
    setIsAudioPlaying(true);
  };

  const handleAudioEnded = () => {
    setIsAudioPlaying(false);
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第二步：专家和同龄人的经验</h2>
        </div>

        <div className="content-section">
          {/* 引言 */}
          <p
            className="content-text"
            style={{ fontSize: "1.125rem", lineHeight: "1.7" }}
          >
            或许你会觉得，像缓慢深呼吸这样简单的动作能缓解紧张和难过听起来不可思议。
            然而，众多科学家已经对我们今天要教给你的这些平静技巧进行了深入研究。
            科学研究证实，这些技巧确实能有效帮助人们改善情绪。
          </p>

          {/* 研究介绍 */}
          <div style={{ margin: "3rem 0" }}>
            <h3
              className="content-text content-bold"
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
                color: "#f39c12",
              }}
            >
              首先：让我们了解一项美国大学的研究
            </h3>

            <p
              className="content-text content-bold"
              style={{ fontSize: "1.125rem", marginBottom: "1.5rem" }}
            >
              在该研究中，科研人员教了参与研究的青少年平静技巧，比如缓慢深呼吸和肌肉放松。
            </p>

            {/* 研究结果列表 */}
            <div style={{ margin: "2rem 0" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "rgba(243, 156, 18, 0.1)",
                  borderRadius: "0.75rem",
                  borderLeft: "4px solid #f39c12",
                }}
              >
                <span
                  style={{
                    color: "#f39c12",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                <p className="content-text" style={{ margin: "0" }}>
                  这些青少年<strong>非常努力</strong>地
                  <strong>练习了平静技巧</strong>。
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "rgba(243, 156, 18, 0.1)",
                  borderRadius: "0.75rem",
                  borderLeft: "4px solid #f39c12",
                }}
              >
                <span
                  style={{
                    color: "#f39c12",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                <p className="content-text" style={{ margin: "0" }}>
                  过程并不容易，他们
                  <em>
                    <strong>有时</strong>
                  </em>
                  <strong>还是会感到紧张和悲伤。</strong>
                  ——这是人类的正常反应！
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "rgba(243, 156, 18, 0.1)",
                  borderRadius: "0.75rem",
                  borderLeft: "4px solid #f39c12",
                }}
              >
                <span
                  style={{
                    color: "#f39c12",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                <p className="content-text" style={{ margin: "0" }}>
                  持续练习平静技巧<strong>几周</strong>后，
                  <strong>
                    这些青少年明显变得不那么紧张，也更少感到悲伤了
                  </strong>
                  。
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                  padding: "1rem",
                  background: "rgba(243, 156, 18, 0.1)",
                  borderRadius: "0.75rem",
                  borderLeft: "4px solid #f39c12",
                }}
              >
                <span
                  style={{
                    color: "#f39c12",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    marginRight: "1rem",
                    flexShrink: 0,
                  }}
                >
                  +
                </span>
                <p className="content-text" style={{ margin: "0" }}>
                  追踪研究显示，<strong>一年后</strong>，他们
                  <strong>仍然</strong>保持着使用这些技巧的习惯，
                  且紧张和悲伤情绪也比过去更少。
                </p>
              </div>
            </div>
          </div>

          {/* 研究图表 */}
          <div style={{ textAlign: "center", margin: "3rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={step4Chart}
                alt="研究结果图表"
                style={{
                  maxWidth: "300px",
                  width: "100%",
                  height: "auto",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div style="padding: 2rem; background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 0.5rem;">
                        <span style="font-size: 3rem;">📊</span>
                        <p style="margin: 1rem 0 0; color: #6c757d;">研究结果图表</p>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          </div>

          {/* 案例分享介绍 */}
          <div style={{ margin: "3rem 0" }}>
            <h3
              className="content-text"
              style={{
                fontSize: "1.5rem",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ color: "#f39c12", fontWeight: "bold" }}>
                然后：
              </span>
              我们来听听高年级同学小陈的故事，听他是如何通过这些平静技巧得到帮助的。
            </h3>
          </div>

          {/* 音频播放器 */}
          <div style={{ textAlign: "center", margin: "2rem 0" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 4px 15px rgba(102, 126, 234, 0.3)",
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <span style={{ fontSize: "2rem", color: "white" }}>🎧</span>
              </div>
              <audio
                controls
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  borderRadius: "0.5rem",
                }}
                onPlay={handleAudioPlay}
                onEnded={handleAudioEnded}
                onError={(e) => {
                  console.error("音频加载失败:", e);
                }}
              >
                <source src={step4Sound} type="audio/mp3" />
                您的浏览器不支持音频播放。
              </audio>
              <p
                style={{
                  color: "white",
                  margin: "1rem 0 0",
                  fontSize: "0.9rem",
                  opacity: 0.9,
                }}
              >
                {isAudioPlaying ? "正在播放..." : "点击播放小陈的分享"}
              </p>
            </div>
          </div>

          {/* 案例内容卡片 */}
          <div style={{ margin: "3rem 0" }}>
            <div
              style={{
                background: "#FFFFFE",
                border: "3px solid #667eea",
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
                  background: "#667eea",
                  color: "white",
                  padding: "0.5rem 1rem",
                  borderRadius: "1rem",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              >
                💬 学生分享
              </div>

              <div style={{ marginTop: "1rem" }}>
                <p
                  className="content-text"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "#495057",
                    marginBottom: "1.5rem",
                  }}
                >
                  "几年前，我总是动不动就紧张，看什么都觉得烦，甚至连自己都讨厌。
                  晚上翻来覆去睡不着，第二天起来更难受，简直像掉进了一个死循环。
                </p>

                <p
                  className="content-text"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "#495057",
                    marginBottom: "1.5rem",
                  }}
                >
                  我觉得不能再这样下去了，所以尝试了一些方法来让自己放松下来。刚开始做起来很难！
                  但是反复练习后，我学会了一察觉到自己有紧张情绪的出现，就立刻想象一个能让自己感到平静的地方，
                  我会经常想一间森林中的小屋，同时用腹部缓慢地吸气、呼气。
                  在每晚睡觉前，我也会想象我的宁静场景，呼吸并放松我的肌肉。
                </p>

                <p
                  className="content-text"
                  style={{
                    fontSize: "1.1rem",
                    lineHeight: "1.7",
                    color: "#495057",
                    marginBottom: "1.5rem",
                  }}
                >
                  这些方法对我帮助很大。当然，我偶尔还是会有陷入情绪低谷的时候，
                  但现在我知道怎么阻断这些情绪，避免陷入一个又一个同样的恶性循环。
                  现在，我不那么紧绷了，整个人轻松快乐了不少。大多数晚上，我躺下十分钟就能睡着。"
                </p>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#6c757d",
                    fontStyle: "italic",
                    textAlign: "right",
                    margin: "0",
                  }}
                >
                  （为保护隐私，名字、声音和细节已做修改。）
                </p>
              </div>
            </div>
          </div>

          {/* 总结提示 */}
          <div className="tip-box" style={{ borderLeftColor: "#28a745" }}>
            <span className="tip-icon">✨</span>
            <p
              className="tip-text"
              style={{
                fontSize: "1.125rem",
                color: "#28a745",
                fontWeight: "500",
              }}
            >
              科学研究和真实案例都证明，平静技巧确实有效！
              关键是要坚持练习，即使开始时可能会觉得困难。
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

export default Step4;
