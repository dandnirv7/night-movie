import { Spinner } from "@nextui-org/react";
import React from "react";

interface LoadingSpinnerProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  isLoading,
  children,
}) => {
  if (isLoading) {
    return (
      <Spinner
        className="w-screen h-screen"
        label="Loading ..."
        color="primary"
        labelColor="primary"
        size="lg"
      />
    );
  }

  return <>{children}</>;
};

export default LoadingSpinner;
