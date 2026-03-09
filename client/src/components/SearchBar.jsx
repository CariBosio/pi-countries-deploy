import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNameCountries } from "../actions";
import Buscar from "./../img/lupa.png";
import s from "./SearchBar.module.css";



export default function SearchBar({paginado}) {
  const countries = useSelector((state) => state.allCountries); //me traigo los paises(estado)
  const dispatch = useDispatch();
  //declaramos un estado local
  const [name, setName] = useState("");
  // const error = useSelector((state) => state.error);

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value); //seteo el name en el valor del input(con e.target.value)
    console.log(name); //consologueamos el estado para ver como se va modificando
  }

    function handleSubmit(e) {
        e.preventDefault();
        if(name){
          paginado(1);
          dispatch(getNameCountries(name));  //el name va a ser mi estado local
          setName(""); //reseteo el estado local, para que el buscar quede en blanco 
        } else {
          alert("Debe ingresar un nombre de país");
     }
    }

// console.log(error)

  return (
    <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
      <input
        style={{width: "50%", height: "20px", borderRadius: "5px", border: "1px solid black", backgroundColor: "#e2e2e2", fontSize: "18px", padding: "5px"} }     
        type="text"
        placeholder="Buscar país..."
        value={name}
        size="10"
        onChange={(e) => handleInputChange(e)}
        list="suggestions"
      />
      <datalist id="suggestions">
        {countries.map((country, i) => (
          <option key={i} value={country.name} />
        ))}
        
      </datalist>
         {/* <p>{error.response.data}</p> */}
      <button className={s.busc} type="submit" onClick={(e)=> handleSubmit(e) }> 
      <img
          id="buscar"
          src={Buscar}
          
          width="25"
          height="25"
          backgroundColor="red"
          // margin-button= "50px"
          // margin-right= "15px"  
          alt="img"
          // font-size="50px"
          
        /></button>
    </div>
  );
}
