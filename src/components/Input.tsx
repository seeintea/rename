import * as stylex from "@stylexjs/stylex";
import { InputHTMLAttributes } from "react";

const styles = stylex.create({
  base: {
    borderRadius: "0.5rem",
    padding: "0 1rem",
    height: "2.5rem",
    boxSizing: "border-box",
    outline: 0,
    border: "1px solid #e5e7eb",
    fontSize: "1rem",
    color: "#666666",
    ":focus": {
      boxShadow: "inset 0 0 2px #4f46e5",
      borderColor: '#4f46e5',
    },
  },
});

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: InputProps) => {
  return <input {...stylex.props(styles.base)} {...props} />;
};

export { Input };
export type { InputProps };
