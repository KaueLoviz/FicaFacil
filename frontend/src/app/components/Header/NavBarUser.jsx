import React from "react";
import { Link } from "react-router-dom";
import { Tooltip, IconButton, Zoom } from "@material-ui/core";
import {
  FaSearch,
  FaChartLine,
  FaChartPie,
  FaUserAlt,
  FaCog,
  FaSignOutAlt,
  FaEdit,
} from "react-icons/fa";

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export default function NavbarUser() {
  const [user, setUser] = React.useState({ nome: "Usuário" });

  React.useEffect(() => {
    if (localStorage.getItem("auth")) {
      let user = parseJwt(localStorage.getItem("auth"));
      setUser(user);
    }
  }, []);
  return (
    <nav className="c-navbar">
      <ul className="c-navbar__menu">
        <li className="c-navbar__menu-item sc">
          <div className="c-navbar__search">
            <FaSearch className="icon" />
          </div>
          <input
            type="text"
            className="c-navbar__input-search"
            placeholder="Pesquisar..."
          />
          <span className="c-navbar__tooltip">Pesquisar</span>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/desempenho">
            <div className="space">
              <FaChartLine className="icon" />
              <span className="c-navbar__links-name">Desempenho</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Desempenho</span>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/metricas">
            <div className="space">
              <FaChartPie className="icon" />
              <span className="c-navbar__links-name">Métricas</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Métricas</span>
        </li>
        <li className="c-navbar__dropdown">
          <div className="c-navbar__menu-item">
            <Link to="/simulado">
              <div className="space">
                <FaEdit className="icon" />
                <span className="c-navbar__links-name">Simulado</span>
              </div>
            </Link>
            <span className="c-navbar__tooltip">Simulado</span>
          </div>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/entrar">
            <div className="space">
              <FaUserAlt className="icon" />
              <span className="c-navbar__links-name">Perfil</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Perfil</span>
        </li>
        <li className="c-navbar__menu-item">
          <Link to="/configuracoes">
            <div className="space">
              <FaCog className="icon" />
              <span className="c-navbar__links-name">Configuração</span>
            </div>
          </Link>
          <span className="c-navbar__tooltip">Configuração</span>
        </li>
        <li className="c-navbar__profile">
          <div className="c-navbar__profile-details">
            <div className="c-navbar__name-job">
              <div className="name">{user.nome}</div>
            </div>
          </div>
          <Tooltip
            title="Sair"
            TransitionComponent={Zoom}
            className="c-navbar__log-out icon"
          >
            <IconButton
              style={{ background: "transparent" }}
              onClick={() => {
                localStorage.removeItem("auth");
                localStorage.removeItem("user");
                window.location.reload();
              }}
            >
              <FaSignOutAlt className="icon" />
            </IconButton>
          </Tooltip>
        </li>
      </ul>
    </nav>
  );
}
