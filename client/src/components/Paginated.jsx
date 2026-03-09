import React from "react";
import s from "./PaginadoStyle.module.css";

//!Lógica del paginado

export default function Paginado({
  countriesPerPage,
  allCountries,
  paginado,
  currentPage,
}) {
  //destructuring, se los paso como propiedades
  const pageNumbers = []; //se va a llenar con un arreglo de números

  for (let i = 1; i <= Math.ceil((allCountries+1) / countriesPerPage); i++) {
    //salen 26 pág. - me rendondea para arriba la cantidad de todos los personajes sobre la cantidad de personajes por página
    pageNumbers.push(i); 
  }
  //!Este componente renderiza los numeritos en sí
  return (
    <nav>
      <ul>
 {currentPage > 1 ? (
          <button
          onClick={() => (currentPage > 1 ? paginado(currentPage - 1) : null)}
          >
            {"<<"}
          </button>
        ) : 
        null
        }
        {pageNumbers &&
          pageNumbers.map((number) => (
            <span key={number}>
              <button
                className={`${s.buttonpage} ${
                  number === currentPage ? s.buttonactive : s.buttoninactive
                }`}
                onClick={() => paginado(number)}
              >
                {number}
              </button>
            </span>
          ))}
        {currentPage < pageNumbers.length ? (
          <button
            onClick={() =>
              currentPage < pageNumbers.length
                ? paginado(currentPage + 1)
                : currentPage === pageNumbers.length
            }
          >
            {">>"}
          </button>
        ) : 
        null
        }
          </ul>
    </nav>
  );
}
