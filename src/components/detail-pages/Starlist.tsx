import { Star } from "lucide-react";

const StarList = ({ vote_average }: { vote_average: number }) => {
  const redStars = Math.round(vote_average);
  const totalStars = 10;

  return (
    <div className="flex flex-row gap-x-1">
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          color={index < redStars ? "#611DBA" : "gray"}
          fill={index < redStars ? "#611DBA" : "gray"}
        />
      ))}
    </div>
  );
};

export default StarList;
