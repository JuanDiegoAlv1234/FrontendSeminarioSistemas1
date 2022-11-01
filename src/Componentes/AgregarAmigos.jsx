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
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../Context/AuthContext";
import {  peticion,peticionToken,EnviarSolicitud} from "../helpers/fetch";

export const AgregarAmigos = () => {
  const { verificarToken, auth } = useContext(AuthContext);
  const [tipo, setTipo] = useState();
  const [usuarios, setusuarios] = useState([]);
  const [nombreA, setnombre] = useState("");
  const [cargandousuarios, setcargandousuarios] = useState([]);
  
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

  const GetUsuarios = async () => {
    const id = localStorage.getItem("iduser");

    const resp = await peticionToken('/api/friends/NoAgregados',"", "GET");

    console.log("respuesta", resp);
    setusuarios(resp.amigos);
    setcargandousuarios(true);
  };

  useEffect(() => {
    GetUsuarios();
  }, [cargandousuarios]);
  return (
    <div>
      <Grid xs={15} justify="center" align="center">
        <GroupAddIcon fontSize="large" color="primary" sx={{ fontSize: 80 }} />
      </Grid>
      <Text
        h1
        size={40}
        css={{
          textGradient: "45deg, $blue600 -20%, $blue900 100%",
        }}
        weight="bold"
      >
        Agregar Amigos
      </Text>

      <table class="content-table">
        <thead>
          <th>Foto</th>

          <th>Nombre</th>
          <th></th>
        </thead>

        {usuarios.map((item, i) => (
          <>
            <tr>
              <td>
                {" "}
                <Avatar size="lg" src={item.foto} color="primary" bordered />
              </td>

              <td>{item.username}</td>
              <td>
                <Grid xs={12} sm={3} align="center">
                  {" "}
                  
                  <Button
                    auto
                    ghost
                    color="primary"
                    onClick={() => AgregarFriend(item.id)}
                  >
                    Agregar Amigo
                  </Button>
                </Grid>
              </td>
            </tr>
          </>
        ))}
      </table>
    </div>
  );
};
