import React, { ReactNode } from "react";

interface Props {
  items: any[];
}

function Dropdown({ items }: Props) {
  return <div>{items[0]}</div>;
}

export default Dropdown;
