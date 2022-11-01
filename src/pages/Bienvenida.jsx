import { useForm } from "../hooks/useForm";
import Tooltip from "@mui/material/Tooltip";
import { VerSolicitudes } from "../Componentes/VerSolicitudes";
import { Publicaciones } from "../Componentes/Publicaciones";
import {
  Input,
  Grid,
  Row,
  Button,
  Text,
  Link,
  Modal,
  useModal,
  Spacer,
} from "@nextui-org/react";

import { useContext, useEffect, useState } from "react";
import { Chat } from "../Componentes/Chat";
import { AuthContext } from "../Context/AuthContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { VerAmigos } from "../Componentes/Ver Amigos";
import { AgregarAmigos } from "../Componentes/AgregarAmigos";
import Barra from "../Componentes/AppBar";

import { blue } from "@mui/material/colors";
export const Bienvenida = () => {
  const [cargarPestaña] = useState(false);
  const { verificarToken,auth } = useContext(AuthContext)
  const [bienvenida, setBienvenida] = useState(false);

  //  const {LLenarPestaña, pestañasTotales } = Pestaña()
  const [value, setValue] = useState("1");
  const [page, setPage] = useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { values, handleInputChange } = useForm({
    pagina: 0,

    ruta: "",
  });
  useEffect(() => {
console.log(auth)

  }, [cargarPestaña]);

  function set() {
    setBienvenida(true);
  }

  return (
    <div class="MenuPortal">
      <Barra></Barra>
      <Grid.Container gap={1} justify="flex-start">
        <Grid xs={12} sm={12} align="center">
          <Box
            sx={{
              width: "1500px",
              padding: "20px",
              height: 800,
              typography: "body1",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  sx={{
                    width: "900px",
                    padding: "10px",
                    height: 0,
                    typography: "body1",
                    margin: "auto",
                  }}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >


                  <Tab label="Agregar Amigo" value="2"></Tab>
                  <Tab label="Ver Solicitudes " value="3"></Tab>
                  <Tab label="Chat " value="4"></Tab>
                  <Tab label="Ver AMIGOS " value="5"></Tab>
                  <Tab label="Publicaciones " value="6"></Tab>
                </TabList>
              </Box>
              <TabPanel value="1">
                {" "}
                <Text
                  h1
                  size={20}
                  css={{
                    textGradient: "45deg, $blue600 -20%, $blue900 100%",
                  }}
                  weight="bold"
                >
                  Escoja la opcion que desee
                </Text>{" "}
              </TabPanel>

              <TabPanel value="2">
                <div class="ContFooter">
                  <Grid xs={12} sm={24} align="center">
                  <AgregarAmigos />
                  </Grid>
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div class="ContFooter">
                  <VerSolicitudes />
                </div>
              </TabPanel>
              <TabPanel value="4">
                <div class="ContFooter">
                  <Grid xs={12} sm={24} align="center">
              <Chat></Chat>
                  </Grid>
                </div>
              </TabPanel>

              <TabPanel value="5">
                <div class="ContFooter">
                  <Grid xs={12} sm={24} align="center">
                  <VerAmigos></VerAmigos>
                  </Grid>
                </div>
              </TabPanel>
              <TabPanel value="6">
                <div class="ContFooter">
                  <Grid xs={12} sm={24} align="center">
                  <Publicaciones></Publicaciones>
                  </Grid>
                </div>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid.Container>
    </div>
  );
};
