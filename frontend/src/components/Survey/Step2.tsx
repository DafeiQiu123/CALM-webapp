import React, { useState } from "react";
import step2BreatheImg from "../../assets/Survey1/step2_breathe.jpg";
import step2BreatheGif from "../../assets/Survey1/step2_breathe_gif.gif";

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const Step2: React.FC<Step2Props> = ({ onNext, onBack }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [afterRating, setAfterRating] = useState<number | null>(null);

  const handleNext = () => {
    if (selectedRating !== null && afterRating !== null) {
      onNext();
    } else if (selectedRating === null) {
      alert("请选择一个评分");
    } else {
      alert("请完成练习后评分");
    }
  };

  return (
    <div className="survey-container fade-in">
      <div className="survey-content">
        {/* 标题卡片 */}
        <div className="title-card title-card-pink">
          <h2 className="title-text">第一步：了解问题所在</h2>
        </div>

        <div className="content-section">
          <p className="content-text content-bold">不只是你有这样的感受。</p>
          <p className="content-text">超过30%的青少年表示自己感到压力太大。</p>

          <p className="content-text content-bold">
            为什么压力对人的影响如此之大？
          </p>
          <p className="content-text">
            它会通过影响学业表现、运动状态、与亲友的关系等各种方面，让生活陷入困境。
          </p>

          <p className="content-text">让我们先从一个简单的平静技巧开始。</p>
          <p className="content-text">首先，我们想知道你此刻的感受。</p>

          <p className="content-text content-bold">
            请从 1-😊非常平静 到 10-😣非常有压力
            中选择一个数字来评价你此刻的感受。
          </p>

          {/* 评分条 */}
          <div className="rating-container">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setSelectedRating(num)}
                className={`rating-item ${
                  selectedRating === num ? "rating-selected" : ""
                }`}
              >
                <span className="rating-text">{num}</span>
              </button>
            ))}
          </div>

          {selectedRating && (
            <div className="fade-in">
              <p className="content-text">
                感谢你分享自己的感受！现在，我们要一起学习四种平静技巧中的第一种。
              </p>

              {/* 呼吸图片 - 使用本地图片 */}
              <div style={{ textAlign: "center", margin: "2rem 0" }}>
                <div
                  style={{
                    width: "16rem",
                    height: "16rem",
                    background:
                      "linear-gradient(135deg, var(--blue-100), var(--green-100))",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto",
                    boxShadow: "var(--shadow-lg)",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={step2BreatheImg}
                    alt="深呼吸练习"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                    onError={(e) => {
                      // 如果图片加载失败，显示备用内容
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML =
                          '<span style="font-size: 4rem">🫁</span>';
                      }
                    }}
                  />
                </div>
              </div>

              {/* 指导卡片 */}
              <div className="instruction-card">
                <h3 className="instruction-title">
                  如何 <span className="highlight-blue">缓慢深呼吸</span>：
                </h3>

                <div>
                  <div className="step-container">
                    <div className="step-number">1</div>
                    <p className="step-text">
                      将一只手放在肚子上，如果你觉得舒服也可以闭上眼睛。
                    </p>
                  </div>

                  <div className="step-container">
                    <div className="step-number">2</div>
                    <p className="step-text">
                      通过鼻腔缓慢吸气，数到五。要吸进一大口气，像是准备要吹生日蛋糕上的蜡烛一样。确保气息进入腹部而非胸腔，感受腹部隆起带动手掌移动。
                    </p>
                  </div>

                  <div className="step-container">
                    <div className="step-number">3</div>
                    <p className="step-text">
                      现在，缓慢地呼气，数到六。想象正在逐个吹灭排列的蜡烛。
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: "center" }}>
                <p className="content-text content-bold">
                  进行四次
                  <span style={{ color: "var(--primary-color)" }}>
                    缓慢深呼吸
                  </span>
                  。可以跟随视频一起来！
                </p>

                {/* 呼吸练习 GIF 动画 */}
                <div className="media-container">
                  <div
                    style={{
                      background: "linear-gradient(135deg, #e3f2fd, #f1f8e9)",
                      borderRadius: "1rem",
                      padding: "2rem",
                      textAlign: "center",
                      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={step2BreatheGif}
                      alt="深呼吸练习动画指导"
                      style={{
                        width: "100%",
                        maxWidth: "400px",
                        height: "auto",
                        borderRadius: "0.5rem",
                        marginBottom: "1rem",
                      }}
                      onError={(e) => {
                        // 如果GIF加载失败，显示备用内容
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `
                            <div style="background: #f8f9fa; border: 2px dashed #dee2e6; border-radius: 1rem; padding: 3rem; text-align: center;">
                              <div style="width: 4rem; height: 4rem; background: #667eea; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; cursor: pointer;">
                                <span style="font-size: 2rem;">▶️</span>
                              </div>
                              <p style="fontSize: 1.125rem; color: #6c757d;">深呼吸练习动画</p>
                            </div>
                          `;
                        }
                      }}
                    />
                    <p
                      style={{
                        fontSize: "1.125rem",
                        color: "#495057",
                        margin: "0",
                        fontWeight: "500",
                      }}
                    >
                      跟随动画一起进行深呼吸练习
                    </p>
                  </div>
                </div>
              </div>

              <p className="content-text">
                现在，你已经尝试了
                <span
                  style={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                  缓慢深呼吸
                </span>
                ，感觉如何？
              </p>

              <p className="content-text content-bold">
                请从 1-😊非常平静 到 10-😣非常有压力
                对你现在的压力水平进行评分。
              </p>

              {/* 练习后评分条 */}
              <div className="rating-container">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                  <button
                    key={`after-${num}`}
                    onClick={() => setAfterRating(num)}
                    className={`rating-item ${
                      afterRating === num ? "rating-selected" : ""
                    }`}
                  >
                    <span className="rating-text">{num}</span>
                  </button>
                ))}
              </div>

              {afterRating && (
                <div className="fade-in" style={{ marginTop: "2rem" }}>
                  <div className="feedback-box">
                    <h4 className="feedback-title">如果你的压力水平下降了……</h4>
                    <p className="feedback-text">
                      太好了！<strong>缓慢深呼吸</strong>
                      可能是你应对压力的一个有效的平静技巧。
                    </p>
                  </div>

                  <div className="feedback-box">
                    <h4 className="feedback-title">
                      如果你的压力水平没有下降……
                    </h4>
                    <p className="feedback-text">
                      请持续练习！平静技巧不一定第一次就能见效，
                      <strong>练习得越多，它们对我们的帮助就越大。</strong>
                      而且，每个人喜欢的平静技巧不同。随后，我们会教你
                      <strong>另外三种可能更适合你的平静技巧。</strong>
                    </p>
                  </div>

                  <div
                    className="feedback-box"
                    style={{ borderLeftColor: "var(--primary-color)" }}
                  >
                    <h4
                      className="feedback-title"
                      style={{ color: "var(--primary-color)" }}
                    >
                      为什么<strong>缓慢深呼吸</strong>有用呢？
                    </h4>
                    <p className="feedback-text">
                      它能帮助你：<strong>减缓心率</strong> |{" "}
                      <strong>放松肌肉</strong> | <strong>放慢呼吸</strong>
                    </p>
                    <p className="feedback-text">
                      为了更好地理解
                      <strong>身体上的变化如何帮助你平静下来</strong>
                      ，我们来看看当你感到压力时，身体会发生什么。
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
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

export default Step2;
