import { useReducer, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { TablePagination } from "@mui/base/TablePagination";

import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import "./table.scss";

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

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("firstName", {
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  }),
  columnHelper.accessor((row) => row.lastName, {
    id: "lastName",
    cell: (info) => <span>{info.getValue()}</span>,
    header: () => <span>Last Name</span>,
  }),
  columnHelper.accessor("phone", {
    cell: (info) => info.getValue(),
    header: () => <span>Phone Name</span>,
  }),
  columnHelper.accessor("address", {
    cell: (info) => info.getValue(),
    header: () => <span>Address</span>,
  }),
  columnHelper.accessor("registerDate", {
    cell: (info) => info.getValue(),
    header: () => <span>Register Date</span>,
  }),
];

export default function Owner() {
  const [data, _setData] = useState(() => [...defaultData]);

  const [page, setPage] = useState(0);

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  // const rerender = useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <section className="h-full">
      <table className="w-full max-h-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
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
