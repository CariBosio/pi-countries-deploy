import React from "react";
//usé Hooks para el componente
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  filterCountriesByContinents,
  getActivities,
  filterCountriesByActivities,
  orderByName,
  orderByPopulation,
} from "../actions";
// import { Link } from "react-router-dom";
import Card from "../components/Card";
import Paginado from "./Paginated";
import SearchBar from "./SearchBar";
import s from "./HomeStyle.module.css";
import Recargar from "./../img/actualizar.png";
// import Not from "./../img/ubicacion.gif";
import Loading from "./../img/7TwJ.gif";
import ErrorComponent from "./ErrorComponent";

export default function Home() {
  const dispatch = useDispatch(); //para usar esa constante e ir despachando mis acciones
  const allCountries = useSelector((state) => state.countries); //lo mismo que hacer el mapStateToProps //me trae del reducer el estado countries, que tiene todos los paises
  const [orden, setOrden] = useState(""); //estado local vacío para ordenar por nombre
  const [ordenPopulation, setOrdenPopulation] = useState(""); //estado local vacío para ordenar por población
  const activities = useSelector((state) => state.activities); //lo mismo que hacer el mapStateToProps //me trae del reducer el estado activities, que tiene todas las actividades
  const error = useSelector((state) => state.error);

  //!Paginado
  //definir varios estados locales
  const [currentPage, setCurrentPage] = useState(1); //un estado con la página actual y un estado que me setee la pagina actual - empieza en 1 porque siempre voy a arrancar en la primer página
  //const [countriesPerPage, setCountriesPerPage] = useState(10); //cuantos paises por página y va a setear los paises por página
  //const indexOfLastCountries = currentPage * countriesPerPage; //indice del último pais que tengo en la página = página en la que estoy por la cantidad de personajes por página  10
  //const indexOfFirstCountries = indexOfLastCountries - countriesPerPage; //indice del primer pais =  indice del ultimo pais - ciudades por página  0
  //   const currentCountries = allCountries.slice(
  //     indexOfFirstCountries,
  //     indexOfLastCountries
  //   ); //slice (corta)
  //   //↑ guarda los personajes que va a renderizar dependiendo de la página

  let currentCountries;
  if (currentPage === 1) {
    currentCountries = allCountries?.slice(0, 9);
  } else {
    currentCountries = allCountries?.slice(
      9 + (currentPage - 2) * 10,
      19 + (currentPage - 2) * 10
    );
  }

  const paginado = (
    pageNumber //me ayuda al renderizado
  ) => setCurrentPage(pageNumber); // seteo la página en ese numero de página

  //con el useSelector traeme a esa constante todo lo que está en el estado de countries

  // const [search, setSearch] = useState("");
  // const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    dispatch(getCountries()); //dispatch es lo mismo que hacer el mapDispatchToProps
    // dispatch(filterCountriesByActivities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault(); //para que no se rompa
    dispatch(getCountries()); //despacho el getCountries, que lo resetea
  }

  function handleFilterContinents(e) {
    e.preventDefault(); //para que no se rompa
    setCurrentPage(1); //resetear la página a 1
    dispatch(filterCountriesByContinents(e.target.value)); //se va a ejecutar y va a tomar como payload (accion), el valor de cada una de las opciones dependiendo de a cual le hace click el usuario
  }

  function handlefilterCountriesByActivities(e) {
    e.preventDefault();
    setCurrentPage(1); //resetear la página a 1
    dispatch(filterCountriesByActivities(e.target.value)); //se va a ejecutar y va a tomar como payload (accion), el valor de cada una de las opciones del select dependiendo de a cual le hace click el usuario
  }

  function handleNameSort(e) {
    e.preventDefault(); //para que no se rompa
    dispatch(orderByName(e.target.value)); //despacho la accion orderByName, que lo resetea
    setCurrentPage(1); // reseteo la página a la primera
    setOrden(`Ordenado ${e.target.value}`); //modifique el estado local y se renderice
    // ↑ sino no funciona
  }

  function handlePopularSort(e) {
    e.preventDefault(); //para que no se rompa
    dispatch(orderByPopulation(e.target.value)); //despacho la accion orderByPopulation, que lo resetea
    setCurrentPage(1); // reseteo la página a la primera
    setOrdenPopulation(`Ordenado ${e.target.value}`); //modifique el estado local y se renderice
  }

  // function handleSubmitError(e) {
  //   e.preventDefault();
  //   dispatch(getCountries());
  //   dispatch(clearError());
  // }

  //Renderizar el componente

  return (
    <div className={s.bodyHome}>
      <button
        className={s.reset}
        onClick={(e) => {
          handleClick(e);
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Kalam, cursive",
          }}
        >
          <img
            id="recargar"
            src={Recargar}
            width="30"
            height="30"
            className={s.recargar}
            alt="img"
            font-size="50px"
          />
          {/* cuando pasa esto me resetea las countries */}
          PAÍSES
        </div>
      </button>
      <div className={s.requerimientos}>
        <div className={s.row}>
          <div className={s.filter}>
            <p className={s.titulos}>FILTROS</p>
            <select onChange={(e) => handleFilterContinents(e)}>
              {/* Botones/Opciones para filtrar por continente */}
              <option value="" disable selected hidden>
                {""} Continente
              </option>
              <option value="All">Todos</option>
              <option value="Africa">África</option>
              <option value="North America">América del Norte</option>
              <option value="South America">América del Sur</option>
              <option value="Antarctica">Antártida</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europa</option>
              <option value="Oceania">Oceanía</option>
            </select>

            <select onChange={(e) => handlefilterCountriesByActivities(e)}>
              {/* Botones/Opciones para filtrar por tipo de actividad
          turística */}
              <option value="" disable selected hidden>
                {""}Actividades turísticas
              </option>
              <option value="All">Todas</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.name}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>

          <div className={s.order}>
            <p className={s.titulos}>ORDENAMIENTOS</p>
            <select onChange={(e) => handleNameSort(e)}>
              <option value="" disable selected hidden>
                {""}Nombre
              </option>
              {/* <option value="All">Todos</option> */}
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>

            <select onChange={(e) => handlePopularSort(e)}>
              <option value="" disable selected hidden>
                {""}Población
              </option>
              <option value="All">Todos</option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
        </div>
      </div>
      <div className={s.contsearch}>
        <div className={s.search}>
          <SearchBar paginado={paginado} />
        </div>
      </div>
      <div>
        <Paginado
          countriesPerPage={10}
          allCountries={allCountries.length}
          paginado={paginado}
          currentPage={currentPage}
        />
      </div>
      {error ? (
        <ErrorComponent />
      ) : allCountries.length === 0 ? (
        <img src={Loading} alt="loading" height="300px" width="300px" />
      ) : (
        <div className={s.cards}>
          {currentCountries?.map((c) => (
            <Card
              flags={c.flags}
              name={c.name}
              continents={c.continents}
              population={`${c.population} hab.`}
              key={c.id}
              id={c.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

//! Ruta principal: debe contener

// [ ] Input de búsqueda para encontrar países por nombre
// [ ] Área donde se verá el listado de países. Al iniciar deberá cargar los primeros resultados obtenidos desde la ruta GET /countries y deberá mostrar su:
// Imagen de la bandera
// Nombre
// Continente
// [ ] Botones/Opciones para filtrar por continente y por tipo de actividad turística
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los países por orden alfabético y por cantidad de población
// [ ] Paginado para ir buscando y mostrando los siguientes paises, 10 paises por pagina, mostrando los primeros 9 en la primer pagina.
