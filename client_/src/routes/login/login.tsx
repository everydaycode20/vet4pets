import { useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";
import { useAtom } from "jotai";

import Input from "../../components/input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./login.module.scss";
import SubmitBtn from "../../components/submit-btn/submit-btn";
import { Navigate, useLocation } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import Spinner from "../../components/spinner/spinner";
import { spinnerState } from "../../components/spinner/spinner-state";
import { useQueryClient } from "@tanstack/react-query";

interface IFormInput {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().min(1),
  password: string().min(1, { message: "Enter a password" }),
});

export default function Login() {
  const location = useLocation();

  const login = useLogin();

  const queryClient = useQueryClient();

  const [_, setSpState] = useAtom(spinnerState);

  console.log(login.isPending);

  useEffect(() => {
    console.log(login.isPending, "<----");

    setSpState(login.isPending);
  }, [login.isPending]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login.mutate({
      email: data.email,
      password: data.password,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log(errors);

  if (login.isSuccess) {
    queryClient.invalidateQueries({ queryKey: ["user"] });

    return <Navigate to="/dashboard" />;
  }

  return (
    <div
      className={JoinClasses(
        "",
        location.pathname === "/login" &&
          "flex items-center justify-center h-screen"
      )}
    >
      {login.isPending && (
        <div className="absolute h-screen w-screen">
          <div className="absolute left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
            <Spinner state={true} />
          </div>

          <div className="absolute bg-white h-screen w-screen opacity-40"></div>
        </div>
      )}

      <div className={JoinClasses("", styles["form-container"])}>
        <h1>Sign In</h1>

        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={JoinClasses("flex flex-col", styles.form)}
          >
            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field, fieldState }) => {
                return (
                  <Input
                    required
                    testId="email"
                    id="email"
                    label="Your email"
                    placeholder="Enter your email"
                    field={field}
                    invalid={fieldState.invalid}
                    error={fieldState?.error?.message}
                  />
                );
              }}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field, fieldState }) => (
                <Input
                  required
                  testId="password"
                  id="password"
                  label="Password"
                  placeholder="Enter your password"
                  field={field}
                  type="password"
                  invalid={fieldState.invalid}
                  error={fieldState?.error?.message}
                />
              )}
            />

            <SubmitBtn
              testId="submit-btn"
              text="Sign In"
              classes={styles["submit-btn"]}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
