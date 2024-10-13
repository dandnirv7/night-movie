import { useEffect, useState } from "react";

interface UseYoutubeProps {
  detail?: boolean;
  auto_play?: number;
}

export const useYoutube = ({
  detail = false,
  auto_play = 1,
}: UseYoutubeProps = {}) => {
  const getDimensions = () => {
    const width = window.innerWidth;
    const height = window.outerHeight;

    if (width < 768) return { height: "203", width: "360" };
    if (width < 1024) return { height: "394", width: "700" };
    return detail
      ? { height: height.toString(), width: width.toString() }
      : { height: "487", width: "800" };
  };

  const [opts, setOpts] = useState(() => getDimensions());

  useEffect(() => {
    const handleResize = () => setOpts(getDimensions());

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [detail]);

  const onReady = (event: { target: { playVideo: () => void } }) => {
    event.target.playVideo();
  };

  return {
    opts: { ...opts, playerVars: { autoplay: auto_play } },
    onReady,
  };
};
