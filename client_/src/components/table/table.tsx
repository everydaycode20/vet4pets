import { PaginationState, SortingState } from "@tanstack/react-table";
import { useState } from "react";

interface ITable {
  data: any[];
  columns: { accessorKey: string; sort?: boolean; headerName: string }[];
  pageSize?: number;
}

export default function Table({
  data,
  columns,
  interface,
  pageSize = 25,
}: ITable) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  const tableCellsArray = [];

  for (let i = 0; i < columns.length; i++) {
    tableCellsArray.push({
      accessorKey: columns[i].accessorKey,
      cell: (info: any) => info.getValue(),
      header: () => <span>{columns[i].headerName}</span>,
      enableSorting: columns[i].sort === undefined ? true : columns[i].sort,
    });
  }

//   console.log(<typeof data>);

  return null;
}
