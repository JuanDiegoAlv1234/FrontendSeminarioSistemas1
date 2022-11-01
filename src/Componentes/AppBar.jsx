import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Input, Grid, Row, Button, Text, Link, Modal, useModal, Avatar } from "@nextui-org/react";
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Container from '@mui/material/Container';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { blue } from '@mui/material/colors';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { Image } from "@nextui-org/react";

import Swal from 'sweetalert2'
const Barra = () => {
   const { verificarToken,auth } = useContext(AuthContext)
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [foto, setFoto] = React.useState('');
  
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  useEffect(() => {
 

   
    const efe=auth.perfil
    console.log(efe)
  
  },);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const Salir = () => {
    Swal.fire({
        title: '¿Desea Salir del sistema?',
        text: " ya no podra regresar",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si salir'
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("salir")
          localStorage.removeItem("token")
          verificarToken()
          Swal.fire(
            'Salir',
            'Usted esta saliendo del sistema.',
            'success'

            
          )
        
        }
    
      })
  
}
  const primary = blue[50]; // #f44336
  return (
    <div class="Barra">
    <AppBar position="static" color="primary" >
        
        <Toolbar disableGutters>
            
        <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: '1' } }}>
    
        <Image src="https://github.com/JuanDiegoAlv1234/MIA_201807335/blob/main/logosemi%20(1).png?raw=true" width={0} margin-left={200} maxDelay={500} height={200} alt="efe?" />

        </Box>
          <Box sx={{ flexGrow: 0.5, display: { xs: 'flex', md: 'none' } }}>
    
         
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                  
            </Menu>
          </Box>
         
          <Box sx={{ flexGrow: 1, display: { xs: '20', md: '8px' } }}>
          <MenuItem  >
                
          <Text
                  h1
                  size={15}
                  css={{
                    textGradient: "45deg, $white -20%, $white 100%",
                  }}
                  weight="bold"
                >
                
                </Text>
                </MenuItem>
          </Box>

      
          <Box sx={{ flexGrow: 0.05 }}   >
          <Avatar
          size="lg"
          src={auth.foto}
          css={{ size: "$40" }}
          color="primary"
          bordered
        />
            <Menu
               
              sx={{ mt: '80px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ 
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              <MenuItem sx={{ flexGrow: 0,bgcolor: 'background.paper'  }} >
             
             
            </MenuItem>
            </Menu>
          </Box>


          <Box sx={{ flexGrow: 0.001 }}   >
         
          <MenuItem onClick={() => Salir()} >
          <Grid > 
          <ExitToAppIcon fontSize="large" sx={{ fontSize: 70, color: blue[50] }}    />
          </Grid>
          <Grid xs={3} sm={5} borderWeights={2}> 
          <Text
                  h1
                  size={25}
                  css={{
                    textGradient: "45deg, $white -20%, $white 100%",
                  }}
                  weight="bold"
                >
                Salir
                </Text>
                </Grid>
         </MenuItem>
     
          </Box>



        </Toolbar>
     
    </AppBar>
    </div>
  );
};
export default Barra;