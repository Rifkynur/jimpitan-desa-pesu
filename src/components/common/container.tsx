import React, { ReactNode } from "react";
type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="p-2 w-full max-w-[100vw] md:p-4 lg:p-8">{children}</div>
  );
};

export default Container;
