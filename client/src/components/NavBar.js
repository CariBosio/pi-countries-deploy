import React from "react";
import { Link } from "react-router-dom";
import s from "./NavBar.module.css";
import Logo from "./../img/logo.png";
import Linkedin from "./../img/linkedin.png";
import GitHub from "./../img/github.png";

export default function NavBar() {
  return (
    <header className={s.navbar}>
      <div>
        <img
          className={s.shadow}
          id="logo"
          src={Logo}
          width="200"
          height="59"
          top="10px"
          filter="drop-shadow(20px 50px 20px black)"
          alt=""
        />
      </div>
      <nav>
        <ul className={s.list}>
          <li className={s.listitem}>
            <Link to="/">Inicio</Link>
            <Link to="/home">Página principal</Link>
            <a href="https://github.com/CariBosio/PI-Countries">
              <img
                id="linkedin"
                src={GitHub}
                width="25"
                height="25"
                className={s.link}
                alt="img"
              />
            </a>

            <a href="https://www.linkedin.com/in/carina-susana-bosio-73621215b/">
              <img
                id="linkedin"
                src={Linkedin}
                width="25"
                height="25"
                className={s.link}
                alt="img"
              />
            </a>

            <Link to="/activity" className={s.final}>Crear actividad turística</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
