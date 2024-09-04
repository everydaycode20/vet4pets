import { useState, useMemo } from "react";
import {
  ColumnDef,
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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import JoinClasses from "../../utils/join-classes";
import getSortingState from "../../utils/get-sorting-state";

import MockDataPerson from "../../assets/mock_data-person.json";

import "./table.scss";
import styles from "./table.module.scss";
import Table from "../../components/table/table";

interface Person {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: string;
}

const defaultData: Person[] = MockDataPerson;

export default function Owner() {
  const [data, _setData] = useState(() => [...defaultData]);

  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 25,
  });

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
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
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        header: () => <span>Phone Name</span>,
        enableSorting: false,
      },
      {
        accessorKey: "address",
        cell: (info) => info.getValue(),
        header: () => <span>Address</span>,
        enableSorting: false,
      },
      {
        accessorKey: "registerDate",
        cell: (info) => info.getValue(),
        header: () => <span>Register Date</span>,
      },
    ],
    []
  );

  // const rerender = useReducer(() => ({}), {})[1];

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

  // console.log(table.getState().sorting);

  interface Person {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    registerDate: string;
  }


  return (
    <section className="h-full">
      <Table
        data={MockDataPerson}
        columns={[
          {
            accessorKey: "firstName",
            headerName: "First Name",
          },
          {
            accessorKey: "lastName",
            headerName: "Last Name",
          },
          {
            accessorKey: "phone",
            headerName: "Phone Name",
            sort: false,
          },
          {
            accessorKey: "address",
            headerName: "Address",
            sort: false,
          },
          {
            accessorKey: "registerDate",
            headerName: "Register Date",
          },
        ]}
        
      />

      <div
        className={JoinClasses(
          "flex justify-end",
          styles["add-owner-container"]
        )}
      >
        <button className="flex items-center" type="button">
          <div>
            <PersonAddAlt1Icon htmlColor="#778CA2" />
          </div>

          <span className="font-medium text-black">Add new owner</span>
        </button>
      </div>

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
    </section>
  );
}
