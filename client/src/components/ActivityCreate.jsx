import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postActivities, getCountries } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import s from "./ActivityCreateStyle.module.css";

//!Validación

function validate(input) {
  let errors = {};
  if (!input.name) {
    //input es mi estado local, si en mi estado lical no existe un name
    errors.name = "Nombre de la actividad requerido"; //en mi objeto errors voy a pner un string que diga "nombre requerido"
  } else if (!input.difficulty) {
    errors.difficulty = "Nivel de dificultad requerido";
  } else if (input.difficulty < 1 || input.difficulty > 5) {
    errors.difficulty = "Nivel de dificultad no valido (1-5)";
  } else if (!input.duration) {
    errors.duration = "Duración de la actividad requerida";
  } else if (input.duration > 24) {
    errors.duration = "Duración no valida (0hs-24hs)";
  } else if (input.season.length === 0) {
    errors.season = "Temporada de la actividad requerida";
  } else if (input.countries.length < 1) {
    errors.countries = "País/paises requeridos";
  }
  return errors;
}

export default function ActCreate() {
  const dispatch = useDispatch();
  //↓metodo del Router que lo que hace es redirigirme a la ruta que yo le diga
  const history = useHistory();
  const countries = useSelector((state) => state.countries); //me traigo los paises(estado)

  const [errors, setErrors] = useState({
    enablebutton: true,
  }); //estado local vacío para mostrar errores

  //para guardar el formulario en el estado local
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: [],
    countries: [], //lo seteo en un array para tener la posibilidad de poner más de una
    id: [],
  });

  const thereAreErrors = Object.values(errors).some((error) => error);

  // setear todo lo que el usuario cargue en el formulario
  //cada vez que se ejecute esta función, a mi estado input, además de lo que tiene, agregale el value de lo que esté modificando el usuario( en la prop.name de cada input) y me llene el estado local
  function handleChange(e) {
    const newInput = {
      ...input,
      [e.target.name]: e.target.value,
    }; //creo un nuevo objeto con los valores de input
    setInput(newInput);

    setErrors(validate(newInput));
  }

  function handleCheck(e) {
    let checked = input.season.some((season) => season === e.target.value);
    const newInput = {
      ...input,
      season: checked
        ? input.season.filter((season) => season !== e.target.value)
        : [...input.season, e.target.value],
    };
    setInput(newInput);
    setErrors(validate(newInput));
  }

  //me guardo en un arreglo todo lo que guarde en el select (array de countries)
  function handleSelectCountries(e) {
    const selectCountry = JSON.parse(e.target.value);
    const val = input.countries.some(
      (country) => country.name === selectCountry.name
    );
    if (!val) {
      const newInput = {
        ...input,
        countries: [...input.countries, selectCountry],
        id: [...input.id, selectCountry.name],
      };
      setInput(newInput);
      setErrors(validate(newInput));
    }
    e.target.value = "";
  }
  console.log(input.id);

  function handleSubmit(e) {
    e.preventDefault();
    if (thereAreErrors) {
      return;
    }
       dispatch(postActivities(input));
    alert("Actividad creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: [],
      countries: [],
    });
    //ya se creó la actividad llevame a ver si está creado - vuelve solo a home
    history.push("/home");
  }

  function handleDelete(d) {
    const newInput = {
      ...input,
      countries: input.countries.filter((country) => country !== d), //filtro por todo lo que no sea esae elemento
    };
    setInput(newInput);
    setErrors(validate(newInput));
  }

  useEffect(() => {
    dispatch(getCountries()); //para que me despache las activities, para después poder renderizarlas
  }, [dispatch]);

  return (
    <div className={s.bodyActivityCreate}>
      {/* <div>
        <NavBar />
      </div> */}
      {/* //hago esto por si me arrepiento y quiero volver a home */}
      {/* <Link to="/home">
        <button className={s.btnVolAct}>Volver</button>
      </Link> */}
      {/* todo lo que se envuelva en un link va a funcionar como redirección */}
      {/* <div className="container"> */}
      <div className={s.drop1}></div>
      <div className={s.drop2}></div>
      <div className={s.drop5}></div>

      <div className={s.cardForm}>
        <h1>Crear actividad turística</h1>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.inputgroup}>
            <label className={s.alllabel}>Nombre:</label>
            <br></br>
            <input
              type="text"
              name="name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              placeholder="--Nombre de la actividad--"
              className={s.input1}
              required
            />

            {errors.name && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
              <p>{errors.name}</p>
            )}
          </div>
          <br></br>
          <div>
            <label className={s.alllabel}>Dificultad (1-5):</label>
            <br></br>
            <div className={s.divradio}>
              <input
                type="range"
                id="get"
                name="difficulty"
                value={input.difficulty}
                min="1"
                max="5"
                step="1"
                onChange={(e) => handleChange(e)}
                className={s.input2}
                required
                // value="1"
                list="difficulty"
              />
              <p>{input.difficulty}</p>
              <datalist id="difficulty">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
              </datalist>
              {/* <input type="text" id="put" /> */}
            </div>

            {errors.difficulty && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
              <p>{errors.difficulty}</p>
            )}
          </div>
          <br></br>
          <div>
            <label className={s.alllabel}>Duración:</label>
            <br></br>
            <input
              type="time"
              name="duration"
              value={input.duration}
              onChange={(e) => handleChange(e)}
              placeholder="--Duración en horas--"
              className={s.input1}
              required
            />
            {errors.duration && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
              <p>{errors.duration}</p>
            )}
          </div>
          <br></br>
          <div>
            <label className={s.alllabel}>Temporada / s:</label>
            <fieldset className={s.divradio}>
              {/* <legend>Temporada:</legend> */}
              {/* <label>Temporada:</label> */}
              <label>
                <input
                  type="checkbox"
                  name="seasonv"
                  value="Verano"
                  onChange={(e) => handleCheck(e)}
                  // required
                />
                Verano
              </label>
              <label>
                <input
                  type="checkbox"
                  name="seasono"
                  value="Otoño"
                  onChange={(e) => handleCheck(e)}
                  // required
                />
                Otoño
              </label>
              <label>
                <input
                  type="checkbox"
                  name="seasoni"
                  value="Invierno"
                  onChange={(e) => handleCheck(e)}
                  // required
                />
                Invierno
              </label>
              <label>
                <input
                  type="checkbox"
                  name="seasonp"
                  value="Primavera"
                  onChange={(e) => handleCheck(e)}
                  // required
                />
                Primavera
              </label>

              {/* <select onChange={(e) => handleChangeSeason(e)} required> */}
              {/* <option value="" disable selected hidden> Seleccionar una o más temporadas</option>  */}
              {/* hidden -> oculta la opción */}
              {/* {season.map((s) => (
                <option value={s} name="season">{s}</option>
              ))} */}

              {/* </select> */}
              {/* <ul>
            {input.season.map((s) => (
                <li>{s}</li>
              ))} */}
              {/* ↑lista que va a tomar mi estado input.countries, y me va a renderizar cada cada cosa que vaya marcando en el select/ para ver lo que voy seleccionando */}
              {/* </ul> */}
            </fieldset>
            {errors.season && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
              <p>{errors.season}</p>
            )}
          </div>
          <br></br>

          <div>
            <label className={s.alllabel}>Paises:</label>
            <br></br>
            <select
              className={s.divpaises}
              onChange={(e) => handleSelectCountries(e)}
              // required
            >
              <option value={""} disable selected hidden>
                {" "}
                --Seleccionar uno o más países--
              </option>
              {countries.map((country) => (
                <option value={JSON.stringify(country)}>{country.name}</option>
              ))}
            </select>

            <ul className={s.ulchips}>
              {input.countries.map((c) => (
                <div className={s.chip_content}>
                  <img
                    src={c.flags}
                    alt="flag"
                    height="25px"
                    width="25px"
                    className={s.chipimg}
                  />

                  <p className={s.pchip}>{c.name}</p>
                  <div className={s.delete}>
                    <span onClick={() => handleDelete(c)}>x</span>
                  </div>
                </div>
              ))}
              {/* ↑lista que va a tomar mi estado input.countries, y me va a renderizar cada cada cosa que vaya marcando en el select/ para ver lo que voy seleccionando */}
            </ul>
            {errors.countries && ( //si existe un error en el nombre, entonces renderizame un p que diga el error
              <p>{errors.countries}</p>
            )}
          </div>

          <div>
            <button className={s.crear} type="submit" disabled={thereAreErrors}>
              {" "}
              Crear
            </button>
          </div>
        </form>
      </div>
      <div className={s.drop3}></div>
      <div class={s.drop4}></div>
      <div class={s.drop6}></div>

      {/* </div> */}
    </div>
  );
}
