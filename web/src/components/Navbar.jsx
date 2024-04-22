import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AuthenticatedNavbar({ user, logout }) {
  return (
    <>
      <li>Welcome {user.username}</li>
      <li>
        <Link to="/add-task" className="bg-indigo-500 px-4 py-1">
          Add Task
        </Link>
      </li>
      <li>
        <Link
          to="/"
          onClick={() => {
            logout();
          }}
        >
          Logout
        </Link>
      </li>
    </>
  );
}

function GuestNavbar() {
  return (
    <>
      <li>
        <Link to="/login" className="bg-indigo-500 px-4 py-1">
          Login
        </Link>
      </li>
      <li>
        <Link to="/register" className="bg-indigo-500 px-4 py-1">
          Register
        </Link>
      </li>
    </>
  );
}

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/" : "/"}>
        <h1 className="text-2xl font-bold">Task Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <AuthenticatedNavbar user={user} logout={logout} />
        ) : (
          <GuestNavbar />
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
