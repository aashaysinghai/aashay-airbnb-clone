import { Navigate, Link, useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import axios from "axios";

export default function AccountPage() {
  const { ready, user, setUser } = useContext(UserContext);
  const [redirect, setRedirect] = useState(null);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/auth/logout");
    setRedirect("/");
    setUser(null);
  }
  if (!ready) {
    return <div>Loading...</div>;
  }
  if (ready && !user && !redirect) {
    <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="">
      <nav className="w-full flex justify-center gap-2 mt-8 mb-8">
        <Link className={linkClasses("profile")} to={"/account/profile"}>
          My Profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My Bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My Places
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-sm mx-auto">
          Logged in as {user.username} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
