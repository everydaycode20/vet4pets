import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TablePagination } from "@mui/base/TablePagination";

import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";

import getSortingState from "../../utils/get-sorting-state";
import JoinClasses from "../../utils/join-classes";

import "./table.scss";
import styles from "./table.module.scss";

interface ITable {
  data: any[];
  columns: any;
  pagesSize?: number;
}

export default function Table({ data, columns, pagesSize = 25 }: ITable) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagesSize,
  });

  const table = useReactTable({
    data,
    debugTable: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  return (
    <table className="w-full max-h-full">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                aria-sort={
                  header.id === table.getState().sorting[0]?.id &&
                  table.getState().sorting.length > 0
                    ? getSortingState(table.getState().sorting)
                    : "none"
                }
              >
                {header.isPlaceholder ? null : (
                  <div
                    tabIndex={header.column.getCanSort() ? 0 : undefined}
                    role={header.column.getCanSort() ? "button" : undefined}
                    onClick={header.column.getToggleSortingHandler()}
                    className={JoinClasses(
                      "flex ",
                      header.column.getCanSort()
                        ? "cursor-pointer select-none"
                        : ""
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <span className="sr-only">
                      {header.id === table.getState().sorting[0]?.id &&
                      table.getState().sorting.length > 0
                        ? "sorted " + getSortingState(table.getState().sorting)
                        : "no sorted"}
                    </span>

                    {{
                      asc: (
                        <ArrowDownwardOutlinedIcon
                          className="rotate-180"
                          aria-hidden={true}
                          focusable={false}
                        />
                      ),
                      desc: (
                        <ArrowDownwardOutlinedIcon
                          className=""
                          aria-hidden={true}
                          focusable={false}
                        />
                      ),
                    }[header.column.getIsSorted() as string] ?? (
                      <div
                        className={JoinClasses(
                          "",
                          styles["sorting-arrow-placeholder"]
                        )}
                      />
                    )}
                  </div>
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}

        <tr>
          <TablePagination
            count={table.getFilteredRowModel().rows.length}
            rowsPerPage={25}
            page={pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page);
            }}
            onRowsPerPageChange={(e) => {
              const size = e.target.value ? Number(e.target.value) : 10;
              table.setPageSize(size);
            }}
            rowsPerPageOptions={[]}
            slotProps={{
              actions: {
                showFirstButton: true,
                showLastButton: true,
                slots: {
                  firstPageIcon: () => (
                    <FirstPageRoundedIcon htmlColor="#778CA2" />
                  ),
                  lastPageIcon: () => (
                    <LastPageRoundedIcon htmlColor="#778CA2" />
                  ),
                  nextPageIcon: () => (
                    <ChevronRightRoundedIcon htmlColor="#778CA2" />
                  ),
                  backPageIcon: () => (
                    <ChevronLeftRoundedIcon htmlColor="#778CA2" />
                  ),
                },
              },
            }}
          />
        </tr>
      </tbody>
    </table>
  );
}
