import React, { useState } from "react";
import SurveyStart from "./SurveyStart";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";
import FeedbackPage from "./FeedbackPage";

interface SurveyProps {
  onBackToHome: () => void;
}

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
            onNext={() => handleStepChange("step4")}
            onBack={() => handleStepChange("step2")}
          />
        );
      case "step4":
        return (
          <Step4
            onNext={() => handleStepChange("step5")}
            onBack={() => handleStepChange("step3")}
          />
        );
      case "step5":
        return (
          <Step5
            onNext={() => handleStepChange("step6")}
            onBack={() => handleStepChange("step4")}
          />
        );
      case "step6":
        return (
          <Step6
            onNext={() => handleStepChange("step7")}
            onBack={() => handleStepChange("step5")}
          />
        );
      case "step7":
        return (
          <Step7
            onNext={() => handleStepChange("step8")}
            onBack={() => handleStepChange("step6")}
          />
        );
      case "step8":
        return (
          <Step8
            onNext={() => handleStepChange("feedback")}
            onBack={() => handleStepChange("step7")}
          />
        );
      case "feedback":
        return (
          <FeedbackPage
            onBack={() => handleStepChange("step7")}
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
