import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Calendar,
  BookOpen,
  Activity,
  Heart,
  MessageCircle,
  MapPin,
  Recycle,
  Menu,
  X,
} from "lucide-react";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/chat", icon: MessageCircle, label: "Chat Saúde" },
    { path: "/", icon: Home, label: "Dashboard" },
    { path: "/localizar", icon: MapPin, label: "Localizar" },
    { path: "/educacao", icon: BookOpen, label: "Educação" },
    { path: "/pontos-coleta", icon: Recycle, label: "Pontos de Coleta" },
    { path: "/exames", icon: Calendar, label: "Exames" },
    { path: "/atividades", icon: Activity, label: "Atividades" },
    { path: "/saude-mental", icon: Heart, label: "Saúde Mental" },
  ];

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="layout">
      <aside className={`sidebar ${isMenuOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon-wrapper">
              <img
                src="/Logo healh.png"
                alt="Health On Time Logo"
                className="logo-image"
              />
            </div>
            <div className="logo-text">
              <h1>Health On Time</h1>
              <p className="logo-subtitle">Saúde Preventiva</p>
            </div>
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`nav-link ${
                      isActive(item.path) ? "active" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="nav-icon" size={20} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <p className="sidebar-footer-text">
            Cuidando da sua saúde e do meio ambiente
          </p>
          <div className="sidebar-status">
            <span className="status-dot"></span>
            <span>Sistema online</span>
          </div>
        </div>
      </aside>

      <div className="main-wrapper">
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
