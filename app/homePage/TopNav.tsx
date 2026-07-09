import { NavLink } from "react-router";
import "./topNav.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/tetris", label: "Tetris" },
  { to: "/pokemon-guide", label: "Pokemon Blue Guide" },
];

export default function TopNav() {
  return (
    <nav className="topNav">
      <span className="topNav-brand">Jeffski</span>
      <div className="topNav-links">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              isActive ? "topNav-link topNav-link--active" : "topNav-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
