import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import Input from "../components/input/input";

interface IFormInput {
  email: string;
  password: string;
}

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
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

  return (
    <main>
      <h1>Sign In</h1>
      
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="test"
                label="Your email"
                placeholder="Enter your email"
                field={field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                id="password"
                label="Password"
                placeholder="Enter your password"
                field={field}
                type="password"
              />
            )}
          />
        </form>
      </div>
    </main>
  );
}
