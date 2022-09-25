import React from "react";
import { FlashMessageLevel, useFlash } from "../FlashProvider";

interface Props {
  level: FlashMessageLevel;
  body: string;
}

const FlashMessage: React.FC<Props> = ({ level, body }) => {
  const { clearMessages } = useFlash();

  return (
    <div className={`notification is-${level}`}>
      {body}
      <button className="delete" onClick={clearMessages}></button>
    </div>
  );
};

export default FlashMessage;
