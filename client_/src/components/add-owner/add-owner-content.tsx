import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, object, string } from "zod";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";

import Input from "../input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./add-owner.module.scss";
import SubmitBtn from "../submit-btn/submit-btn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { ITelephoneType } from "../../models/person.interface";
import { useState } from "react";

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  phoneType: number;
  address: string;
  email: string;
}

const schema = object({
  firstName: string().min(1, { message: "Enter a name" }),
  lastName: string().min(1, { message: "Enter a last name" }),
  phone: string()
    .min(1, { message: "Enter a phone" })
    .regex(/^\d+$/, { message: "Invalid phone. Numbers only" }),
  phoneType: number().nonnegative(),
  address: string().min(1, { message: "Enter an address" }),
  email: string().email(),
});

export default function AddOwnerContent() {
  const [phoneType, setPhoneType] = useState("");

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
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
    mutationFn: async () => {
      const res = await fetch(`${apiUrl}/owners`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
    onSuccess: () => {},
    onError: () => {},
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
      phone: "",
      address: "",
      email: "",
      phoneType: -1,
    },
  });

  console.log(errors);

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

            <div className="flex items-center gap-x-[12px]">
              <div className="flex-1">
                <Controller
                  name="phone"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  render={({ field, fieldState }) => {
                    return (
                      <Input
                        id="phone"
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

              <div className="flex-1">
                <Controller
                  name="phoneType"
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => {
                    return (
                      <Root>
                        <Trigger
                          className={JoinClasses(
                            "dropdown-button",
                            errors.phoneType &&
                              "dropdown-button-error mt-[30px]"
                          )}
                          asChild
                        >
                          <button type="button">
                            {phoneType ? phoneType : "Select a phone type"}
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

                                    setPhoneType(type.type);
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

                {errors.phoneType && (
                  <span className="text-pink mt-[5px] block">
                    Select a phone type
                  </span>
                )}
              </div>
            </div>

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
