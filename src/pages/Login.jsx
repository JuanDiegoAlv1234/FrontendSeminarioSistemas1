import { useForm } from "../hooks/useForm";
import Swal from "sweetalert2";
import { Image } from "@nextui-org/react";
import Webcam from "react-webcam";
import {
  Input,
  Grid,
  Row,
  Button,
  Text,
  Modal,
  useModal,
  Spacer,
  Card,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { peticion } from "../helpers/fetch";
import { AuthContext } from "../Context/AuthContext";
import TextField from "@mui/material/TextField";
import { useUsuario } from "../hooks/useUsuario";

export const Login = () => {
  const { CrearUsuario } = useUsuario();
  const [file, setFile] = useState();
  const [webcam, setwebcam] = useState();
  const [imagen, setImagen] = useState();
  const [mensaje, setMensaje] = useState();

  const [mostrarValidacion, setMostrarValidacion] = useState(false);
  
  const [fotoPerfil,setfotoPerfil]=useState()
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const { submitLogin } = useContext(AuthContext);
  const { setVisible, bindings } = useModal();

  const { values, handleInputChange } = useForm({
    ruta: "",
    files: "",
    Username: "",
    Correo: "",
    Nombre:"",
    Contraseña: "",
    ConfirmarContraseña: "",
    User: "",
    Pass: "",
    codigo:""
  });

  const handleLogin = (e) => {
    submitLogin(values.User, values.Pass);
  };
  const cerrarModal = (e) => {
    if (values.codigo!==""){

      setVisible(false)

      setMostrarValidacion(false)
      setMensaje("")
    }else {
      setMensaje("Ingrese el codigoooo")
    }
  };
  const Validar = async () => {
  


    const dataValidacion = {
        "username": values.Username,
        "code": values.codigo,
     


    }

    console.log("dataValidacion", dataValidacion)
    const resp = await peticion('/api/users/confirm/', dataValidacion, 'PUT')
   console.log(resp)
}

  const AgregarUsuario = () => {
    const formData = new FormData();

    formData.append("foto", file);
    setMostrarValidacion(true)

    CrearUsuario(
        values.Nombre,
      values.Username,
      values.Correo,
      values.Password,
      values.ConfirmarPassword,
      file
    );
  };
const   setRef=webcam=>{
    setwebcam(webcam)
}
 const  foto=()=>{
    var captura=webcam.getScreenshot();
   
   setImagen(captura)
    urltoFile(imagen,'foto.jpg','img').then(function(file){ console.log("archivo",file)
    setFile(file);});



};
function urltoFile(url, filename, mimeType){
  return (fetch(url)
      .then(function(res){return res.arrayBuffer();})
      .then(function(buf){return new File([buf], filename,{type:mimeType});})
  );
}

  return (
    <div>
      <div class="Fondoportal">
        <Grid.Container gap={2} justify="center" align="center" bordered={2}>
          <div class="centerCard">
            <Card css={{ p: "$6", mw: "350px" }}>
              <Card.Header>
                <Card.Image
                  src="https://github.com/JuanDiegoAlv1234/MIA_201807335/blob/main/logosemi%20(1).png?raw=true"
                  alt="efe?"
                  objectFit="cover"
                />
              </Card.Header>

              <form id="form">
                <Card.Body
                  css={{ p: 0, justifyItems: "center", zIndex: 1, top: 5 }}
                >
                  <div class="center">
                    <Grid xs={12} sm={24} align="center">
                      <Input
                        bordered
                        labelPlaceholder="User"
                        color="primary"
                        id="User"
                        name="User"
                        value={values.User}
                        onChange={handleInputChange}
                      />
                    </Grid>
                
                    <Grid xs={12} sm={24} align="center">
                      <Input
                        id="Pass"
                        type="password"
                        bordered
                        color="primary"
                        placeholder=" Pass"
                        value={values.Pass}
                        name="Pass"
                        onChange={handleInputChange}
                      />
                    </Grid>
                  </div>
                </Card.Body>
                <Row justify="space-around" align="center">
                  <Grid css={{ m: 10 }}>
                    <Button
                      auto
                      ghost
                      color="primary"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </Button>
                  </Grid>
                  <Grid>
                    <Text color="primary" size={12}>
                      Eres nuevo?
                    </Text>
                    <Button
                      auto
                      ghost
                      color="primary"
                      css={{ m: 1 }}
                      onClick={() => setVisible(true)}
                    >
                      Registrarsee
                    </Button>

                    <Modal
                      width="600px"
                      aria-labelledby="modal-title"
                      aria-describedby="modal-description"
                      {...bindings}
                    >
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
                          Registro
                        </Text>
                      </Modal.Header>
                      <Modal.Body align="center">
                      <Row justify="center" align="center" css={{ m: 10 }}>
                      <img src={imagen} alt=""/>  
                        
                          <Spacer y={2.5} />
                        </Row>

                        <Row justify="center" align="center" css={{ m: 10 }}>
                          <Input
                            clearable
                            bordered
                            Placeholder="Username"
                            color="primary"
                            id="Username"
                            name="Username"
                            value={values.Username}
                            onChange={handleInputChange}
                          />
                          <Spacer y={2.5} />
                        </Row>

                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          <Input
                            clearable
                            bordered
                            Placeholder="Nombre"
                            color="primary"
                            id="Nombre"
                            name="Nombre"
                            value={values.Nombre}
                            onChange={handleInputChange}
                          />
                        </Row>
                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          <Input
                            clearable
                            bordered
                            Placeholder="@Correo"
                            color="primary"
                            id="Correo"
                            name="Correo"
                            value={values.Correo}
                            onChange={handleInputChange}
                          />
                        </Row>

                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          <Input
                            clearable
                            bordered
                            type="password"
                            Placeholder="Contraseña"
                            color="primary"
                            id="Password"
                            name="Password"
                            value={values.Password}
                            onChange={handleInputChange}
                          />
                        </Row>

                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          <Input
                            clearable
                            bordered
                            type="password"
                            Placeholder="Confirmar Contraseña"
                            color="primary"
                            id="ConfirmarPassword"
                            name="ConfirmarPassword"
                            value={values.ConfirmarPassword}
                            onChange={handleInputChange}
                          />
                        </Row>

                        <Row justify="center" align="center" css={{ xs: 1 }}>
                          <Input
                            type="file"
                            className="form-control bg-dark text-light rounded-0 border border-secondary"
                            onChange={handleChange}
                          />
                        </Row>
                        <Row justify="center" align="center" css={{ xs: 1 }}>
                        <Webcam audio={false} height={350} ref={setRef} screenshotFormat="image/jpeg" width={350}/>
                    
                       </Row>
                       <Row justify="center" align="center" css={{ xs: 4 }}>
                       <Button
                      auto
                      ghost
                      color="primary"
                      onClick={() => foto()}
                    >TomarFoto</Button>

                       </Row>
                     
                        <Row justify="center" align="center" css={{ xs: 1 }}>
                          <Button
                            auto
                            ghost
                            color="primary"
                            onClick={() => AgregarUsuario()}
                          >
                            Crear Usuario
                          </Button>
                        </Row>
                     {mostrarValidacion===true ? ( 
                        <div>
                           <Row justify="center" align="center" css={{ xs: 4 }}>
                          
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
                            Validar Cuenta
                          </Text>
                          </Row>
                       
                          
                       
                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          
                     
                        <Input
                            clearable
                            bordered
                            Placeholder="Username"
                            color="primary"
                            id="Username"
                            name="Username"
                            value={values.Username}
                            onChange={handleInputChange}
                          />
                        </Row> 
                        <br/>
                         <Row justify="center" align="center" css={{ xs: 4 }}>
                          <Input
                            clearable
                            bordered
                         
                            Placeholder="Ingrese su codigo Usuario"
                            color="primary"
                            id="codigo"
                            name="codigo"
                            value={values.codigo}
                            onChange={handleInputChange}
                          />
                        </Row><br/>
                        <Row justify="center" align="center" css={{ xs: 4 }}>
                        <Button
                            auto
                            ghost
                            color="primary"
                            onClick={() => Validar()}
                          >
                           Validar
                          </Button>
                        </Row>   
                        </div>
                      
                     )
                    :(<div></div>)
                    }
                       
                        <Row justify="center" align="center" css={{ xs: 4 }}>
                          
                          <Text
                            h1
                            size={25}
                            css={{
                              width: "300px",
                              textGradient: "45deg, $red700 -20%, $red700 100%",
                              padding: "$2 $2",
                            }}
                            weight="bold"
                          >
                            {mensaje}
                          
                          </Text>
                          </Row>
                      </Modal.Body>

                      <Modal.Footer>
                        <Button
                          auto
                          ghost
                          color="primary"
                          onClick={() => cerrarModal()}
                        >
                          salir
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Grid>
                </Row>
              </form>
            </Card>
          </div>
        </Grid.Container>
      </div>
    </div>
  );
};
