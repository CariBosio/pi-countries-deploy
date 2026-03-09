//!Acá es donde va toda la lógica

const initalState = {
  countries: [],
  allCountries: [], //hacé una copia de Countries, que siempre tenga todos los paises - no es una accion, solo un estado que siempre tenga todos los países
  allCountries3: [],
  allActivities: [],
  activities: [],
  detail:undefined,
  error:undefined,
};

function rootReducer(state = initalState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":  //cuando se dispara esta acción me llena los dos estados
    console.log("GET_COUNTRIES");
      return {
        ...state,
        countries: action.payload, //en mi estado countries, que en un principio es un array vacío, manda todo lo que te mande la acción getCountries
        allCountries: action.payload, //para que si elijo una opción y después elijo otra no me quede en blanco
      };

    case "GET_NAME_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload, 
      };


    case "FILTER_BY_CONTINENTS":
      const allCountries = state.allCountries;
      const continentsFiltered =
        action.payload === "All"  //si payload
          ? allCountries    // devolvemos todos los paises
          : allCountries.filter((el) => el.continents === action.payload); // y sino filtramelos por lo que te llega por payload
      return {
        ...state,
        // ...continentsFiltered,
        countries: continentsFiltered,  //a countries le devuelvo esta constante
        //si vuelvoa hacer otro filtro vuelve a agarrar allCountries(que tiene todos los paises), pero al que va a modificar es el estado countries
      }
     
      //no hace nada, pero necesitamos que esté en el reducer para que funcione
      case "POST_ACTIVITIES":
      return {
        ...state,  //el estado me lo deja como está, me crea una ruta nueva
      };

    case "FILTER_BY_ACTIVITIES":
      const allActivities = state.allCountries
      const activitiesFiltered = allActivities.filter((c) => { return c.activities.find((c) => { return c.name === action.payload; }); });

      if (action.payload === 'All') {
          return { ...state, countries: allActivities }
      } else {
          return {
              ...state,
              countries: activitiesFiltered
          }
      }    



    case "ORDER_BY_NAME":
      let sortedArray =
        action.payload === "asc"
          ? state.countries.sort((a, b) => a.name.localeCompare(b.name)) 
            : state.countries.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        countries: sortedArray,
      };
            
          

    case "ORDER_BY_POPULATION": {
      let sortedPopuArray =
        action.payload === "asc"
          ? state.countries.sort( (a, b) => {
              //sort compara dos valores (name
              return a.population - b.population;
            })
          : state.countries.sort((a, b) => {

              return b.population - a.population;
            });
         
      return {
        ...state,
        countries: sortedPopuArray,
      };
    }

    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,  //detail = nuevo estado creado arriba en un array vacío
      };

      case "ERROR_GET_NAME_COUNTRIES":
      return {
        ...state,
        error: action.payload,
        countries:[],
      }

      case "CLEAR_ERROR":
        console.log("clear error");
                return {
                    ...state,
                    error:undefined
                }



    default:
      return state;
  }
}

export default rootReducer;
