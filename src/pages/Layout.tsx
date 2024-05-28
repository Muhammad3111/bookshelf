import TopHeader from "../components/TopHeader";
import Books from "./Books";

export default function Layout() {
  return (
    <div style={{ width: "100%" }}>
      <div style={{ border: "1px solid #808080" }}>
        <TopHeader />
      </div>
      <div>
        <Books />
      </div>
    </div>
  );
}
