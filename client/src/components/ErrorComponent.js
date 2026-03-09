import React from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import Not from "./../img/ubicacion.gif";
import s from "./ErrorComponent.module.css";
import {
    getCountries,
    clearError,
  } from "../actions";

export default function ErrorComponent() {
    const dispatch = useDispatch();

    function handleSubmitError(e) {
        e.preventDefault();
        dispatch(getCountries());
        dispatch(clearError());
      }
    


  return (
    <div className={s.cardError}>
        <div className={s.cardErrorBody}>
      <p className={s.notCountries}>PAÍS INEXISTENTE!!!!!</p>
     
      <img
        className={s.gif}
        id="not"
        src={Not}
        width="250"
        height="250"
        top="10px"
        filter="drop-shadow(20px 50px 20px black)"
        alt=""
      />
      <br></br>
      <Link to="/home">
        <button className={s.notVol} onClick={(e) => handleSubmitError(e)}>Volver</button>
      </Link>
      </div>
    </div>
  );
}
