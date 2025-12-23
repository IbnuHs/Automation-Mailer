import React, { useState } from "react";
import { Stepper, Step, Button, Typography } from "@material-tailwind/react";
import { FaFileUpload } from "react-icons/fa";
import { TbChecklist } from "react-icons/tb";
import { BsFillSendFill } from "react-icons/bs";
import { UploadCSVIntransit } from "../components/UploadCsvIntransit";
import { CheckTemplateIntransit } from "../components/CheckTemplateIntransit";
import { SendEmail2 } from "../components/SendEmail2";

export function BroadCastIntransit() {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);
  const handleNext = () => !isLastStep && setActiveStep(cur => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep(cur => cur - 1);
  const [data, setData] = useState(null);
  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <UploadCSVIntransit
            data={data}
            setData={setData}
            setActiveStep={setActiveStep}
          />
        );
      case 1:
        return <CheckTemplateIntransit data={data} />;
      case 2:
        return (
          <SendEmail2
            data={data}
            setData={setData}
            // setAlreadySent={setAlreadySent}
            setActiveStep={setActiveStep}
          />
        );
    }
  };
  //   useEffect(() => {
  //     if (isStatusList && Object.keys(isStatusList).length > 0) {
  //       setActiveStep(2);
  //     }
  //   }, []);
  return (
    <div className="flex flex-col items-center flex-1 min-h-0 pb-2 box-border px-10">
      <div className="w-full px-24 ">
        <div className=" origin-top">
          <Stepper
            className="!gap-8"
            activeStep={activeStep}
            isLastStep={value => setIsLastStep(value)}
            isFirstStep={value => setIsFirstStep(value)}>
            <Step className="w-fit h-fit p-2">
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
            <Step className="w-fit h-fit p-2">
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
            <Step className="w-fit h-fit p-2">
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
      <div className="mt-16 w-full flex flex-col flex-1 min-h-0 overflow-hidden box-border">
        {renderStepContent()}
      </div>
      <div className="flex mt-2 w-full justify-between scale-90">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep || !data}>
          Next
        </Button>
      </div>
    </div>
  );
}
