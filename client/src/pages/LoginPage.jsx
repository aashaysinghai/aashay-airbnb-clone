import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContextProvider } from "../UserContext";

export default function IndexPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const setUser = useContext(UserContextProvider);
  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const resp = await axios.post("/auth/login", { email, password });
      setUser(resp.data);
      alert("Login Sucessfull");
      setRedirect(true);
    } catch (err) {
      alert("Login Failed");
    }
  }
  if (redirect) {
    return <Navigate to={"/"}></Navigate>;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form action="" className="max-w-md mx-auto">
          <input
            type="email"
            placeholder="email@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="pasword"
            value={password}
            onChange={(ev) => setpassword(ev.target.value)}
          />
          <button className="primary" onClick={handleLoginSubmit}>
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?
            <Link to={"/register"} className="underline text-black">
              Register Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
