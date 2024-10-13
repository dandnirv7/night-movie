import { Card, CardBody } from "@nextui-org/react";
import {
  BookOpen,
  Cast,
  Heart,
  Lock,
  Mountain,
  Rocket,
  Tv,
  Users,
} from "lucide-react";
import { BiSolidMagicWand } from "react-icons/bi";
import { FaHatCowboy } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import {
  PiEye,
  PiGhost,
  PiHeart,
  PiMusicNotes,
  PiShield,
  PiSmileyLight,
  PiSword,
} from "react-icons/pi";

import { GenreType, GenreIcon, IconComponent } from "@/types/types";

const genreIcons: GenreIcon[] = [
  { genre: GenreType.Action, icon: PiSword },
  { genre: GenreType.Adventure, icon: Mountain },
  { genre: GenreType.Animation, icon: Cast },
  { genre: GenreType.Comedy, icon: PiSmileyLight },
  { genre: GenreType.Crime, icon: Lock },
  { genre: GenreType.Documentary, icon: BookOpen },
  { genre: GenreType.Drama, icon: PiHeart },
  { genre: GenreType.Family, icon: Users },
  { genre: GenreType.Fantasy, icon: BiSolidMagicWand },
  { genre: GenreType.History, icon: PiEye },
  { genre: GenreType.Horror, icon: PiGhost },
  { genre: GenreType.Music, icon: PiMusicNotes },
  { genre: GenreType.Mystery, icon: PiEye },
  { genre: GenreType.Romance, icon: Heart },
  { genre: GenreType.ScienceFiction, icon: Rocket },
  { genre: GenreType.TVMovie, icon: Tv },
  { genre: GenreType.Thriller, icon: IoIosWarning },
  { genre: GenreType.War, icon: PiShield },
  { genre: GenreType.Western, icon: FaHatCowboy },
];

const getIconForGenre = (genre: GenreType): IconComponent => {
  const genreIcon = genreIcons.find((g) => g.genre === genre);
  return genreIcon ? genreIcon.icon : PiSword;
};

const GenreCard: React.FC<{ genre: GenreType }> = ({ genre }) => {
  const Icon = getIconForGenre(genre);

  return (
    <a
      href={`/genre/${genre.toLowerCase()}`}
      className="w-full col-span-6 md:col-span-4 lg:col-span-3"
    >
      <Card
        radius="sm"
        className="bg-gunmetal/50 hover:bg-gunmetal p-1 md:p-2 lg:p-3 hover:transition hover:duration-150 hover:ease-in hover:shadow-md hover:shadow-purple-gem"
      >
        <CardBody className="flex flex-row gap-2 items-center">
          <Icon className="size-5 md:size-6 lg:size-7" />
          <span className="lg:font-semibold line-clamp-1 text-xs md:text-base">
            {genre}
          </span>
        </CardBody>
      </Card>
    </a>
  );
};

export default GenreCard;
