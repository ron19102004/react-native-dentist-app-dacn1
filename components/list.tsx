import React, { Children, FC } from "react";

interface ListProps<L> {
  data: L[];
  render(l: L, i?: number): React.ReactNode;
  isReverse?: boolean;
}
const ListView = <L,>({ data, render, isReverse = false }: ListProps<L>) =>
  isReverse
    ? Children.toArray(data.reverse().map((l, i) => render(l, i)))
    : Children.toArray(data.map((l, i) => render(l, i)));
export default ListView;
