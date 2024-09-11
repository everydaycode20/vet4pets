import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useAtom } from "jotai";

import AddOwner from "../../components/add-owner/add-owner";
import { addOwnerState } from "../../components/add-owner/add-owner";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";

import JoinClasses from "../../utils/join-classes";

import MockDataPerson from "../../assets/mock_data-person.json";

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
  const [_, setState] = useAtom(addOwnerState);

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
        accessorKey: "registerDate",
        cell: (info) => info.getValue(),
        header: () => <span>Register Date</span>,
      },
    ],
    []
  );

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

      <Table data={defaultData} columns={columns} pagesSize={25} />

      <AddOwner />
    </section>
  );
}
