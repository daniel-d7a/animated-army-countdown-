import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { cn } from "./lib/utils";

const END_DATE = new Date("1/june/2025 2:00:00");
const AT_HOME = true;

const counterVarients: Variants = {
  initial: {
    y: 10,
    filter: "blur(6px)",
    opacity: 0,
  },
  animate: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
  },
  exit: {
    y: -10,
    filter: "blur(6px)",
    opacity: 0,
  },
};

type Unit = "day" | "month" | "hour" | "minute" | "second" | "year";
type Counter = Record<Unit, string>;

function getUnit(value: number, unit: Unit) {
  return value === 1 ? unit : `${unit}s`;
}

const times = {
  year: 0,
  month: 12,
  day: 30,
  hour: 24,
  minute: 60,
  second: 60,
};

const initialCounter: Counter = {
  year: "00",
  month: "00",
  day: "00",
  hour: "00",
  minute: "00",
  second: "00",
};

function App() {
  const [counter, setCounter] = useState<Counter>(initialCounter);

  useEffect(() => {
    function updateTimer() {
      const now = Date.now();

      const counts: Counter = { ...initialCounter };
      Object.entries(times).forEach(([key, value]) => {
        let diff = dayjs(END_DATE).diff(now, key as Unit);
        diff = value === 0 ? diff : diff % value;
        counts[key as Unit] = diff.toString().padStart(2, "0");
      });

      setCounter(counts);
    }

    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    return () => clearInterval(timer);
  }, []);

  const filteredCounter = Object.entries(counter);
  const glowClasses = "size-4 lg:size-5 rounded-full translate-y-1";

  return (
    <>
      <div className="mt-4 md:mt-10 mb-12 md:mb-40 text-base lg:text-xl flex justify-center items-baseline gap-4 rubik">
        {AT_HOME ? (
          <>
            <div className={cn(glowClasses, "green-glow")} />
            Eyad is finally back home{" "}
          </>
        ) : (
          <>
            <div className={cn(glowClasses, "red-glow")} />
            Eyad is now serving the country
          </>
        )}
      </div>

      <main className="flex flex-col justify-center items-center playwrite-400">
        <p className="mb-6 text-xl md:text-2xl lg:text-3xl rubik">
          Time untill Eyad is out of the army:
        </p>

        <div className="flex w-full flex-col gap-6 lg:gap-0 md:flex-row">
          {filteredCounter.map(([key, value], i) => (
            <div key={`${key}`} className="flex justify-center">
              <div className="flex flex-col justify-center items-center">
                <TimerValue value={value} />
                <p className="md:translate-y-4 text-xl capitalize">
                  {getUnit(Number(value), key as Unit)}
                </p>
              </div>

              {i !== filteredCounter.length - 1 && (
                <p className="hidden md:flex justify-center items-center  text-5xl md:mx-3 lg:mx-6 -mt-10">
                  :
                </p>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

type TimerValueProps = { value: string; unit?: Unit };

const TimerValue = ({ value, unit }: TimerValueProps) => (
  <AnimatePresence mode="wait">
    <motion.div
      variants={counterVarients}
      transition={{
        ease: "easeInOut",
      }}
      key={`${unit} ${value}`}
      {...counterVarients}
      className="text-5xl md:text-6xl  lg:text-7xl flex gap-2 chivo-mono"
    >
      {value}
    </motion.div>
  </AnimatePresence>
);

export default App;
