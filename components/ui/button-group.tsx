import * as React from "react"

export const ButtonGroup = ({ children }: { children: React.ReactNode }) => {
  return <div className="inline-flex space-x-2">{children}</div>;
};
