import {
  Dispatch,
  HTMLProps,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

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
import { IOwner } from "../../models/person.interface";

interface ITable {
  data?: { data: IOwner[]; total: number; pageNumber: number };
  columns: any;
  pagesSize?: number;
  pagination: PaginationState;
  setPagination: Dispatch<SetStateAction<PaginationState>>;
  rowSelect?: boolean;
  onRowSelection?: (e: any) => void;
}

export default function Table({
  data,
  columns,
  pagesSize = 20,
  pagination,
  setPagination,
  rowSelect = false,
  onRowSelection,
}: ITable) {
  const [rowSelection, setRowSelection] = useState({});

  const [sorting, setSorting] = useState<SortingState>([]);

  useEffect(() => {
    if (rowSelect) {
      if (Object.keys(rowSelection)[0]) {
        onRowSelection!(Object.keys(rowSelection)[0]);
      } else {
        onRowSelection!(undefined);
      }
    }
  }, [rowSelection]);

  const table = useReactTable({
    data: data !== undefined ? data.data : undefined,
    debugTable: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    pageCount: data ? Math.ceil(data?.total / pagination.pageIndex) : 0,
    manualPagination: true,
    enableRowSelection: rowSelect,
    enableMultiRowSelection: false,
    getRowId: (row) => row.id.toString(),
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  if (data) {
    return (
      <div>
        <table className="w-full max-h-full table-container">
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
                            ? "sorted " +
                              getSortingState(table.getState().sorting)
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
          </tbody>
        </table>

        {!data && (
          <div className="flex flex-col w-full gap-[12px] py-2">
            <div className="flex w-full gap-[12px]">
              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>
            </div>

            <div className="flex w-full gap-[12px]">
              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>

              <div className="skeleton h-[18px] w-full"></div>
            </div>
          </div>
        )}

        <div className="pagination-container" aria-label="table pagination">
          <TablePagination
            count={data?.total || 0}
            rowsPerPage={pagesSize}
            page={pageIndex}
            onPageChange={(_, page) => {
              table.setPageIndex(page);
            }}
            onRowsPerPageChange={(e) => {
              const size = e.target.value ? Number(e.target.value) : 10;
              table.setPageSize(size);
            }}
            rowsPerPageOptions={[]}
            slots={{ root: "div" }}
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
        </div>
      </div>
    );
  }
}
