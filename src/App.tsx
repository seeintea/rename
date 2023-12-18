import { Button } from "./components/Button";
import { Input } from "./components/Input";

export default function App() {
  return (
    <div className="m-10 flex gap-10">
      <div>
        <Input />
        <Button>Get started</Button>
      </div>
      <div style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Button>Get started</Button>
        <Button type="danger">Get started</Button>
      </div>
      <Button block>Get started</Button>
    </div>
  );
}
