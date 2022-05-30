import React from "react";

interface Props {
  onReset: () => void;
}

const ResetButton = ({ onReset }: Props) => {
  return <button onClick={() => onReset()}>Återställ</button>;
};

export default ResetButton;
