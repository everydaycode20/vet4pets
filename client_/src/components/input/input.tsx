import { useState } from "react";
import { Input as MuiInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import { Button } from "@mui/base/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import styles from "./input.module.scss";
import JoinClasses from "../../utils/join-classes";

interface IInput {
  label: string;
  id: string;
  placeholder: string;
  field: any;
  type?: "default" | "password";
}

export default function Input({
  label,
  id,
  placeholder,
  field,
  type = "default",
}: IInput) {
  if (type === "password") {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: any) => {
      event.preventDefault();
    };

    return (
      <div className={"w-full " + styles.input}>
        <label className="w-full block" htmlFor={id}>
          {label}
        </label>

        <MuiInput
          type={showPassword ? "text" : "password"}
          className={JoinClasses(
            "w-full flex input-password rounded-5",
            styles["input-container-password"]
          )}
          id={id}
          placeholder={placeholder}
          {...field}
          endAdornment={
            <InputAdornment className={JoinClasses("", styles["password-toggler"])}>
              <IconButton
                size="small"
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    );
  }

  return (
    <div className={"w-full " + styles.input}>
      <label className="w-full block" htmlFor={id}>
        {label}
      </label>

      <MuiInput
        className={JoinClasses(
          "w-full flex rounded-5 input-text",
          styles["input-container"]
        )}
        id={id}
        placeholder={placeholder}
        {...field}
      />
    </div>
  );
}

const InputAdornment = styled("div")`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: #778ca2;
`;
