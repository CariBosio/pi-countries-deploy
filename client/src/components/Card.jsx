import React from "react";
import { Link } from "react-router-dom";
import s from "./CardStyle.module.css";


export default function Card({ flags, name, continents, population, id }) {
  // le paso por props: flags, name, continents y por eso no necesito traerme ningún estado
  return (
    <div className={s.card}>
      <img src={flags} alt="img not found" width="80px" height="52px"   />
      <h3 font-weight="bold" className={s.name}>{name}</h3>
      <h4>{continents}</h4>
      <h5>{population}</h5>

      <Link to={`/countries/${id}`}><button className={s.mas}>Ver más</button></Link>
    </div>
  );
}

// [ ] Los campos mostrados en la ruta principal para cada país (imagen de la bandera, nombre, código de país de 3 letras y continente)
// [ ] Código de país de 3 letras (id)
// [ ] Capital
// [ ] Subregión
// [ ] Área (Mostrarla en km2 o millones de km2)
// [ ] Población
// [ ] Actividades turísticas con toda su información asociada
