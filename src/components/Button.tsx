import React, { MouseEventHandler } from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  base: {
    border: 0,
    borderRadius: "0.5rem",
    padding: "0 1rem",
    fontSize: "16px",
    lineHeight: 1.5,
    color: "#ffffff",
    height: "2.5rem",
    cursor: "pointer",
    ":focus": {
      outline: "2px solid #0000",
      outlineOffset: "2px",
    },
  },
  primary: {
    backgroundColor: "#000",
    ":focus": {
      boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #94a3b8",
    },
    ":hover": {
      backgroundColor: "#334155",
    },
  },
  danger: {
    backgroundColor: "#dc2626",
    ":focus": {
      boxShadow: "0 0 0 2px #ffffff, 0 0 0 4px #fca5a5",
    },
    ":hover": {
      backgroundColor: "#ef4444",
    },
  },
  block: {
    width: "100%",
  },
});

type ButtonTypeItem = "primary" | "danger";

interface ButtonProps extends React.PropsWithChildren {
  type?: ButtonTypeItem;
  block?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

const defaultButtonProps: ButtonProps = {
  type: "primary",
  block: false,
};

const Button = (props: ButtonProps) => {
  const mergeProps = {
    ...defaultButtonProps,
    ...props,
  };

  return (
    <button
      {...stylex.props(
        styles.base,
        styles[mergeProps.type!],
        mergeProps.block ? styles.block : {}
      )}
      onClick={mergeProps.onClick}
    >
      {mergeProps.children}
    </button>
  );
};

export type { ButtonProps };
export { Button };
