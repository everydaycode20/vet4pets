import { HTMLProps, useEffect, useMemo, useRef } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useAtom } from "jotai";

import { addPetState } from "../../components/add-pet/add-pet";
import AddPet from "../../components/add-pet/add-pet";

import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import JoinClasses from "../../utils/join-classes";

import MockDataPet from "../../assets/mock_data-pet.json";

import styles from "./table.module.scss";
import Table from "../../components/table/table";

interface Pet {
  name: string;
  ownerName: string;
  age: string;
  type: string;
  registerDate: string;
}

const defaultData: Pet[] = MockDataPet;

export default function Pets() {
  const [_, setState] = useAtom(addPetState);

  const columns = useMemo<ColumnDef<Pet>[]>(
    () => [
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      },
      {
        accessorKey: "ownerName",
        cell: (info) => info.getValue(),
        header: () => <span>Owner Name</span>,
      },
      {
        accessorKey: "age",
        cell: (info) => info.getValue(),
        header: () => <span>Age</span>,
        enableSorting: false,
      },
      {
        accessorKey: "type",
        cell: (info) => info.getValue(),
        header: () => <span>Type</span>,
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
            <PetsOutlinedIcon htmlColor="#778CA2" />
          </div>

          <span className="font-medium text-black">Add new pet</span>
        </button>
      </div>

      <Table data={defaultData} columns={columns} pagesSize={25} />

      <AddPet />
    </section>
  );
}
