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
  Textarea,
  Modal,
  Avatar,
  Badge
} from "@nextui-org/react";

import ImportantDevicesIcon from "@mui/icons-material/ImportantDevices";
import { useForm } from "../hooks/useForm";
import { AuthContext } from "../Context/AuthContext";
import { peticionToken } from "../helpers/fetch";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useUsuario } from "../hooks/useUsuario";
export const Publicaciones = () => {
  const { verificarToken, auth } = useContext(AuthContext);

  const [Publicaciones, setPublicaciones] = useState([]);
  const [Categorias, setCategorias] = useState([]);
  const [cargandoPublicaciones, setcargandoPublicaciones] = useState([]);
  const [Traduccion, setTraduccion] = useState([]);
  const { setVisible, bindings } = useModal();
  const [modal, setmodal] = useState();
const {CrearPublicacion}=useUsuario()
  const [file, setFile] = useState();
  const { values, handleInputChange } = useForm({
    idUsuario: 0,

    ruta: "",
    nombre: "",
    raza: "",
    nombres: "",
    nombre: "",
    cuerpo: "",
    pass: "",
    fecha: "",
    horaInicio: "",
    HoraFin: "",
    password: "",
    Frecuente: 0,
    categoria: "",
  });
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  
  const Traducir = async (id, idioma) => {
    const resp = await peticionToken(
      "/api/publicacion/translate/" + idioma + "/" + id,
      "",
      "GET"
    );

    console.log("respuesta", resp);
    setTraduccion(resp.TranslatedText);
    setmodal(false)
    setVisible(true);
  };
  const Crear =async () => {
    const formData = new FormData();

    formData.append("foto", file);
  

    CrearPublicacion(values.nombre,values.fecha,values.cuerpo,file)
    const resp = await peticionToken("/api/publicacion/", "", "GET");
    console.log(resp);
    setPublicaciones(resp.publicaciones);
  };
  const MostrarModal =  () => {
    setmodal(true)
    setVisible(true)
  
  };
  const Buscar = async () => {
    let ruta="/api/publicacion/"
 
    if (Categorias.length>0){
       ruta="/api/publicacion/?tags="+JSON.stringify(Categorias)
      console.log(ruta)
    }
    else {
       ruta="/api/publicacion/"
      console.log(ruta)
    }
    const resp = await peticionToken(
      ruta,
      "",
      "GET"
    );

    console.log("respuesta", resp);
    setPublicaciones(resp.publicaciones);
   
  };
  const Agregar = async (ct) => {
  setCategorias([...Categorias, ct])
  };
  const GetPublicaciones = async () => {
    const resp = await peticionToken("/api/publicacion/", "", "GET");
    console.log(resp);
    setPublicaciones(resp.publicaciones);
  };

  useEffect(() => {
    GetPublicaciones();
  }, [cargandoPublicaciones]);
  return (
    <div>
      <Grid xs={15} justify="center" align="center">
        <ImportantDevicesIcon
          fontSize="large"
          color="primary"
          sx={{ fontSize: 120 }}
        />
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
          Ver Publicaciones
        </Text>{" "}
      </Grid>
      <Grid.Container gap={1} justify="flex-start">
        <Grid xs={4} sm={4} align="center">
          <Input
            bordered
            labelPlaceholder="Ingrese categoria"
            color="primary"
            id="categoria"
            name="categoria"
            value={values.categoria}
            onChange={handleInputChange}
          />

          <Button
            style={{ "margin-left": "12px" }}
            auto
            ghost
            onClick={() => Agregar(values.categoria)}
          >
            Agregar{" "}
          </Button>
          <Button
            style={{ "margin-left": "12px" }}
            auto
            ghost
            onClick={() => Buscar()}
          >
            Buscar{" "}
          </Button>
        </Grid>
        <Grid xs={4} sm={4} align="center"> 

        <Grid.Container gap={0} justify="flex-start">
         {Categorias.map((item, i) => (
            <>   <Grid xs={6} sm={6} align="center"> 
            <Badge color="primary">
                <Text
                              h1
                              size={20}
                              css={{
                                textGradient:
                                  "45deg, white -20%, white 100%",
                              }}
                              weight="bold"
                            >
                              {item}
                            </Text>
                            </Badge>
                            <br/>
                            </Grid>
            
            </> ))}
            </Grid.Container>
            </Grid>
            <Grid xs={4} sm={4} align="center"> 
            <Button
            style={{ "margin-left": "300px" }}
            auto
            ghost
            size="lg"
            icon={<AddAPhotoIcon fill="currentColor" />}
            onClick={() => MostrarModal()}
          >
            Hacer Publicacion{" "}
          </Button>
            </Grid>
      </Grid.Container>
      <div class="cards2">
        {" "}
        <Grid.Container gap={1} justify="flex-start">
          {Publicaciones.map((item, i) => (
            <>
              <Grid xs={12} sm={4} align="center">
                <Card css={{ p: "$12", mw: "800px" }}>
                  <Card.Header>
                    <Collapse.Group>
                      <Collapse
                        title={
                          <>
                            <div class="">
                              <Grid
                                xs={4}
                                sm={3}
                                justify="center"
                                align="center"
                              >
                                <img src={item.imagen} alt="Foto Mascota" />
                              </Grid>
                              <Text
                              h1
                              size={30}
                              css={{
                                textGradient:
                                  "45deg, $blue600 -20%, $blue600 100%",
                              }}
                              weight="bold"
                            >
                              {item.nombre}
                            </Text>
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
                                textGradient: "45deg, black -20%,  black 100%",
                              }}
                              weight="bold"
                            >
                              {item.cuerpo}
                            </Text>
                            

                            <Text
                              h1
                              size={15}
                              css={{
                                textGradient: "45deg, black -20%, black 100%",
                              }}
                              weight="bold"
                            >
                              Fecha
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
                              {item.fecha}
                            </Text>
                          </div>{" "}
                        </Card.Body>
                        <Card.Footer>
                          <Grid.Container gap={1} justify="flex-start">
                            <Grid xs={4} sm={4} align="center">
                              <Button
                                auto
                                ghost
                                onClick={() => Traducir(item.id, "pt")}
                              >
                                Ver Similares
                              </Button>
                            </Grid>
                            <Button.Group>
                              <Button onClick={() => Traducir(item.id, "pt")}>
                                Portugues
                              </Button>
                              <Button onClick={() => Traducir(item.id, "fr")}>
                                Frances
                              </Button>
                              <Button onClick={() => Traducir(item.id, "en")}>
                                Ingles
                              </Button>
                              <Button onClick={() => Traducir(item.id, "es")}>
                                Español
                              </Button>
                            </Button.Group>
                          </Grid.Container>
                        </Card.Footer>
                      </Collapse>
                    </Collapse.Group>
                  </Card.Header>
                </Card>
              </Grid>
            </>
          ))}{" "}
        </Grid.Container>
      </div>

   
      <Modal
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
    {modal===true ? (<>
      <Modal.Header css={{ xs: 8 }}>
          <Text
            h1
            size={40}
            css={{
              width: "300px",
              textGradient: "45deg, $blue600 -20%, $blue600 100%",
              padding: "$2 $2",
            }}
            weight="bold"
          >
            Crear Publicación
          </Text>
        </Modal.Header>
        <Modal.Body align="center">
      
            <Row justify="center" align="center" css={{ xs: 4 }}>
                          
                     
                          <Input
                              clearable
                              bordered
                              Placeholder="nombre"
                              color="primary"
                              id="nombre"
                              name="nombre"
                              value={values.nombre}
                              onChange={handleInputChange}
                            />
                          </Row> 
                          
                          <Row justify="center" align="center" css={{ xs: 4 }}>
                          
                     
                          <Input
                              clearable
                              bordered
                             
                              color="primary"
                              id="fecha"
                              type="date" 
                              name="fecha"
                              value={values.fecha}
                              onChange={handleInputChange}
                            />
                          </Row> 
       
                          <Row justify="center" align="center" css={{ xs: 4 }}>
                          
                     
                          <Textarea
                              clearable
                              bordered
                              Placeholder="cuerpo"
                              color="primary"
                              id="cuerpo"
                              name="cuerpo"
                              value={values.cuerpo}
                              onChange={handleInputChange}
                            />
                          </Row> 
                          <br/>
          <Row justify="center" align="center" css={{ xs: 1 }}>
                          <Input
                            type="file"
                            className="form-control bg-dark text-light rounded-0 border border-secondary"
                            onChange={handleChange}
                          />
                        </Row>
                     
                        <Row justify="center" align="center" css={{ xs: 1 }}>
                        <Button auto ghost color="primary" onClick={() => Crear()}>
             Crear publicacion   </Button> </Row>
          
        </Modal.Body>

        <Modal.Footer>
          <Button auto ghost color="primary" onClick={() => setVisible(false)}>
            salir
          </Button>
        </Modal.Footer>
    
    </> )
                    :(<>
                    

                    <Modal.Header css={{ xs: 8 }}>
          <Text
            h1
            size={40}
            css={{
              width: "300px",
              textGradient: "45deg, $blue600 -20%, $blue600 100%",
              padding: "$2 $2",
            }}
            weight="bold"
          >
            Traducción
          </Text>
        </Modal.Header>
        <Modal.Body align="center">
          <Row justify="center" align="center" css={{ xs: 4 }}>
            <Text
              h1
              size={15}
              css={{
                width: "300px",
                textGradient: "45deg, black -20%, black 100%",
                padding: "$2 $2",
              }}
              weight="bold"
            >
              {Traduccion}
            </Text>
          </Row>
        </Modal.Body>

        <Modal.Footer>
          <Button auto ghost color="primary" onClick={() => setVisible(false)}>
            salir
          </Button>
        </Modal.Footer>
                    </>)
                    }
       
      </Modal>
    </div>
  );
};
