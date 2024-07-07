import { getFunFact } from "@/lib/getFunFact";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Dispatch, memo, SetStateAction, useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const MODAL_Y = 30;

const initailStyles = {
  opacity: 0,
  scale: 0.97,
  y: MODAL_Y,
  backdropFilter: "blur(4px)",
  transition: {
    duration: 0.2,
  },
};

const modalVariants: Variants = {
  initial: initailStyles,
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: "blur(0px)",
    transition: {
      duration: 0.2,
    },
  },
  exit: initailStyles,
};

export const Modal = memo(({ isOpen, setIsOpen }: ModalProps) => {
  // const fact = getFunFact(currentCounter);
  const fact = getFunFact();


  return (
    <>
      <motion.div
        onClick={() => setIsOpen(false)}
        animate={{
          backdropFilter: isOpen ? "blur(8px)" : "blur(0px)",
          visibility: isOpen ? "visible" : "hidden",
        }}
        className={cn(
          "z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center"
        )}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...modalVariants}
              className="w-5/6 h-2/5 md:w-3/5 lg:h-1/3 rounded-md flex flex-col justify-center items-center bg-slate-100/80 text-black text-xl px-4 py-5 rubik"
            >
              <p className="capitalize text-center text-2xl font-semibold">
                did you know ?
              </p>
              <div className="w-full text-center border-black mt-4 px-3 py-2">
                {fact}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
});
