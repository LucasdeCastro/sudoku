import { useEffect, useState } from "react";
import { formatMinutes } from "../../helpers";

export const Timer = ({ start }: { start: number }) => {
  const [interval, setTime] = useState<string>("00:00");

  useEffect(() => {
    const updateTimer = () => {
      setTime(() => {
        return formatMinutes(start);
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
