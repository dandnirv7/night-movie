import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Youtube from "react-youtube";
import { useYoutube } from "@/hooks/useYoutube";

type YoutubeModalProps = {
  videoId: string;
  text: string;
};

export const YoutubeModal = ({ videoId, text }: YoutubeModalProps) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { opts, onReady } = useYoutube();

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
