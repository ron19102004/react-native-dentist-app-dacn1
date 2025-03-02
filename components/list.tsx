import React, { Children, FC } from "react";

interface ListProps<L> {
  data: L[];
  render(l: L): React.ReactNode;
  isReverse?: boolean;
}
const ListView = <L,>({ data, render, isReverse = false }: ListProps<L>) =>
  isReverse
    ? Children.toArray(data.reverse().map((l) => render(l)))
    : Children.toArray(data.map((l) => render(l)));
export default ListView;
