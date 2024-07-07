import { cn } from "@/lib/utils";

export const AT_HOME = true;
export const glowClasses = "size-4 lg:size-5 rounded-full translate-y-1";

export function AtHomeIndicator() {
  return (
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
  );
}
