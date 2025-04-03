import clsx from "clsx";

export const Content = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={clsx("span-p-1-wider ml-auto span-w-8-wider flex flex-wrap top-0 right-0 h-auto", className)}>
      {children}
    </section>
  );
};
