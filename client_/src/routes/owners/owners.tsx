import { useReducer, useState, useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingFn,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { TablePagination } from "@mui/base/TablePagination";

import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import JoinClasses from "../../utils/join-classes";

import "./table.scss";
import styles from "./table.module.scss";

type Person = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: string;
};

const defaultData: Person[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    phone: "888888888",
    address: "address",
    registerDate: "2021-08-05",
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    phone: "888888888",
    address: "address",
    registerDate: "2021-08-05",
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    phone: "888888888",
    address: "address",
    registerDate: "2021-08-05",
  },
  {
    firstName: "tanner",
    lastName: "linsley",
    phone: "888888888",
    address: "address",
    registerDate: "2021-08-05",
  },
];

export default function Owner() {
  const [data, _setData] = useState(() => [...defaultData]);

  const [page, setPage] = useState(0);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorFn: (row) => row.lastName,
        accessorKey: "lastName",
        cell: (info) => {
          info.getValue();
        },
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        header: () => <span>Phone Name</span>,
      },
      {
        accessorKey: "address",
        cell: (info) => info.getValue(),
        header: () => <span>Address</span>,
      },
      {
        accessorKey: "registerDate",
        cell: (info) => info.getValue(),
        header: () => <span>Register Date</span>,
      },
    ],
    []
  );

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    debugTable: true,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <section className="h-full">
      <table className="w-full max-h-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <div
                      tabIndex={0}
                      role="button"
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

                      {{
                        asc: (
                          <ArrowDownwardOutlinedIcon
                            className=""
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
                        <div className={JoinClasses("", styles["sorting-arrow-placeholder"])} />
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
              count={100}
              rowsPerPage={25}
              page={page}
              onPageChange={handleChangePage}
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
