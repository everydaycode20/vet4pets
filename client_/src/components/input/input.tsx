import { ChangeEvent, useState } from "react";
import { Input as MuiInput } from "@mui/base/Input";
import { styled } from "@mui/system";
import { Button } from "@mui/base/Button";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Debounce from "../../utils/debounce";

import styles from "./input.module.scss";
import JoinClasses from "../../utils/join-classes";

interface IInput {
  label?: string;
  id: string;
  placeholder: string;
  field?: any;
  type?: "default" | "password";
  invalid?: boolean;
  error?: string;
  withDebounce?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}

export default function Input({
  label,
  id,
  placeholder,
  field,
  type = "default",
  invalid,
  error,
  withDebounce,
  onChange,
  value,
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
          autoComplete="true"
          error={invalid}
          type={showPassword ? "text" : "password"}
          className={JoinClasses(
            "w-full flex input-password rounded-5",
            styles["input-container-password"]
          )}
          id={id}
          placeholder={placeholder}
          {...field}
          endAdornment={
            <InputAdornment
              className={JoinClasses("", styles["password-toggler"])}
            >
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

        <span className="text-pink">{error}</span>
      </div>
    );
  }

  if (withDebounce) {
    const change = Debounce((e) => {
      onChange && onChange(e.target.value);
    });

    return (
      <div className={"w-full " + styles.input}>
        {label && (
          <label className="w-full block" htmlFor={id}>
            {label}
          </label>
        )}

        <MuiInput
          // value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => change(e)}
          error={invalid}
          className={JoinClasses(
            "w-full flex rounded-5 input-text",
            styles["input-container"]
          )}
          id={id}
          placeholder={placeholder}
          // {...field}
        />

        <span className="text-pink">{error}</span>
      </div>
    );
  }

  return (
    <div className={"w-full " + styles.input}>
      <label className="w-full block" htmlFor={id}>
        {label}
      </label>

      <MuiInput
        error={invalid}
        className={JoinClasses(
          "w-full flex rounded-5 input-text",
          styles["input-container"]
        )}
        id={id}
        placeholder={placeholder}
        {...field}
      />

      <span className="text-pink">{error}</span>
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
