import { useContext, useEffect, useState } from "react";

import {
  Radio,
  Grid,
  Button,
  Text,
  Card,
  Collapse,
  Input,
  Row,
  useModal,
  Spacer,
  Modal,
  Avatar,
} from "@nextui-org/react";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useForm } from "../hooks/useForm";
import { AuthContext}  from "../Context/AuthContext";
import { peticionToken } from "../helpers/fetch";
import axios from "axios";

export const VerSolicitudes = () => {
  const { verificarToken, auth } = useContext(AuthContext);


  const [solicitudes, setsolicitudes] = useState([]);
  const [cargandosolicitudes, setcargandosolicitudes] = useState([]);
 

  const { setVisible, bindings } = useModal();
  const { values, handleInputChange } = useForm({
    idUsuario: 0,

    ruta: "",
    nombre: "",
    raza: "",
    nombres: "",
    apellidos: "",
    telefono: "",
    pass: "",
    especialidad: "",
    horaInicio: "",
    HoraFin: "",
    password: "",
    Frecuente: 0,
    tipoUsuario: "",
  });
  const AceptarSolicud = async (id) => {
    const data={
      "id":id,"estado":1

    }

    const resp = await peticionToken('/api/friends/putSolicitud',data, "POST");

    console.log("respuesta", resp);
   
  };
  const Getsolicitudes = async () => {
    const resp = await peticionToken(
      "/api/friends/getSolicitudes",
      "",
      "GET"
    );
    console.log(resp);
    setsolicitudes(resp.solicitudes);
  };


  useEffect(() => {
    Getsolicitudes();
  }, [cargandosolicitudes]);
  return (
    <div>
      <Grid xs={15} justify="center" align="center">
        <PeopleAltIcon fontSize="large" color="primary" sx={{ fontSize: 120 }} />
      </Grid>
      <Grid xs={12} sm={4} align="center">
        <Text
          h1
          size={40}
          css={{
            textGradient: "45deg, $blue600 -20%, $blue900 100%",
          }}
          weight="bold"
        >
          Ver solicitudes
        </Text>{" "}
      </Grid>

      <div class="cards2">
        {" "}

        {solicitudes.map((item, i) => (
          <>
            <Card css={{ p: "$8", mw: "400px" }}>
              <Card.Header>
                <Collapse.Group>
                  <Collapse
                    title={
                      <>
                        <div class="">
                          <Grid xs={4} sm={3} justify="center" align="center">
                            <img src={item.foto} alt="Foto Mascota" />
                          </Grid>
                        </div>
                      </>
                    }
                  >
                    {" "}
                    <Card.Body
                      css={{
                        p: 0,
                        justifyItems: "flex-start",
                        padding: "$2 $3",
                      }}
                    >
                      <div class="textoCard">
                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient: "45deg, black -20%, black 100%",
                          }}
                          weight="bold"
                        >
                          Username
                        </Text>
                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient:
                              "45deg, $blue600 -20%,  $blue600 100%",
                          }}
                          weight="bold"
                        >
                          {item.username}
                        </Text>

                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient: "45deg, black -20%, black 100%",
                          }}
                          weight="bold"
                        >
                          Nombre
                        </Text>
                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient:
                              "45deg, $blue600 -20%,  $blue600 100%",
                          }}
                          weight="bold"
                        >
                          {item.nombre}
                        </Text>

                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient: "45deg, black -20%, black 100%",
                          }}
                          weight="bold"
                        >
                          Correo
                        </Text>
                        <Text
                          h1
                          size={15}
                          css={{
                            textGradient:
                              "45deg, $blue600 -20%,  $blue600 100%",
                          }}
                          weight="bold"
                        >
                          {item.email}
                        </Text>
                      </div>  <Grid xs={12} sm={3} align="center">
                  {" "}
                  <Button
                    auto
                    ghost
                    color="primary"
                    onClick={() => AceptarSolicud(item.idSolicitud,1)}
                  >
                    Aceptar
                  </Button>
                </Grid>
                <Grid xs={12} sm={3} align="center">
                  {" "}
                  <Button
                    auto
                    ghost
                    color="warning"
                    onClick={() => AceptarSolicud(item.idSolicitud,0)}
                  >
                    Rechazar
                  </Button>
                </Grid>

                      </Card.Body>
                  </Collapse>
                </Collapse.Group>
              </Card.Header>
            </Card>
          </>
        ))}
      </div>

   
    </div>
  );
};
