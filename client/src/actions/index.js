import axios from "axios";

const {REACT_APP_BACKEND_URL="localhost:3001"} = process.env; 
//getCountries--------------------------------------------------------
//*Async-await

export function getCountries() {
  return async function (dispatch) {
    
    var json = await axios.get(REACT_APP_BACKEND_URL + "/countries", {
    });
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
      
      // return await axios.get(REACT_APP_BACKEND_URL + "/countries")
      // .then((res) => {
      //   dispatch({ type: "GET_COUNTRIES", payload: res.data });
      // })
      // .catch((error) => {
      //   console.log(error);
      // });
  };
}
// ↑ ruta de GET a countries

//*Promises
// export function getCountries() {
//   return function (dispatch) {
//     return axios.get(REACT_APP_BACKEND_URL + "/countries")
//       .then((res) => {
//         dispatch({ type: "GET_COUNTRIES", payload: res.data });
//       }).catch((error) => {
//         console.log(error);
//       }
//       );
//   };
// }



//getNameCountries--------------------------------------------------------
//*Async-await

export function getNameCountries(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        REACT_APP_BACKEND_URL + "/countries?name=" + name
      );
      //pegale esta ruta, que es la ruta por query, y después del = quiero que le pases lo que me llega por payload(lo que el usuario escriba en la barra de búsqueda)
      //ejecuta esa ruta llamando lo que está después del =
      return dispatch({
        type: "GET_NAME_COUNTRIES",
        payload: json.data, //me devuelve la acción, lo que devuelve la ruta
      });
    } catch (error) {
      //en los otros no puse el error, pero como acá puede pasar lo agregué
      return dispatch({
        type: "ERROR_GET_NAME_COUNTRIES",
        payload: error,  //puedo ponerle info o json
      });
      // console.log(error);
    }
  };
}

//*Promises.
// export function getNameCountries(name) {
//   return function (dispatch) {
//     return axios.get(REACT_APP_BACKEND_URL + "/countries?name=" + name)
//       .then((res) => {
//         dispatch({ type: "GET_NAME_COUNTRIES", payload: res.data });
//       }).catch((error) => {
//         return dispatch({
//           type: "ERROR_GET_NAME_COUNTRIES",
//           payload: error,
//         });
//         // console.log(error);
//       }
//       );
//   };
// }





//getActivities--------------------------------------------------------
//*Async-await
//me trae las actividades para después poder crearlas
export function getActivities() {
  return async function (dispatch) {
    var info = await axios.get(REACT_APP_BACKEND_URL + "/activity", {});
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: info.data,  //puedo ponerle info o json
    });
  };
}

//*Promises
// export function getActivities() {
//   return function (dispatch) {
//     return axios.get(REACT_APP_BACKEND_URL + "/activity")
//       .then((res) => {
//         dispatch({ type: "GET_ACTIVITIES", payload: res.data });
//       }).catch((error) => {
//         console.log(error);
//       }
//       );
//   };
// }

//*Fetch

// export function getActivities(){
//   return function (dispatch){
//     return fetch(REACT_APP_BACKEND_URL + "/activity")
//     .then(res => res.json())
//     .then(data => {
//       dispatch({
//         type: "GET_ACTIVITIES",
//         payload: data,
//       });
//     }
//     );

//   }
// }



//postActivities--------------------------------------------------------
//*Async-await

//accion para crear una actividad - dispara una ruta de POST
export function postActivities(payload){  //payload es el objeto que me llega por el formulario del front
  console.log("action: " + payload);
  return async function (dispatch){
    const response = await axios.post(REACT_APP_BACKEND_URL + "/activity", payload); //en esta ruta hacemos el post del payload
    console.log(response);
    return response;
  }
}

//*Promises
// export function postActivities(payload) {
//   return function (dispatch) {
//     return axios.post(REACT_APP_BACKEND_URL + "/activity", payload)
//       .then((res) => {
//         dispatch({ type: "POST_ACTIVITIES", payload: res.data });
//       }).catch((error) => {
//         console.log(error);
//       }
//       );
//   };
// }

//filtrar por continente--------------------------------------------------------

export function filterCountriesByContinents(payload) {
  //payload=value del imput (europe, asia, .....)
  return {
    type: "FILTER_BY_CONTINENTS",
    payload,
  };
  // ↑la logica la armamos en reducer
}

//filtrar por actividad creada--------------------------------------------------------
export function filterCountriesByActivities(payload) {  //payload es el value de la opcion que se elija
  return {
    type: "FILTER_BY_ACTIVITIES",
    payload,
  };
}


//ordenar alfabeticamente--------------------------------------------------------
export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

//ordenar por poblacion--------------------------------------------------------
export function orderByPopulation(payload) {
  return {
    type: "ORDER_BY_POPULATION",
    payload,
  };
}


//DETALLE DE PAÍS
//*Async-await
export function getDetail(id){
  return async function (dispatch){
    try{
      var json = await axios.get(REACT_APP_BACKEND_URL + "/countries/"+id);
      console.log(json)
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data,

      });
    } catch (error) {
      console.log(error);
    }
  }
}

//*Promises
// export function getDetail(id) {
//   return function (dispatch) {
//     return axios.get(REACT_APP_BACKEND_URL + "/countries/"+id)
//       .then((res) => {
//         dispatch({ type: "GET_DETAILS", payload: res.data });
//       }).catch((error) => {
//         console.log(error);
//       }
//       );
//   };
// }





//clear Error--------------------------------------------------------
export function clearError() {
  return { type: "CLEAR_ERROR" }
}

//intentar hacer con promesas
