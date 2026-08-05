import {
  Box,
  Toolbar,
  AppBar,
  IconButton
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../common/SideDrawer";


const drawerWidth = 260;


const DashboardLayout = () => {


  const [mobileOpen, setMobileOpen] = useState(false);

  const [desktopOpen, setDesktopOpen] = useState(true);



  return (

    <Box sx={{display:"flex"}}>


      <AppBar

        position="fixed"

        sx={{
          width:{
            md: desktopOpen 
            ? `calc(100% - ${drawerWidth}px)`
            : "100%"
          },

          ml:{
            md: desktopOpen 
            ? `${drawerWidth}px`
            : 0
          },

          transition:"0.3s"
        }}

      >


        <Toolbar>


          <IconButton

            color="inherit"

            onClick={()=>{

              if(window.innerWidth < 900){

                setMobileOpen(true)

              }else{

                setDesktopOpen(!desktopOpen)

              }

            }}

          >


          {
            desktopOpen 
            ? <ChevronLeftIcon/>
            : <MenuIcon/>
          }


          </IconButton>


          Admin Dashboard


        </Toolbar>


      </AppBar>



      <Sidebar

        mobileOpen={mobileOpen}

        desktopOpen={desktopOpen}

        handleDrawerToggle={()=>setMobileOpen(false)}

      />



      <Box

        component="main"

        sx={{

          flexGrow:1,

          p:3,

          transition:"0.3s",

          ml:{
            md: desktopOpen 
            ? `${drawerWidth}px`
            : 0
          }

        }}

      >


        <Toolbar/>


        <Outlet/>


      </Box>


    </Box>

  )

}


export default DashboardLayout;