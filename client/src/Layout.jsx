import { Outlet } from "react-router-dom";
import HeaderPage from "./Header";

export default function Layoput() {
  return (
    <div className="p-4 flex flex-col min-h-screen">
      <HeaderPage></HeaderPage>
      <Outlet></Outlet>
    </div>
  );
}
