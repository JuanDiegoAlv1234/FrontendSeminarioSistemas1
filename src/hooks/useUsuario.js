import { useState, useEffect } from "react"
import axios from 'axios';
export const useUsuario = () => {



    const CrearUsuario = async (Username,nombre, Correo, Contraseña, ConfirmarContraseña, Foto) => {
        /*
        const { Nombre,Precio,Cantidad,Ubicacion,Categoria,Descripcion,URL } = req.body;
        */


        const resp = {
            "username": Username,"name":nombre, "email": Correo, "password": Contraseña, "password2": ConfirmarContraseña, "files": Foto



        }
        console.log(resp)
     

          const formData = new FormData();

          formData.append("foto", Foto);

          formData.append('username', Username);
          formData.append('password', Contraseña);
          formData.append('repeatedPassword', ConfirmarContraseña);
          formData.append('email', Correo);
          formData.append('name', nombre);

      

        await axios.post('http://localhost:5000/api/users/',formData,  {
          headers: {
            "Content-Type": "multipart/form-data",
          }})
            .then(response => {
                console.log("efe?")
                console.log(response)
            });

    }
    const CrearPublicacion = async (nombre, fecha, cuerpo, Foto) => {
      /*
      const { Nombre,Precio,Cantidad,Ubicacion,Categoria,Descripcion,URL } = req.body;
      */
    const token = localStorage.getItem("token")


      const resp = {
         "name":nombre, "fecha": fecha, "cuerpo": cuerpo, "files": Foto



      }
      console.log(resp)
   

        const formData = new FormData();

        formData.append("imagen", Foto);


        formData.append('cuerpo', cuerpo);
 
        formData.append('fecha', fecha);
        formData.append('nombre', nombre);

    

      await axios.post('http://localhost:5000/api/publicacion/createPublicacion/',formData,  {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token":token,
        }})
          .then(response => {
              console.log("efe?")
              console.log(response)
          });

  }

    return { CrearUsuario ,CrearPublicacion}
}