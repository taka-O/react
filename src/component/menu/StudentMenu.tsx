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
import FactCheckIcon from '@mui/icons-material/FactCheck';

const StudentMenu: React.FC = () => {
  const { logout } = useAuth();

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
              <ListItemButton component="a" href="/instructor/course">
                  <ListItemIcon>
                  <FactCheckIcon />
                  </ListItemIcon>
                  <ListItemText primary="Course">
                  </ListItemText>
              </ListItemButton>
              <ListItemButton onClick={logout}>
                  <ListItemIcon>
                  <Logout />
                  </ListItemIcon>
                  <ListItemText primary="Logout">
                  </ListItemText>
              </ListItemButton>
          </List>
      </>
  );
};

export default StudentMenu;
