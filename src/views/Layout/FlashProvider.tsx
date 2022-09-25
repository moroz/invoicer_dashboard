import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect
} from "react";
import { useLocation } from "react-router-dom";

export enum FlashMessageLevel {
  Success = "success",
  Danger = "danger",
  Warning = "warning"
}

export interface FlashMessage {
  body: string;
  level: FlashMessageLevel;
}

export interface FlashContext {
  messages: FlashMessage[];
  addMessage: (message: FlashMessage, persist?: boolean) => void;
  clearMessages: VoidFunction;
}

export const FlashContext = createContext<FlashContext | null>(null);

export interface Props {
  children: React.ReactNode;
}

export const useFlash = () => useContext(FlashContext)!;

export const FlashProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<FlashMessage[]>([]);
  // If a message is to be persisted across to the next view,
  // we set a counter to only clear it in the next view
  const [_viewJumps, setViewJumps] = useState(0);
  const location = useLocation();

  const addMessage = useCallback(
    (message: FlashMessage, persist: boolean = false) => {
      setMessages((msg) => [...msg, message]);
      if (persist) {
        setViewJumps(1);
      }
    },
    [setMessages]
  );

  const clearMessages = useCallback(() => {
    setViewJumps((v) => {
      if (v) {
        return v - 1;
      } else {
        setMessages([]);
        return v;
      }
    });
  }, [setMessages]);
  useEffect(clearMessages, [location]);

  const contextValue = { messages, addMessage, clearMessages };

  return (
    <FlashContext.Provider value={contextValue}>
      {children}
    </FlashContext.Provider>
  );
};
