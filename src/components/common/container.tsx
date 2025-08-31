import React, { ReactNode } from "react";
type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps) => {
  return <div className="p-2 md:p-4">{children}</div>;
};

export default Container;
