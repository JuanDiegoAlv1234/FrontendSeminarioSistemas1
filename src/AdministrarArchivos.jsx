import { useContext, useEffect, useState } from 'react'
import axios from "axios"



import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

import { pdfjs } from 'react-pdf';

import { Radio, Grid, Button, Text, Table, Input, Row, useModal, Collapse, Spacer, Modal, Card } from "@nextui-org/react";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useForm } from "./hooks/useForm";
import { AuthContext } from './Context/AuthContext'
import { GetFILES } from './helpers/fetch';
import { EliminarArchivo } from './helpers/fetch';

export const AdministrarArchivos = () => {

    const alv = []


    const { verificarToken, auth } = useContext(AuthContext)
    const [tipo, setTipo] = useState("publico");
    const [archivos, setarchivos] = useState([])
    const [nombreA, setnombre] = useState('')
    const [cargandoArchivos, setcargandoArchivos] = useState([])
    const handletipo1 = (e) => {

        setTipo("privado")
        Getarchivos(tipo)


    };
    const handletipo2 = (e) => {


        setTipo("publico")

        Getarchivos(tipo)

    };

    const cambiar_nombre = (nombre) => {
        setVisible(true)
        setnombre(nombre)

    }
    const { setVisible, bindings } = useModal();
    const { values, handleInputChange } = useForm({


        ruta: '',
        files: '', Username: '', Correo: '', Contraseña: '', ConfirmarContraseña: '', User: '', Pass: '', nuevo_nombre: ''









    });
    const BORRAR = async (nombreArchivo) => {
        const data = {
            "password": values.Contraseña,
            "username": auth.username,
            "nombreArchivo": nombreArchivo
        }

        console.log("data para borrar", data)

        const resp = await EliminarArchivo('', data, 'DELETE')

    }

    const Editar = async () => {

        if (tipo === "privado") {

            setTipo("privado")
        } else {
            setTipo("publico")
        }

        const data = {
            "password": values.Contraseña,
            "username": auth.username,
            "nombreArchivo": nombreA,
            "acceso": tipo,
            "nombreNuevo": values.nuevo_nombre
        }

        console.log("data para editar", data)

        const resp = await EliminarArchivo('', data, 'PUT')
    }
    const Getarchivos = async (acceso) => {

        const id = localStorage.getItem("iduser")
        const data = {
            "idUsuario": id,
            "acceso": "privado"
        }



        console.log("tipo", tipo)



        const resp = await GetFILES(id, tipo, 'GET')
        console.log("holiii", resp)
        setarchivos(resp.archivos)





    }

    useEffect(() => {

        Getarchivos(tipo)






    }, [cargandoArchivos]);
    return (
        <div>

            <div>


            </div>
            <Grid xs={15} justify='center' align="center">
                <AttachFileIcon fontSize="large" color="primary" sx={{ fontSize: 80 }} />
            </Grid>
            <Text
                h1
                size={40}
                css={{
                    textGradient: "45deg, $blue600 -20%, $blue900 100%",
                }}
                weight="bold"
            >
                Mis archivos



            </Text>
            <Grid.Container gap={8} justify="flex-start">
                <Grid xs={12} sm={4} align="center">

                    <Input
                        clearable
                        bordered
                        width="300px"
                        type='password'
                        Placeholder="Contraseña" color="primary"
                        id="Contraseña" name="Contraseña" value={values.Contraseña} onChange={handleInputChange}


                    />

                </Grid>

                <Grid xs={12} sm={4} align="center">

                    <Button auto ghost color="primary" onClick={() => handletipo1()} >
                        Ver Privados
                    </Button>

                </Grid>

                <Grid xs={12} sm={4} align="center">

                    <Button auto ghost color="primary" onClick={() => handletipo2()} >
                        Ver Publicos
                    </Button>

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
                        {tipo}



                    </Text>

                </Grid>



            </Grid.Container>


            <div class="cards">

                {

                    archivos.map((item, i) => (<>

                        <Card css={{ p: "$8", mw: "400px" }}   >
                            <Card.Header >

                                <Collapse.Group >
                                    <Collapse title={

                                        <>
                                            <div class="">

                                                <Grid xs={4} sm={3} justify='center' align="center">
                                                    <Text
                                                        h1
                                                        size={15}
                                                        css={{
                                                            width: '300px', textGradient: "45deg, $blue800 -20%, $blue800 100%", padding: '$2 $2'
                                                        }}
                                                        weight="bold"
                                                    >
                                                        {item.nombre}

                                                    </Text>
                                                </Grid>




                                                <Card.Divider />

                                            </div>

                                        </>


                                    }

                                    >  <Card.Body css={{ p: 0, justifyItems: "flex-start", padding: '$2 $3' }}>

                                            <div class="textoCard">
                                                <Text
                                                    h1
                                                    size={25}
                                                    css={{
                                                        width: '300px', textGradient: "45deg, $blue800 -20%, $blue800 100%", padding: '$2 $2'
                                                    }}
                                                    weight="bold"
                                                >
                                                    Tipo

                                                </Text>

                                                <Text css={{ lineHeight: "$xs", color: "$blue600", padding: '$2 $3' }}>
                                                    {item.tipo}
                                                </Text>
                                                <Grid xs={12} sm={3} align="center">  <Button auto ghost color="primary" onClick={() => cambiar_nombre(item.nombre)}>
                                                    Editar Archivo
                                                </Button>



                                                </Grid>
                                                <Grid xs={12} sm={3} align="center">  <Button auto ghost color="error" onClick={() => BORRAR(item.nombre)}>
                                                    Eliminar Archivo
                                                </Button>



                                                </Grid>

                                                {item.tipo === 'application/pdf' ? <>

                                                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`}>
                                                        <Viewer fileUrl={item.url} />
                                                    </Worker>
                                                </> : (
                                                    <embed
                                                        src={item.url}
                                                        width={'100%'}
                                                        height={'600px'}
                                                    />


                                                )}




                                                <Spacer y={1} />


                                            </div>


                                        </Card.Body>
                                    </Collapse>
                                </Collapse.Group>





                            </Card.Header>




                        </Card>




                    </>))

                }
            </div>


            <Modal

                width="400px"



                aria-labelledby="modal-title"
                aria-describedby="modal-description"
                {...bindings}
            >
                <Modal.Header css={{ xs: 8 }}   >





                    <Text
                        h1
                        size={60}
                        css={{
                            width: '300px', textGradient: "45deg, $blue600 -20%, $blue600 100%", padding: '$2 $2'
                        }}
                        weight="bold"
                    >
                        Editar Archivo

                    </Text>


                </Modal.Header>
                <Modal.Body align="center" >


                    <Row justify='center' align="center" css={{ m: 10 }} >


                        <Input
                            clearable
                            bordered
                            Placeholder="Nuevo nombre para el archivo" color="primary"
                            id="nuevo_nombre" name="nuevo_nombre" value={values.nuevo_nombre}
                            onChange={handleInputChange}


                        />
                        <Spacer y={2.5} />
                    </Row>
                    <Radio.Group label="Options" defaultValue="Publico">


                        <Row justify='center' align="center" css={{ xs: 4 }} >


                            <Radio value="Privado" id="tipo1" onFocus={() => handletipo1()}>Privado </Radio>





                        </Row>
                        <Row justify='center' align="center" css={{ xs: 4 }} >




                            <Radio value="Publico" id="tipo2" onFocus={() => handletipo2()}>Publico </Radio>


                        </Row>
                    </Radio.Group>
                    <Row justify='center' align="center" css={{ xs: 1 }} >




                        <Button auto ghost color="primary" onClick={() => Editar()} >
                            Editar
                        </Button>
                    </Row>
                </Modal.Body>

                <Modal.Footer>

                    <Button auto ghost color="primary" onClick={() => setVisible(false)}>
                        salir
                    </Button>
                </Modal.Footer>
            </Modal>




        </div>
    );
}