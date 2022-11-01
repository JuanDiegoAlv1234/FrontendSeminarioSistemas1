import Swal from "sweetalert2";
import { useState, createContext, useCallback } from "react";
import { peticion ,ObtenerToken} from "../helpers/fetch";
import axios from "axios";
export const AuthContext = createContext();

const initialState = {
  uid: null,
  checking: true,
  logged: false,
  username: null,
  email: null,
  nombre:"",
  foto: null,
  modobot:0,

};

function AuthProvider({ children }) {
  const [log, setlog] = useState(false);
  const [auth, setauth] = useState(initialState);

  const submitLogin = async (USER, Password) => {
    var data = {
      username: USER,
      password: Password,
    };

    console.log(data);

    const resp = await peticion("/api/auth/login", data, "POST");

    console.log(resp);

    if (resp.user.username !== " ") {
      setauth({
        checking: false,
        logged: true,

        username: resp.user.username,
        email: resp.user.email,
        foto: resp.user.foto,
        modobot:0,
        nombre:resp.user.nombre,   
        id: resp.user.id,
      });
      localStorage.setItem("token",resp.token)
  

      Swal.fire("Credenciales correctas", "Mensaje:", "info");
    } else {
      Swal.fire("Credenciales Incorrectas", "Mensaje:", "error");
    }
  };

  const verificarToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    const prueba = ""; //await FetchSesion('Sesion','GET')

    if (token === null) {
      return setauth({
        uid: null,
        checking: true,
        logged: false,
        Nombre: null,
        Telefono: null,
        Edad: null,
      });
    } else {
        const resp = await ObtenerToken('/api/users/current' ,"","GET")
        setauth({
            checking: false,
            logged: true,
    
            username: resp.username,
            email: resp.email,
            foto: resp.foto,
            modobot:0,
            nombre:resp.nombre,   
            id: resp.id,
          });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        submitLogin,
        auth,
        verificarToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
