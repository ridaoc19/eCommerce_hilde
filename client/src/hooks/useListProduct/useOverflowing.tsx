import { useEffect, useRef, useState } from "react";

const useOverflowDetection = () => {
  const overflowRef = useRef<HTMLDivElement>(null);
  const [isOverflowed, setIsOverflowed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const contentDiv = overflowRef.current;

      if (contentDiv) {
        const overflow = contentDiv.scrollHeight > contentDiv.clientHeight;
        setIsOverflowed(overflow);
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (overflowRef.current) {
      resizeObserver.observe(overflowRef.current);
    }

    // Cleanup the ResizeObserver on component unmount
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return { overflowRef, isOverflowed };
};

export default useOverflowDetection;
