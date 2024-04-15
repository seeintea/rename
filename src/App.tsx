import styles from "./app.module.scss";
import Button from "./components/Button";

export default function App() {
  return (
    <main className={styles.container}>
      <div>
        <div>upload item</div>
        <Button>111111222</Button>
      </div>
      <div>file list</div>
    </main>
  );
}
