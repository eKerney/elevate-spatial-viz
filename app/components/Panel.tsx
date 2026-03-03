import { useEffect, useRef } from "react";
import { PanelPosition, PanelProps } from "./Panel.types";

const Panel = (props: PanelProps) => {
  const { position, children, className, callback = () => null, messages } = props;
  const layoutPositions: Record<PanelPosition, string> = {
    topLeft: 'top-20 left-12',
    topRight: 'top-20 right-12',
    bottomLeft: 'bottom-4 left-8',
    bottomRight: 'bottom-4 right-4',
    leftFull: 'top-2 left-2',
    smallLeft: 'bottom-0 left-0',
    smallMiddle: 'bottom-0 left-128',
    smallRight: 'bottom-0 right-20'
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={`fixed ${layoutPositions[position]} ${className || ''} `}>
        <div ref={scrollRef} className="h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
}

export default Panel;
