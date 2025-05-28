import React, { useState } from "react";

interface SurveyProps {
  onBackToHome: () => void;
}

// 问卷开始页
const SurveyStart: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
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

// 第二步：深呼吸练习
const Step2: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
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

              {/* 呼吸图片 */}
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
                  }}
                >
                  <span style={{ fontSize: "4rem" }}>🫁</span>
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

                {/* 模拟视频区域 */}
                <div className="media-container">
                  <div className="media-placeholder">
                    <div className="text-center">
                      <div className="play-button">
                        <span style={{ fontSize: "2rem" }}>▶️</span>
                      </div>
                      <p
                        style={{
                          fontSize: "1.125rem",
                          color: "var(--gray-700)",
                        }}
                      >
                        深呼吸练习视频
                      </p>
                    </div>
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

// 第三步：压力的身体表现
const Step3: React.FC<{ onNext: () => void; onBack: () => void }> = ({
  onNext,
  onBack,
}) => {
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

          {/* 图片展示区域 */}
          <div style={{ margin: "3rem 0" }}>
            {/* 主要图片 */}
            <div style={{ marginBottom: "2rem", textAlign: "center" }}>
              <div
                style={{
                  width: "100%",
                  maxWidth: "24rem",
                  height: "16rem",
                  background:
                    "linear-gradient(135deg, var(--red-100), var(--orange-100))",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <span style={{ fontSize: "4rem" }}>🧠💭</span>
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
                  background: "var(--yellow-100)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <span style={{ fontSize: "3rem" }}>😰</span>
              </div>
              <div
                style={{
                  width: "12rem",
                  height: "12rem",
                  background: "var(--red-100)",
                  borderRadius: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <span style={{ fontSize: "3rem" }}>💓</span>
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
          <div
            className="tip-box"
            style={{ borderLeftColor: "var(--primary-color)" }}
          >
            <span className="tip-icon">💡</span>
            <p
              className="tip-text"
              style={{
                fontSize: "1.125rem",
                color: "var(--primary-color)",
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

// 最终的反馈页面
const FeedbackPage: React.FC<{
  onBack: () => void;
  onComplete: () => void;
}> = ({ onBack, onComplete }) => {
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

// 主Survey组件
const Survey: React.FC<SurveyProps> = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState("survey-start");

  const handleStepChange = (step: string) => {
    setCurrentStep(step);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "survey-start":
        return (
          <SurveyStart
            onNext={() => handleStepChange("step2")}
            onBack={onBackToHome}
          />
        );
      case "step2":
        return (
          <Step2
            onNext={() => handleStepChange("step3")}
            onBack={() => handleStepChange("survey-start")}
          />
        );
      case "step3":
        return (
          <Step3
            onNext={() => handleStepChange("feedback")}
            onBack={() => handleStepChange("step2")}
          />
        );
      case "feedback":
        return (
          <FeedbackPage
            onBack={() => handleStepChange("step3")}
            onComplete={onBackToHome}
          />
        );
      default:
        return (
          <SurveyStart
            onNext={() => handleStepChange("step2")}
            onBack={onBackToHome}
          />
        );
    }
  };

  return renderCurrentStep();
};

export default Survey;
