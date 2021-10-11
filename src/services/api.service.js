import Vue from "vue";
import axios from "axios";
import VueAxios from 'vue-axios' 
import { ConfigApp } from "../main";

Vue.use(VueAxios,axios);

/*
   axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

  //const myResponseInterceptor = 

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {

      //Controle para evitar loop infinito caso continue 401
      const originalConfig = error.config;
      if (error.response) {
        if (error.response.status === 401 && !originalConfig._retry) {

          originalConfig._retry = true;
          // Do something, call refreshToken() request for example;
          // return a request
          //return axios_instance(config);

        }
  
        if (error.response.status === ANOTHER_STATUS_CODE) {
          // Do something 
          return Promise.reject(error.response.data);
        }
      }
  
      return Promise.reject(error);
    }
  );
*/

//And then, remove the interceptor:
//axios.interceptors.request.eject(myInterceptor);

class APIService {

  //#region Específicos - caso sejam criados métodos customizados na API...
  async getMenu() {
    //Todo incluir usuario logado e adaptar API!
    let user = JSON.parse(localStorage.getItem("user"));

    //alert(user.addicionalProperties[0].perfil)

    return await axios.get(ConfigApp.API_URL + "api/GetMenu/" + user.username);
  }
  //#endregion

  //#region APi genericos
  async getApiContentById(entidade, id) {
    let uri = ConfigApp.API_URL + "api/" + entidade + "/" + id;

    return await axios.get(uri, { headers: this.authHeader() });
  }
  async getApiContent(entidade, pagina, orderby, parametrosQry, linhasPagina) {
    let uri =
      ConfigApp.API_URL +
      "api/" +
      entidade +
      "?numeroRegistros=" +
      (linhasPagina < 0 ? 0 : ConfigApp.LINHASPAGINA) +
      "&inicio=" +
      pagina * ConfigApp.LINHASPAGINA;
    if (orderby) uri = uri + "&orderBy=" + orderby;
    if (parametrosQry) uri = uri + "&parametrosQry=" + parametrosQry;

    return await axios.get(uri, { headers: this.authHeader() });
  }

  async getApiContentSearch(
    entidade,
    pagina,
    orderby,
    fields,
    where,
    linhasPagina
  ) {
    var data = JSON.stringify({
      fields: fields,
      where: where,
      orderby: orderby,
    });

    var uri =
      ConfigApp.API_URL +
      "api/" +
      entidade +
      "/search" +
      "?numeroRegistros=" +
      (linhasPagina < 0 ? 0 : ConfigApp.LINHASPAGINA) +
      "&inicio=" +
      pagina * ConfigApp.LINHASPAGINA;

    var headers = this.authHeaderExcel();

    try {
      return await axios({
        method: "POST",
        url: uri,
        data: data,
        headers: headers,
        //responseType: "blob",
      });
    } catch (e) {
      alert(e.message);
    }
  }
  // Endpoint genérico
  async getApiEndpoint(endpoint) {
    let uri = ConfigApp.API_URL + "ApiMNET/api/" + endpoint;

    return await axios.get(uri, { headers: this.authHeader() });
  }
  async postApiContent(entidade, item) {
    const response = await axios.post(
      ConfigApp.API_URL + "api/" + entidade,
      item,
      {
        headers: this.authHeader(),
      }
    );
    //if (response.data) {
    //  alert(JSON.stringify(response.data));
    // }
    return response.data;
  }
  async putApiContent(entidade, item) {
    const response = await axios.put(
      ConfigApp.API_URL + "api/" + entidade,
      item,
      {
        headers: this.authHeader(),
      }
    );

    return response.data;
  }
  async deleteApiContent(entidade, id) {
    const response = await axios.delete(
      ConfigApp.API_URL + "api/" + entidade + "/" + id,
      { headers: this.authHeader() }
    );

    return response.data;
  }
  async deleteApiContentComposite(entidade, array) {
    let parametros = "";

    array.forEach((item) => {
      parametros += "/" + item;
    });

    const response = await axios.delete(
      ConfigApp.API_URL + "api/" + entidade + parametros,
      { headers: this.authHeader() }
    );

    return response.data;
  }
  async getApiContentComposite(entidade, array) {
    let parametros = "";

    array.forEach((item) => {
      parametros += "/" + item;
    });

    let uri = ConfigApp.API_URL + "api/" + entidade + parametros;

    return await axios.get(uri, { headers: this.authHeader() });
  }
  //29.09.2021
  async getApiContentByQuery(query, orderby) {
    try {
      let uri = ConfigApp.API_URL + "api/querysql";

      var sqlParams = { query, orderby };

      return await axios.post(uri, sqlParams, { headers: this.authHeader() });
    } catch (e) {
      console.log(e.message);
    }
  }
  getApiContentByQuerySync(query, orderby) {
    try {
      let uri = ConfigApp.API_URL + "api/querysql";

      var sqlParams = { query, orderby };

      return axios.post(uri, sqlParams, { headers: this.authHeader() });
    } catch (e) {
      console.log(e.message);
    }
  }
  //#endregion
  
  //#region Excel
  async getApiExcel(entidade, fields, where, orderby) {
    var data = JSON.stringify({
      fields: fields,
      where: where,
      orderby: orderby,
    });

    var uri = ConfigApp.API_URL + "api/" + entidade + "/excel";

    var headers = this.authHeaderExcel();

    try {
      return await axios({
        method: "POST",
        url: uri,
        data: data,
        headers: headers,
        responseType: "blob",
      });
    } catch (e) {
      alert(e.message);
    }
  }
  //#endregion

  //#region Login/Authenticate
  async login(user) {
    console.log("login api.service");
    const response = await axios.post(
      ConfigApp.API_URL + "ApiMNET/authenticate",
      {
        usuario: user.username,
        senha: user.password,
      }
    );

    //alert(JSON.stringify(response.data.addicionalProperties[0].perfil))
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
  async authenticate(user) {
    const response = await axios.post(
      ConfigApp.API_URL + "ApiMNET/authenticate",
      {
        usuario: user.username,
        senha: user.password,
      }
    );
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
  logout() {
    console.log("logout api.service");
    localStorage.removeItem("user");
  }
  //#endregion

  //#region authHeader/authHeaderExcel
  authHeader() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }
  authHeaderExcel() {
    let user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token) {
      return {
        //accept: "application/json",
        //accept: "*/*",
        "Content-Type": "application/json-patch+json",
        Authorization: "Bearer " + user.token,
      };
    } else {
      return {};
    }
  }
  //#endregion
}

const apiservice = new APIService();

export default apiservice;
