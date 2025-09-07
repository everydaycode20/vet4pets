import { ReactNode, useMemo, useState } from "react";
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Close,
  Title,
  Description,
} from "@radix-ui/react-dialog";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useQuery } from "@tanstack/react-query";

import { Controller } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import JoinClasses from "../../utils/join-classes";

import styles from "./owner-modal.module.scss";

import { IOwner, ITelephones, Person } from "../../models/person.interface";
import { apiUrl } from "../../constants/apiUrl";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import dayjs from "dayjs";
import Table from "../../components/table/table";

interface IOwnerModal {
  button: ReactNode;
  onChange: (...event: any[]) => void;
  value: any;
}

//TODO: use just one component for this and owner page

export default function OwnerModal({ button, onChange, value }: IOwnerModal) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const data = useQuery({
    queryKey: ["owners-table", pagination],
    queryFn: async (): Promise<{
      data: IOwner[];
      total: number;
      pageNumber: number;
    }> => {
      const res = await fetch(
        `${apiUrl}/Owners/owner-with-pets?pageNumber=${
          pagination.pageIndex + 1
        }&pageSize=20`,
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

  const columns = useMemo<ColumnDef<Person>[]>(
    () => [
      {
        id: "select",
        cell: ({ row }) => {
          return (
            <input
              type="checkbox"
              value={value}
              checked={row.getIsSelected()}
              onChange={row.getToggleSelectedHandler()}
              aria-selected={row.getIsSelected()}
            />
          );
        },
      },
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

  function getOwner(id: any) {
    const owner = data.data?.data.find((o) => o.id === parseInt(id));

    if (owner) {
      onChange({ id: owner.id, name: owner.name });
    } else {
      onChange({ id: undefined, name: undefined });
    }
  }

  return (
    <Root>
      <Trigger asChild>{button}</Trigger>

      <Portal>
        <Overlay className={JoinClasses("", styles.Overlay)} />

        <Content className={styles.Content}>
          <Title className="mb-[12px]">Select an owner</Title>

          <Description className="sr-only">select an owner</Description>

          {data.data && (
            <Table
              data={data.data}
              columns={columns}
              pagesSize={20}
              pagination={pagination}
              setPagination={setPagination}
              rowSelect={true}
              onRowSelection={getOwner}
            />
          )}

          <Close
            aria-label="close dialog"
            className={JoinClasses("absolute", styles.close)}
          >
            <CloseIcon />
          </Close>
        </Content>
      </Portal>
    </Root>
  );
}

function PhoneList({ data }: { data: ITelephones[] }) {
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
