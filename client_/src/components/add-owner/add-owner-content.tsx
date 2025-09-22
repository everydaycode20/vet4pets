import { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { array, number, object, string } from "zod";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import Input from "../input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./add-owner.module.scss";
import SubmitBtn from "../submit-btn/submit-btn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { ITelephoneType } from "../../models/person.interface";
import { useAtom } from "jotai";
import { addOwnerState } from "./add-owner";

interface IFormInput {
  firstName: string;
  lastName: string;
  telephones?: { number: string; telephoneTypeId: number }[];
  address: string;
  email: string;
}

const schema = object({
  firstName: string().min(1, { message: "Enter a name" }),
  lastName: string().min(1, { message: "Enter a last name" }),
  telephones: array(
    object({
      number: string()
        .min(1, { message: "Enter a phone" })
        .regex(/^\d+$/, { message: "Invalid phone. Numbers only" }),
      telephoneTypeId: number().nonnegative(),
    })
  ).min(1),
  address: string().min(1, { message: "Enter an address" }),
  email: string().email(),
});

export default function AddOwnerContent() {
  const [phoneType, setPhoneType] = useState<{ type: string; index: number }[]>(
    []
  );

  const [state, setState] = useAtom(addOwnerState);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    addNewOwner.mutate(data);
  };

  const phoneTypes = useQuery({
    queryKey: ["phoneTypes"],
    queryFn: async (): Promise<ITelephoneType[]> => {
      const res = await fetch(`${apiUrl}/telephone/types`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
  });

  const addNewOwner = useMutation({
    mutationFn: async (data: any) => {
      const { firstName, lastName, ...rest } = data;

      const obj = { ...rest, name: `${firstName} ${lastName}` };

      const res = await fetch(`${apiUrl}/owners`, {
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
      setState(false);
    },
    onError: () => {}, //TODO
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      telephones: [{ number: "", telephoneTypeId: -1 }],
      address: "",
      email: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "telephones",
  });

  return (
    <div
      className={JoinClasses("w-full h-full", styles["add-owner-container"])}
    >
      <div className="h-full w-full flex flex-col">
        <div className={JoinClasses("w-full", styles.title)}>
          <span className="font-semibold text-black ">Add new Owner</span>
        </div>

        <div className={JoinClasses("", styles["form-container"])}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="Owner Name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Owner Last Name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div>
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="email"
                      label="Email"
                      placeholder="Email"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            {fields.map((phone, index) => {
              return (
                <div key={index} className="flex items-center gap-x-[12px]">
                  <div className="self-baseline" key={phone.id}>
                    <div className="flex-1">
                      <Controller
                        name={`telephones.${index}.number`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field, fieldState }) => {
                          return (
                            <Input
                              id={phone.id}
                              label="Phone"
                              placeholder="Phone"
                              field={field}
                              invalid={fieldState.invalid}
                              error={fieldState?.error?.message}
                            />
                          );
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex-1 flex items-center ">
                    <div className={JoinClasses("", styles["select-type"])}>
                      <span
                        aria-hidden="false"
                        className="text-[12px] mb-[12px] block leading-[18px] invisible"
                      >
                        Type
                      </span>

                      <Controller
                        name={`telephones.${index}.telephoneTypeId`}
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => {
                          return (
                            <Root>
                              <Trigger
                                className={JoinClasses(
                                  "dropdown-button",
                                  errors.telephones &&
                                    errors.telephones[index]?.telephoneTypeId &&
                                    "dropdown-button-error"
                                )}
                                asChild
                              >
                                <button type="button">
                                  {phoneType[index]
                                    ? phoneType[index]?.type
                                    : "Select a phone type"}
                                </button>
                              </Trigger>

                              <Portal>
                                <Content
                                  className={JoinClasses(
                                    "",
                                    styles["phone-type-content"]
                                  )}
                                >
                                  {phoneTypes.data?.map((type) => {
                                    return (
                                      <Item
                                        className={JoinClasses(
                                          "",
                                          styles["phone-type-content-item"]
                                        )}
                                        key={type.id}
                                        onSelect={() => {
                                          field.onChange(type.id);

                                          const existingType = phoneType.find(
                                            (p) => p.index === index
                                          );

                                          setPhoneType((prev) => {
                                            if (existingType) {
                                              return prev.map((p) => {
                                                if (p.index === index) {
                                                  return {
                                                    ...p,
                                                    type: type.type,
                                                  };
                                                }

                                                return p;
                                              });
                                            } else {
                                              return [
                                                ...prev,
                                                { index, type: type.type },
                                              ];
                                            }
                                          });
                                        }}
                                      >
                                        {type.type}
                                      </Item>
                                    );
                                  })}
                                </Content>
                              </Portal>
                            </Root>
                          );
                        }}
                      />

                      <span
                        className={JoinClasses(
                          "text-pink mt-[5px] block",
                          errors.telephones &&
                            errors.telephones[index]?.telephoneTypeId
                            ? "visible"
                            : "invisible"
                        )}
                      >
                        Select a phone type
                      </span>
                    </div>

                    {index === 0 && (
                      <button
                        className={JoinClasses(
                          "flex flex-1 p-2 justify-center"
                        )}
                        type="button"
                        aria-label="add another phone number"
                        onClick={() => {
                          append({ number: "", telephoneTypeId: -1 });
                        }}
                      >
                        <AddCircleOutlineIcon htmlColor="#4d7cfe" />
                      </button>
                    )}

                    {index > 0 && (
                      <button
                        className={JoinClasses(
                          "flex flex-1 p-2 justify-center"
                        )}
                        type="button"
                        aria-label="remove phone number"
                        onClick={() => {
                          const arr = phoneType.filter(
                            (p) => p.index !== index
                          );

                          remove(index);

                          setPhoneType(arr);
                        }}
                      >
                        <HighlightOffIcon htmlColor="#fe4d97" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            <div>
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="address"
                      label="Address"
                      placeholder="Address  "
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div>
              <SubmitBtn text="Add Owner" classes="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
