import { Card } from "@nextui-org/react";
import React from "react";

const days = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];

interface DaySelectorProps {
  today: number;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ today }) => {
  return (
    <div className="hidden w-1/3 lg:flex lg:flex-col lg:gap-6">
      {days.map((day, index) => (
        <Card
          key={day}
          className={`${
            today === index ? "bg-purple-gem" : "bg-charcoal-gray"
          } text-white w-full p-4 capitalize font-semibold flex items-center justify-center`}
          radius="md"
        >
          {day}
        </Card>
      ))}
    </div>
  );
};
