import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPageStyle.module.css";
import Intro from "./../img/video.mp4";
import Logo from "./../img/logo.png";
import Poster from "./../img/poster.png";

export default function LandingPage() {
  return (
    <body className={s.body}>
    <main id="inicio">
      <div className={s.bodyLanding}>
        <div className={s.logoprinc}>
          <img
            id="logo"
            src={Logo}
            width="550px"
            height="162px"
            top="10px"
            className={s.shadow}
            alt=""
          />
        </div>
        <div>
          <Link to="/home">
            <button className={s.btning}>INGRESAR</button>
          </Link>
        </div>
      </div>
      <div >
        <video
        className={s.video}
          // id="intro"
          src={Intro}
          // width="200"
          // height="59"
          autoPlay
          loop
          muted
          // top="10px"
          // className="d-inline-block align-top"
          alt=""
          poster={Poster}
        />
      </div>
    </main>
    </body>
  );
}

//Botón para ingresar al home (Ruta principal)
