import clsx from "clsx";

export const Content = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <section className={clsx("margin-p-1 lg:span-p-1-wider ml-auto w-full lg:span-w-8-wider flex flex-wrap top-0 right-0 h-auto", className)}>
      {children}
    </section>
  );
};
