import { useEffect, useState } from "react";

export const Timer = ({ start }: { start: number }) => {
  const [interval, setTime] = useState<string>("00:00");

  useEffect(() => {
    const updateTimer = () => {
      setTime(() => {
        const diff = Date.now() - start;
        const time = new Date(0, 0, 0, 0, 0, 0, diff);
        const minutes = time.getMinutes().toString().padStart(2, "0");
        const seconds = time.getSeconds().toString().padStart(2, "0");

        return `${minutes}:${seconds}`;
      });
    };

    updateTimer();
    const id = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => clearInterval(id);
  }, [start]);

  return <span key={start}>{interval}</span>;
};
