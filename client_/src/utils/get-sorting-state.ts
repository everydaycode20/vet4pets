import { ColumnSort } from "@tanstack/react-table";

export default function getSortingState(state: ColumnSort[]) {
  if (state[0].desc === true) {
    return "descending";
  }

  return "ascending";
}
