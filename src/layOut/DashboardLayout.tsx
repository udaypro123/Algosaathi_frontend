import {
  Box,
  Toolbar,
  AppBar,
  IconButton,
  Tooltip
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";

import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../common/SideDrawer";
import ThemeToggle from "../common/ThemeToggle";
import { clearAuthData } from "../utils/auth";



const DashboardLayout = () => {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    navigate("/login", { replace: true });
  };


  return (

    <Box sx={{ display: "flex" }}>


      <AppBar

        position="fixed"

        sx={{
          width: "100%",
          transition: "0.3s",
          background: "linear-gradient(135deg, #075d7e 30%, #106477 60%, #096381 100%)"
        }}

      >

        <Toolbar>


              <IconButton
            color="inherit"
            edge="start"
            onClick={() => {
              setDrawerOpen(!drawerOpen);
            }}
            sx={{
              mr: 2,
              border: "1px solid white",
              borderRadius: "50%",
            }}
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>



          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              fontWeight: 600,
              fontSize: '1.2rem',
              borderleft: "1px solid white",
            }}
          >

            Welcome to Algosaathi

          </Box>

          <ThemeToggle/>

          <Tooltip title="Logout">
            <IconButton
              color="inherit"
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              <LogoutIcon />
            </IconButton>
          </Tooltip>

        </Toolbar>


      </AppBar>


      <Sidebar
        open={drawerOpen}
        handleDrawerToggle={() => setDrawerOpen(false)}
      />


      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: "0.3s"
        }}

      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>

  )

}


export default DashboardLayout;