import React from 'react';
import { useAuth } from '../../AuthContext';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} 
from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logout from "@mui/icons-material/Logout";

const AdminMenu: React.FC = () => {
  const { logout, token } = useAuth();

  return (
      <>
          <List component="nav">
              <ListItemButton component="a" href="/">
                  <ListItemIcon>
                  <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Home">
                  </ListItemText>
              </ListItemButton>
              {token &&
              <ListItemButton onClick={logout}>
                  <ListItemIcon>
                  <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout">
                  </ListItemText>
              </ListItemButton>
              }
          </List>
      </>
  );
};

export default AdminMenu;
