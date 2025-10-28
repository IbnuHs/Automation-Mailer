import React, { useRef, useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { FaFileUpload } from "react-icons/fa";
import { UploadCSV } from "../components/UploadCSV";
import { TbChecklist } from "react-icons/tb";
import { BsFillSendFill } from "react-icons/bs";
import { CheckTemplate } from "../components/CheckTemplate";
import { SendEmail } from "../components/SendEmail";

export function BroadCast() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const handleNext = () => !isLastStep && setActiveStep(cur => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep(cur => cur - 1);
  const [data, setData] = useState(null);
  const [alreadySent, setAlreadySent] = useState(false);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <UploadCSV data={data} setData={setData} />;
      case 1:
        return <CheckTemplate data={data} />;
      case 2:
        return <SendEmail data={data} setAlreadySent={setAlreadySent} />;
    }
  };

  return (
    <div className="flex flex-col items-center h-full pb-2 box-border overflow-auto">
      <div className="w-full px-24 ">
        <div className=" origin-top">
          <Stepper
            className="!gap-8"
            activeStep={activeStep}
            isLastStep={value => setIsLastStep(value)}
            isFirstStep={value => setIsFirstStep(value)}>
            <Step className="w-fit h-fit p-2" onClick={() => setActiveStep(0)}>
              <FaFileUpload className="h-4 w-4" />
              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  className="text-[14px]"
                  variant="h6"
                  color={activeStep === 0 ? "blue-gray" : "gray"}>
                  Step 1
                </Typography>
                <Typography
                  color={activeStep === 0 ? "blue-gray" : "gray"}
                  className="font-normal text-[13px]">
                  Upload File
                </Typography>
              </div>
            </Step>
            <Step className="w-fit h-fit p-2" onClick={() => setActiveStep(1)}>
              <TbChecklist className="h-4 w-4" />
              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  className="text-[14px]"
                  variant="h6"
                  color={activeStep === 1 ? "blue-gray" : "gray"}>
                  Step 2
                </Typography>
                <Typography
                  color={activeStep === 1 ? "blue-gray" : "gray"}
                  className="font-normal text-[13px]">
                  Check Template
                </Typography>
              </div>
            </Step>
            <Step className="w-fit h-fit p-2" onClick={() => setActiveStep(2)}>
              <BsFillSendFill className="h-4 w-4" />
              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  className="text-[14px]"
                  variant="h6"
                  color={activeStep === 2 ? "blue-gray" : "gray"}>
                  Step 3
                </Typography>
                <Typography
                  color={activeStep === 2 ? "blue-gray" : "gray"}
                  className="font-normal text-[13px]">
                  Send Email
                </Typography>
              </div>
            </Step>
          </Stepper>
        </div>
      </div>
      <div className="h-full mt-16 w-full flex flex-col flex-1 overflow-hidden box-border">
        {renderStepContent()}
      </div>
      <div className="flex mt-2 w-full justify-between scale-90">
        <Button onClick={handlePrev} disabled={isFirstStep || alreadySent}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep || !data}>
          Next
        </Button>
      </div>
    </div>
  );
}
