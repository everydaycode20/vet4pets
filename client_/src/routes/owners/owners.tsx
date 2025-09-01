import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useAtom } from "jotai";

import AddOwner from "../../components/add-owner/add-owner";
import { addOwnerState } from "../../components/add-owner/add-owner";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import JoinClasses from "../../utils/join-classes";

import styles from "./table.module.scss";
import Table from "../../components/table/table";

import { IOwner, Person } from "../../models/person.interface";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import dayjs from "dayjs";

export default function Owner() {
  const [_, setState] = useAtom(addOwnerState);

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      },
      {
        accessorKey: "email",
        cell: (info) => info.getValue(),
        header: () => <span>Email</span>,
      },
      {
        accessorKey: "phone",
        cell: (info) => info.getValue(),
        header: () => <span>Phone</span>,
        enableSorting: false,
      },
      {
        accessorKey: "address",
        cell: (info) => info.getValue(),
        header: () => <span>Address</span>,
        enableSorting: false,
      },
      {
        accessorKey: "createdAt",
        cell: (info) =>
          dayjs(info.getValue() as string)
            .format("YYYY-MM-DD")
            .toString(),
        header: () => <span>Register Date</span>,
      },
    ],
    []
  );

  const d = useQuery({
    queryKey: ["owners-table", pagination],
    queryFn: async (): Promise<{
      data: IOwner[];
      total: number;
      pageNumber: number;
    }> => {
      const res = await fetch(
        `${apiUrl}/Owners?pageNumber=${pagination.pageIndex + 1}&pageSize=20`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      return await res.json();
    },
  });

  console.log(pagination);

  return (
    <section className="h-full">
      <div
        className={JoinClasses(
          "flex justify-end",
          styles["add-owner-container"]
        )}
      >
        <button
          className="flex items-center"
          type="button"
          onClick={() => setState(true)}
        >
          <div>
            <PersonAddAlt1Icon htmlColor="#778CA2" />
          </div>

          <span className="font-medium text-black">Add new owner</span>
        </button>
      </div>

      <Table
        data={d.data}
        columns={columns}
        pagesSize={20}
        pagination={pagination}
        setPagination={setPagination}
      />

      <AddOwner />
    </section>
  );
}
