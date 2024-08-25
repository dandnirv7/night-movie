import { Card } from "@nextui-org/react";

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

export const DaySelector = ({ today }: DaySelectorProps) => {
  return (
    <div className="hidden lg:w-[10vw] lg:grid lg:grid-cols-1 lg:grid-rows-7 lg:gap-y-4 h-full">
      {days.map((day, index) => (
        <Card
          key={day}
          className={`${today === index ? "bg-purple-gem" : "bg-charcoal-gray"}  text-white w-full p-5 capitalize font-semibold flex items-center justify-center`}
        >
          {day}
        </Card>
      ))}
    </div>
  );
};
