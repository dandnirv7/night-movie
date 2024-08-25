import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Youtube from "react-youtube";

type YoutubeModalProps = {
  videoId: string;
  text: string;
};

export const YoutubeModal = ({ videoId, text }: YoutubeModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [opts, setOpts] = useState({
    height: "487",
    width: "800",
    playerVars: {
      autoplay: 1,
    },
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setOpts({
          height: "203",
          width: "360",
          playerVars: {
            autoplay: 1,
          },
        });
      } else if (width >= 768 && width < 1024) {
        setOpts({
          height: "394",
          width: "700",
          playerVars: {
            autoplay: 1,
          },
        });
      } else {
        setOpts({
          height: "487",
          width: "800",
          playerVars: {
            autoplay: 1,
          },
        });
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onReady = (event: { target: { playVideo: () => void } }) => {
    event.target.playVideo();
  };

  return (
    <div className="z-[99]">
      <Button
        onPress={onOpen}
        className="text-white capitalize rounded-sm text-md md:text-lg md:py-6 bg-purple-gem hover:none"
      >
        {text}
      </Button>
      <Modal
        size="full"
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        onClose={onClose}
        placement="center"
        className="relative z-[99] mx-auto"
        classNames={{
          body: "flex items-center justify-center min-h-screen",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "bg-transparent w-full",
        }}
      >
        <ModalContent className="relative">
          {() => (
            <>
              <ModalBody>
                <Youtube videoId={videoId} opts={opts} onReady={onReady} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
