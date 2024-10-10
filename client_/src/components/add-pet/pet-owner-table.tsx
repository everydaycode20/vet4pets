import { HTMLProps, useEffect, useMemo, useRef, useState } from "react";

import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingFn,
  sortingFns,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { TablePagination } from "@mui/base/TablePagination";

import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import Input from "../input/input";

import getSortingState from "../../utils/get-sorting-state";
import JoinClasses from "../../utils/join-classes";
import Debounce from "../../utils/debounce";

import { Person } from "../../models/person.interface";

import "./table.scss";
import styles from "./table.module.scss";

interface ITable {
  data: any[];
  pagesSize?: number;
}

declare module "@tanstack/react-table" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });

  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

export default function PetOwnerTable({ data, pagesSize = 25 }: ITable) {
  const [rowSelection, setRowSelection] = useState({});

  console.log(rowSelection);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: pagesSize,
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        header: () => <div></div>,
        cell: ({ row }) => {
          // console.log(row);

          return (
            <IndeterminateCheckbox
              id={row.index.toString()}
              data={row.original}
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          );
        },
      },
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorKey: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
    ],
    []
  );

  const table = useReactTable({
    data,
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
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: "fuzzy",
    enableGlobalFilter: true,
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
  });

  const { pageSize, pageIndex } = table.getState().pagination;

  console.log(globalFilter);

  return (
    <div className={JoinClasses("", styles["table-wrapper"])}>
      <button className={JoinClasses("absolute", styles["close-button"])}>
        <span className="sr-only">close</span>

        <CloseOutlinedIcon />
      </button>

      <div>
        <div className={JoinClasses("sticky top-0", styles.input)}>
          <Input
            // value={globalFilter ?? ""}
            withDebounce
            id="pet-table-input"
            placeholder="Search owner"
            onChange={(e) => setGlobalFilter(e)}
          />
        </div>

        <table className="w-full max-h-full table-container-modal">
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

        <div className="pagination-container" aria-label="table pagination">
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

      <div className={JoinClasses("absolute", styles.bg)}></div>
    </div>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  data,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement> & any) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  console.log(rest);

  // rest.onChange = (e:any) => {
  //   console.log(e.target.checked);

  // }

  return (
    <div className="checkbox">
      <input
        type="checkbox"
        ref={ref}
        className={JoinClasses("cursor-pointer sr-only")}
        {...rest}
        id={rest.id}
      />

      <label htmlFor={rest.id}>
        <span className="sr-only">
          {data.firstName} {data.lastName}{" "}
          {ref?.current?.id === rest.id && rest.checked
            ? "selected"
            : "unselected"}
        </span>

        <svg
          width="11"
          height="8"
          viewBox="0 0 11 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.6437 7.84288L0.157101 4.35628C-0.0523671 4.14681 -0.0523671 3.80718 0.157101 3.59769L0.915668 2.8391C1.12514 2.62961 1.46479 2.62961 1.67426 2.8391L4.023 5.18782L9.05374 0.157101C9.26321 -0.0523671 9.60286 -0.0523671 9.81233 0.157101L10.5709 0.915689C10.7804 1.12516 10.7804 1.46479 10.5709 1.67428L4.40229 7.8429C4.1928 8.05237 3.85317 8.05237 3.6437 7.84288Z"
            fill="white"
          />
        </svg>
      </label>
    </div>
  );
}
