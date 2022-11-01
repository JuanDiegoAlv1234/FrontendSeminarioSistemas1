import axios from "axios";
export const peticion = async (endpoint, data, method = "GET") => {
  console.log("data:", data);

  
  const ruta = "http://localhost:5000" + endpoint;
  console.log("UEL", ruta);

  if (method === "GET") {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "Content-type": "application/json",
      },
    });

    return await resp.json();
  } else {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};
export const peticionToken = async (endpoint, data, method = "GET") => {
  console.log("data:", data);
  const token = localStorage.getItem("token");
  console.log("UEL", endpoint);
  const ruta = "http://localhost:5000" + endpoint;
  const url = endpoint;

  if (method === "GET") {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token
      },
    });

    return await resp.json();
  } else {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "Content-type": "application/json",
        "x-token": token,
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};
export const EnviarSolicitud = async (idAmigo) => {
  const formData = new FormData();

  formData.append("idAmigo", idAmigo);

  const token = localStorage.getItem("token");
await axios.post('http://localhost:5000/api/friends/postSolicitud',formData,  {
  headers: {
    "Content-Type": "multipart/form-data",
    "x-token": token,
  }})
    .then(response => {
        console.log("efe?")
        console.log(response)
    });
  }
export const ObtenerToken = async (endpoint, data, method = "GET") => {
  console.log("data:", data);

  console.log("UEL", endpoint);
  const ruta = "http://localhost:5000" + endpoint;
  const token = localStorage.getItem("token");
  const url = endpoint;

  if (method === "GET") {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "x-token": token,
      },
    });

    return await resp.json();
  } else {
    const resp = await fetch(ruta, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await resp.json();
  }
};
export const login = async (endpoint, data, method = "GET") => {
  console.log(data);

  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/auth/";

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("respuesta", resp);

    return await resp.json();
  }
};
export const GetFILES = async (id, tipo, method = "GET") => {
  console.log("id", id + " " + "tipo", tipo);

  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/file/" +
    tipo +
    "/" +
    id;
  console.log();

  const resp = await fetch(url);
  console.log(resp);

  return await resp.json();
};

export const GetUSERS = async (id, method = "GET") => {
  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/users/all/" +
    id;
  console.log();

  const resp = await fetch(url);
  console.log(resp);

  return await resp.json();
};

export const GetArchivosAmigo = async (id, method = "GET") => {
  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/file/amigos/" +
    id;
  console.log();

  const resp = await fetch(url);
  console.log(resp);

  return await resp.json();
};

export const EliminarArchivo = async (endpoint, data, method = "GET") => {
  console.log(data);

  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/file/";

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("respuesta", resp);

    return await resp;
  }
};
export const subir = async (endpoint, data, method = "GET") => {
  console.log(data);

  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/file/";

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("respuesta", resp);

    return await resp.json();
  }
};

export const AñadirAmigo = async (endpoint, data, method = "GET") => {
  console.log(data);

  const url =
    "http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api/users/add/";

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("respuesta", resp);

    return await resp.json();
  }
};
