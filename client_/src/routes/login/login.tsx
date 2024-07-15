import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string } from "zod";

import Input from "../../components/input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./login.module.scss";
import SubmitBtn from "../../components/submit-btn/submit-btn";

interface IFormInput {
  email: string;
  password: string;
}

const schema = object({
  email: string().email().min(1),
  password: string().min(1, { message: "Enter a password" }),
});

export default function Login() {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
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

  return (
    <main className="flex items-center justify-center">
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

            <SubmitBtn text="Sign In" classes={styles["submit-btn"]} />
          </form>
        </div>
      </div>
    </main>
  );
}
