

import { useState, useEffect,useContext } from "react"
import axios from 'axios';
import { AuthContext } from "../Context/AuthContext";
import { GetFILES } from "../helpers/fetch";
export const useArchivo = () => {
  const [archivos, setarchivos] = useState([])
  const { auth } = useContext(AuthContext)

  const [Cargandoarchivos, setCargandoarchivos] = useState(true)

  const Getarchivos = async (id,acceso) => {


    const data ={ "idUsuario": id,
    "acceso": acceso}

   
    const resp = await GetFILES ('',data,'GET')
    

    


  }


  const GetProductoNombre = async (nombre) => {
    /*
    const { Nombre,Precio,Cantidad,Ubicacion,Categoria,Descripcion,URL } = req.body;
    */




    await axios.get('http://app-load-balancer-1185565645.us-east-1.elb.amazonaws.com/api_archivos/archivosNombre/'+nombre)
      .then(response => {
        console.log(response.data)
       


      }).catch(error => {
        console.log(error)
      })

      ;

  }


  useEffect(() => {

    Getarchivos()

  }, [Cargandoarchivos]);
  return {  archivos, Cargandoarchivos }
}