import styles from "./button.module.scss";

interface ButtonProps extends React.PropsWithChildren {
  type?: "primary" | "danger";
}

export default function Button(props: ButtonProps) {
  const { type = "primary" } = props;

  const classes = `${styles.button} ${styles['btn-' + type]}`;

  return <button className={classes}>{props.children}</button>;
}
