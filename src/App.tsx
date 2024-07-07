import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { AtHomeIndicator } from "./components/AtHomeIndicator";
import { TimerValue } from "./components/TimerValue";
import { Counter, Unit } from "./Types/counter";
import { getUnit } from "./lib/getUnit";
import { Modal } from "./components/Modal";
import { cn } from "./lib/utils";

const END_DATE = new Date("1/june/2025 2:00:00");

const times = {
  year: 0,
  month: 12,
  day: 30,
  hour: 24,
  minute: 60,
  second: 60,
};

const initialCounter: Counter = {
  year: "0",
  month: "0",
  day: "0",
  hour: "0",
  minute: "0",
  second: "0",
};

function App() {
  const [counter, setCounter] = useState<Counter>(initialCounter);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

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

  return (
    <>
      <AtHomeIndicator />

      <main
        className={cn(
          "flex flex-col justify-center items-center playwrite-400 pb-8"
        )}
      >
        <p className="mb-6 text-xl md:text-2xl lg:text-3xl rubik">
          Time untill Eyad is out of the army:
        </p>

        <div className="flex w-full flex-col gap-4 lg:gap-0 md:flex-row">
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

      <div className="relative w-full flex justify-center mt-4 md:mt-16">
        <div
          className="group cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute top-1/2 left-1/2 group-hover:scale-125 -translate-x-1/2 transition-all -translate-y-1/2 w-52 h-12 border-2 border-slate-100/90 group-hover:rounded-none rounded-lg" />
          <p className="z-10 rubik-semi">Fun Fact</p>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </>
  );
}

export default App;
