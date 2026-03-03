import { UIDataTypes, UIMessage, UITools } from "ai";

export type PanelPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftFull' | 'smallLeft' | 'smallMiddle' | 'smallRight';

export interface PanelProps {
  position: PanelPosition;
  children?: React.ReactNode;
  callback?: () => void;
  className?: string;
  messages?: UIMessage<unknown, UIDataTypes, UITools>[];
}
