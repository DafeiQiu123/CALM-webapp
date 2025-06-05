import React, { useState } from "react";
import SurveyStart from "./SurveyStart";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
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
            onNext={() => handleStepChange("feedback")}
            onBack={() => handleStepChange("step3")}
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
