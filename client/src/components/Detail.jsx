import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import s from "./DetailStyle.module.css";
import Detalle from "./../img/tur.png";

import Not from "./../img/ubicacion.gif";

export default function Detail() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const detalleCountry = useSelector((state) => state.detail);

  console.log(detalleCountry);

  useEffect(() => {
    dispatch(getDetail(id)); //para acceder al id de ese detalle
  }, [dispatch]);

  return (
    <div>
      <div className={s.bodyDetail}>
       
        {/* <div>
          <Link to="/home">
            <button className={s.btnVolDetail}>Volver</button>
          </Link>
        </div> */}

        {detalleCountry ? (
          <div className={s.info}>
            <div className={s.cards1}>
              <h1 className={s.h1name}>{detalleCountry.name}</h1>
              <div className={s.flagsStyle}>
                <img
                  src={detalleCountry.flags}
                  alt="flag"
                  width="200px"
                  height="127px"
                  margin="0px"
                  text-shadow=" rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
                />
              </div>
              <h2>Código de país: {detalleCountry.id}</h2>
              <h3>Continente: {detalleCountry.continents}</h3>
              <h4>Capital: {detalleCountry.capital}</h4>
              <h4>Subregión: {detalleCountry.subregion}</h4>
              <h4>Área: {detalleCountry.area} km²</h4>
              <h4>Población: {detalleCountry.population} hab.</h4>
            </div>
            <div className={s.cards2}>
              <h1>Actividades turísticas</h1>
              <div className={s.actcontent}>
                {detalleCountry.activities.length ? (
                  detalleCountry.activities.map((a) => {
                    return (
                      <div className={s.cardAct}>
                        <div key={a.id}>
                          <h3 className={s.nameact}>{a.name}</h3>
                          <p>Difficultad: {a.difficulty}</p>
                          <p>Duración: {a.duration} hs</p>
                          <p>Temporada:</p>
                          {a.season.map((s) => {
                            return <p>{s}</p>;
                          })}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p>
                    <h2>Oops!</h2>
                    Este país aún no tiene actividades turísticas asignadas.
                    <br></br>
                    Si quieres puedes crearle una!!!
                    <br></br>
                    <div>
                      <Link to="/activity">
                        <button className={s.btnact}>
                          Crear actividad turística
                        </button>
                      </Link>
                    </div>
                    <div className={s.img}>
                      <img id="act" src={Detalle} alt="img" />
                    </div>
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={s.error}>
            <div className={s.errorBody}>
            <p className={s.notCountries}>PAÍS INEXISTENTE!!!!!</p>
            {/* <div className={s.img}>
              <img id="act" src={Detalle} alt="img" />
            </div> */}
            <img
          className={s.gif}
          id="not"
          src={Not}
          width="450"
          height="450"
          // top="10px"
          filter="drop-shadow(20px 50px 20px black)"
          alt=""
        />
        <br></br>
        <Link to="/home">
        <button className={s.notVol}>Volver</button>
      </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
