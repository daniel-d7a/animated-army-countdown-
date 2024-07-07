import { Counter, Unit } from "@/Types/counter";
import dayjs from "dayjs";

const facts = [
  {
    text: "If you plant a lemon tree today 🍋, you can harvest lemons at the same time Eyad is out of army",
    time: {
      year: "0",
      month: "10",
      day: "0",
      hour: "0",
      minute: "0",
      second: "0",
    },
  },
  {
    text: "If a cow gets pregnant today 🐄, it will give birth at the same time Eyad is out of army",
    time: {
      year: "0",
      month: "10",
      day: "20",
      hour: "0",
      minute: "0",
      second: "0",
    },
  },
  {
    text: "If you start your school year today 🎓, you can finish it at the same time Eyad is out of army",
    time: {
      year: "0",
      month: "9",
      day: "15",
      hour: "0",
      minute: "0",
      second: "0",
    },
  },
];

export function getFunFact(timeLeft: Counter) {
  const timeLeftAsDate = toDate(timeLeft);

  const fact = facts
    .map((f) => ({
      text: f.text,
      endDate: toDate(f.time),
    }))
    .filter((f) => f.endDate.isBefore(timeLeftAsDate))
    .sort((a, b) => (a.endDate.isAfter(b.endDate) ? -1 : 1))[0];

  return fact?.text || "";
}

function toDate(time: Partial<Counter>) {
  let ms = dayjs();
  Object.entries(time).forEach(([key, value]) => {
    const numberValue = Number(value);
    if (numberValue) {
      ms = ms.add(Number(value), key as Unit);
    }
  });
  return ms;
}
