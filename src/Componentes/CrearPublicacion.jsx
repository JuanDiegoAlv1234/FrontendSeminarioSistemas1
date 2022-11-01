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
    nombre:"",
    cuerpo:"",
    fecha: "",
    ConfirmarContraseña: "",
    User: "",
    Pass: "",
    codigo:""
  });

  const handleLogin = (e) => {
    submitLogin(values.User, values.Pass);
  };

  const CrearPublicacion = async () => {
  


    const dataValidacion = {
        "username": values.Username,
        "code": values.codigo,
     


    }

    console.log("dataValidacion", dataValidacion)
    const resp = await peticion('/api/users/confirm/', dataValidacion, 'PUT')
   console.log(resp)
}

 
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
            <Card css={{ p: "$12", mw: "900px" }}>
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
