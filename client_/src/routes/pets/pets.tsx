import { useMemo, useState } from "react";
import { ColumnDef, PaginationState } from "@tanstack/react-table";

import { NavLink } from "react-router-dom";

// import AddPet from "../../components/add-pet/add-pet";

import PetsOutlinedIcon from "@mui/icons-material/PetsOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./table.module.scss";
import Table from "../../components/table/table";
import { useQuery } from "@tanstack/react-query";
import { IPet } from "../../models/pet.interface";
import { apiUrl } from "../../constants/apiUrl";
import dayjs from "dayjs";

interface Pet {
  name: string;
  ownerName: string;
  age: string;
  type: string;
  registerDate: string;
}

export default function Pets() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const columns = useMemo<ColumnDef<Pet>[]>(
    () => [
      {
        accessorKey: "name",
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
      },
      {
        accessorKey: "owner",
        cell: (info: any) => info.getValue().name,
        header: () => <span>Owner Name</span>,
      },
      {
        accessorKey: "age",
        cell: (info) => info.getValue(),
        header: () => <span>Age</span>,
        enableSorting: false,
      },
      {
        accessorKey: "petType",
        cell: (info: any) => info.getValue().breed.description,
        header: () => <span>Type</span>,
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
    queryKey: ["pets-table", pagination],
    queryFn: async (): Promise<{
      data: IPet[];
      total: number;
      pageNumber: number;
    }> => {
      const res = await fetch(
        `${apiUrl}/pets?pageNumber=${pagination.pageIndex + 1}&pageSize=20`,
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
        <NavLink className="flex items-center bg-white dark:bg-dark-3" to="add">
          <div>
            <PetsOutlinedIcon htmlColor="#778CA2" />
          </div>

          <span className="font-medium text-black dark:text-dark-text">
            Add new pet
          </span>
        </NavLink>
      </div>

      <Table
        data={data.data}
        columns={columns}
        pagesSize={25}
        pagination={pagination}
        setPagination={setPagination}
      />

      {/* <AddPet /> */}
    </section>
  );
}
