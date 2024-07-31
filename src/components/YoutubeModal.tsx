import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

import Youtube from "react-youtube";

type youtubeModalProps = {
  videoId: string;
  text: string;
};

export const YoutubeModal = ({ videoId, text }: youtubeModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const opts = {
    height: "487",
    width: "800",
    playerVars: {
      autoplay: 1,
    },
  };

  const onReady = (event: { target: { playVideo: () => void } }) => {
    event.target.playVideo();
  };

  return (
    <div className="z-[99]">
      <Button
        onPress={onOpen}
        size="lg"
        className="rounded-sm text-md md:text-lg md:py-6 bg-purple-gem text-white capitalize hover:none"
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
          body: "absolute top-1/2 -translate-y-1/2 translate-x-1/2",
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
