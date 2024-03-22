import { Button } from "@nextui-org/react";
import React from "react";

interface ExperienceBookOptionProps {
  date: Date;
  price: number;
  startTime: string;
  endTime: string;
}
const ExperienceBookOption: React.FC<ExperienceBookOptionProps> = ({
  date,
  price,
  startTime,
  endTime
}) => {
  const DateArr = date.toDateString().split(" ");
  function convertToAMPM(time: string) {
    let timeArr: string[] = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (timeArr.length > 1) {
      timeArr = timeArr.slice(1);
      timeArr[5] = +timeArr[0] < 12 ? " AM" : " PM";
      timeArr[0] = (+timeArr[0] % 12).toString() || (12).toString();
    }
    return timeArr.join("");
  }

  return (
    <div className="mb-5 flex flex-row justify-between border-b-2 py-5">
      <div className="flex flex-col">
        <div>
          <span className="text-sm font-bold">
            {DateArr[0] + ", " + DateArr[1] + " " + DateArr[2]}
          </span>
        </div>
        <div>
          <span className="text-xs">
            {convertToAMPM(startTime)} - {convertToAMPM(endTime)}
          </span>
        </div>
      </div>
      <div className="align-end flex flex-col justify-end">
        <div className="mb-2">
          <span className="text-sm font-bold">₱ {price}</span>
          <span className="text-sm font-bold"> / Person</span>
        </div>
        <div className="flex justify-end">
          <Button color="primary" size="sm">
            Choose
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceBookOption;
