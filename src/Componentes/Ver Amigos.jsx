import { useContext, useEffect, useState } from "react";

import {
  Radio,
  Grid,
  Button,
  Text,
  Avatar,
  Input,
  Row,
  useModal,
  Spacer,
  Modal,
} from "@nextui-org/react";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../Context/AuthContext";
import {  peticion,peticionToken,EnviarSolicitud} from "../helpers/fetch";

export const VerAmigos = () => {
  const { verificarToken, auth } = useContext(AuthContext);
  const [tipo, setTipo] = useState();
  const [amigos, setamigos] = useState([]);
  const [nombreA, setnombre] = useState("");
  const [cargandoamigos, setcargandoamigos] = useState([]);
  
  const handletipo1 = (e) => {
    setTipo("privado");
  };
  const handletipo2 = (e) => {
    setTipo("publico");
  };

  const cambiar_nombre = (nombre) => {
    setVisible(true);
    setnombre(nombre);
  };
  const { setVisible, bindings } = useModal();
  const { values, handleInputChange } = useForm({
    ruta: "",
    files: "",
    Username: "",
    Correo: "",
    Contraseña: "",
    ConfirmarContraseña: "",
    User: "",
    Pass: "",
    nuevo_nombre: "",
  });

  const AgregarFriend = async (idFriend) => {

   
    const resp = await EnviarSolicitud(idFriend);
    console.log(resp)


  };

  const Getamigos = async () => {
  

    const resp = await peticionToken('/api/friends/',"", "GET");

    console.log("respuesta", resp);
    setamigos(resp.amigos);
    setcargandoamigos(true);
  };

  useEffect(() => {
    Getamigos();
  }, [cargandoamigos]);
  return (
    <div>
      <Grid xs={15} justify="center" align="center">
        <Diversity3Icon fontSize="large" color="primary" sx={{ fontSize: 80 }} />
      </Grid>
      <Text
        h1
        size={40}
        css={{
          textGradient: "45deg, $blue600 -20%, $blue900 100%",
        }}
        weight="bold"
      >
        Ver Amigos
      </Text>

      <table class="content-table">
        <thead>
          <th>Foto</th>

          <th>Username</th>
          <th>Nombre</th>
          <th>EMAIL</th>
         
         
        
        </thead>

        {amigos.map((item, i) => (
          <>
            <tr>
              <td>
                {" "}
                <Avatar size="lg" src={item.foto} color="primary" bordered />
              </td>

              <td>{item.username}</td>
              <td>{item.nombre}</td>
              <td>{item.email}</td>
         
              
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};
