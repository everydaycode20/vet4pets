import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { number, object, string } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";

import Input from "../../components/input/input";

import { apiUrl } from "../../constants/apiUrl";
import { IPetType } from "../../models/pet.interface";

import styles from "./add-pet.module.scss";
import {
  Content,
  Item,
  Portal,
  Root,
  Trigger,
} from "@radix-ui/react-dropdown-menu";
import JoinClasses from "../../utils/join-classes";
import SubmitBtn from "../../components/submit-btn/submit-btn";
import OwnerModal from "../appointments/owner-modal";
import Toast from "../../components/toast/toast";

interface IFormInput {
  name: string;
  owner: {
    id: number;
    name: string;
  };
  age: number;
  type: number;
}

const schema = object({
  name: string().min(1, { message: "Enter a name" }),
  owner: object({
    id: number().positive({ message: "Must select an owner" }),
    name: string(),
  }),
  age: number({ message: "Enter an age" })
    .positive({
      message: "Enter an age greater than 0",
    })
    .min(1),
  type: number().positive({ message: "Select a type" }),
});

export default function AddPet() {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addNewOwner.mutate(data);
  };

  const [petType, setPetType] = useState("");

  const [owner, setOwner] = useState<{ id?: number; name?: string }>({});

  const [openToast, setOpenToast] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      owner: {},
      age: 0,
      type: -1,
    },
  });

  const petTypes = useQuery({
    queryKey: ["pets-table"],
    queryFn: async (): Promise<IPetType[]> => {
      const res = await fetch(`${apiUrl}/pets/types`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      return await res.json();
    },
  });

  const addNewOwner = useMutation({
    mutationFn: async (data: IFormInput) => {
      const { type, owner, ...rest } = data;

      const obj = { ...rest, petTypeId: type, OwnerId: owner.id };

      const res = await fetch(`${apiUrl}/pets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(obj),
      });

      return res.json();
    },
    onSuccess: () => {
      reset();

      setPetType("");

      setOpenToast(true);
    },
    onError: () => {}, //TODO
  });

  return (
    <div
      className={JoinClasses(
        "container h-full bg-white dark:bg-dark",
        styles["form-main-container"]
      )}
    >
      <section className="h-full">
        <NavLink to="/pets" className="p-3">
          <span className="sr-only">go back</span>

          <ArrowBackIcon />
        </NavLink>

        <form
          className={JoinClasses(
            "mt-[12px] flex flex-col gap-y-[12px]",
            styles.form
          )}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-x-[12px]">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => {
                return (
                  <Input
                    id="name"
                    label="Pet name"
                    placeholder="Pet name"
                    field={field}
                    invalid={fieldState.invalid}
                    error={fieldState?.error?.message}
                  />
                );
              }}
            />

            <Controller
              name="age"
              control={control}
              render={({ field, fieldState }) => {
                console.log(fieldState.invalid);

                return (
                  <Input
                    value={field.value}
                    type="number"
                    id="age"
                    label="Age"
                    placeholder="Type an age"
                    field={field}
                    invalid={fieldState.invalid}
                    error={fieldState?.error?.message}
                  />
                );
              }}
            />
          </div>

          <div className="flex gap-x-[12px]">
            <div className="w-full">
              <Controller
                name="type"
                control={control}
                render={({ field }) => {
                  return (
                    <Root>
                      <Trigger
                        asChild
                        className={JoinClasses(
                          "dropdown-button",
                          errors.type && "dropdown-button-error"
                        )}
                      >
                        <button type="button">
                          {petType ? petType : "Select a type"}
                        </button>
                      </Trigger>

                      <Portal>
                        <Content
                          className={JoinClasses("", styles["type-content"])}
                        >
                          {petTypes.data?.map((type) => {
                            return (
                              <Item
                                className={JoinClasses(
                                  "",
                                  styles["type-content-item"]
                                )}
                                key={type.id}
                                onSelect={() => {
                                  console.log(type.id);

                                  field.onChange(type.id);

                                  setPetType(type.description);
                                }}
                              >
                                {type.description}
                              </Item>
                            );
                          })}
                        </Content>
                      </Portal>
                    </Root>
                  );
                }}
              />

              {errors.type && (
                <span className="text-pink block">
                  A type should be selected
                </span>
              )}
            </div>

            <div className="w-full">
              <Controller
                name="owner"
                control={control}
                render={({ field: { onChange, value } }) => {
                  console.log(value, "ASa");

                  if (value.id && value.name) {
                    setTimeout(() => {
                      setOwner(value); //TODO: fix
                    });
                  }

                  return (
                    <OwnerModal
                      onChange={(e) => {
                        if (e.id && e.name) {
                          setOwner({ id: e.id, name: e.name });
                        }
                        console.log(e);

                        onChange(e);
                      }}
                      value={value}
                      button={
                        <button
                          type="button"
                          className={JoinClasses(
                            "",
                            styles["select-owner-btn"],
                            errors.owner && styles["select-owner-btn-error"]
                          )}
                        >
                          {value.id
                            ? `Change ${owner.name}`
                            : "Select an owner "}

                          <span className="sr-only">opens a dialog</span>
                        </button>
                      }
                    />
                  );
                }}
              />

              {errors.owner && (
                <span className="text-pink block">select an owner</span>
              )}
            </div>
          </div>

          <div>
            <SubmitBtn text="Add Pet" classes="" />
          </div>
        </form>
      </section>

      <Toast
        type="success"
        title="Pet added"
        description="A new pet has been saved"
        open={openToast}
        setOpen={setOpenToast}
      />
    </div>
  );
}
