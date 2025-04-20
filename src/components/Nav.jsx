import { NavLink } from "react-router-dom";

const menuItems = [
  { to: "/", icon: "Squares four 1.png", label: "Dashboard" },
  { to: "/projects", icon: "Folder.png", label: "Projects" },
  { to: "/teams", icon: "Groups.png", label: "Teams" },
  { to: "/analytics", icon: "Pie chart.png", label: "Analytics" },
  { to: "/messages", icon: "Chat.png", label: "Messages" },
  { to: "/integrations", icon: "Code.png", label: "Integrations" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen px-6 py-8 bg-white shadow-sm border-r">
      {/* Logo */}
      <div className="flex items-center mb-10">
        <img
          src="src/assets/img/Image 1858.png"
          alt="Logo"
          className="w-40 h-10 mr-2"
        />
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-pink-500 text-white font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <img
                  src={`src/assets/img/${item.icon}`}
                  alt={item.label}
                  className="w-5 h-5 mr-3"
                />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
