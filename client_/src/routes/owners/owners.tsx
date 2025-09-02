import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import { useAtom } from "jotai";
import dayjs from "dayjs";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import AddOwner from "../../components/add-owner/add-owner";
import { addOwnerState } from "../../components/add-owner/add-owner";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import JoinClasses from "../../utils/join-classes";

import styles from "./table.module.scss";
import Table from "../../components/table/table";

import { IOwner, ITelephones, Person } from "../../models/person.interface";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";

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
        accessorKey: "telephones",
        cell: (info: any) => <PhoneList data={info.getValue()} />,
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

  const data = useQuery({
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
        data={data.data}
        columns={columns}
        pagesSize={20}
        pagination={pagination}
        setPagination={setPagination}
      />

      <AddOwner />
    </section>
  );
}

function PhoneList({ data }: { data: ITelephones[] }) {
  console.log(data);

  if (data.length === 1) {
    return (
      <span className={JoinClasses("flex flex-col", styles.phone)}>
        <span>{data[0].telephoneType.type}</span>

        <a href={`tel:${data[0].number}`}>{data[0].number}</a>
      </span>
    );
  }

  return (
    <span className="flex items-end gap-x-[4px]">
      <span className={JoinClasses("flex flex-col", styles.phone)}>
        <span>{data[0].telephoneType.type}</span>

        <a href={`tel:${data[0].number}`}>{data[0].number}</a>
      </span>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button
            className={styles.IconButton}
            aria-label="see more phone numbers"
          >
            <MoreHorizIcon />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className={JoinClasses(
              "bg-white flex flex-col gap-y-[8px]",
              styles.content
            )}
          >
            {data.map((tel, i) => {
              return (
                <DropdownMenu.Item
                  key={i}
                  className={JoinClasses(
                    "flex flex-col gap-y-[4px]",
                    styles.item
                  )}
                >
                  {tel.telephoneType.type}

                  <a href={`tel:${data[0].number}`}>{tel.number}</a>
                </DropdownMenu.Item>
              );
            })}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
}
