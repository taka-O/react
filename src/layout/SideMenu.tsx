import React, { useEffect, useState } from 'react';
import { useAuth } from "../AuthContext";
import type { User } from "../types";
import { post } from "../component/api/Service";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} 
from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import Logout from "@mui/icons-material/Logout";

const SideMenu: React.FC = () => {
    const { logout, token, getUser } = useAuth();
    const [user, setUser] = useState<User | null>(getUser());

    useEffect(() => {
        (async() => {
            if (user == null) {
                try {
                    const response = await post('/api/auth/current', {}, token);

                    if (response.ok) {
                        const data: User = await response.json();
                        setUser(data);
                    }
                } catch(err: any) {
                    logout();
                }
            };
        })()
    }, []);

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
                <ListItemButton component="a" href="/admin/user">
                    <ListItemIcon>
                    <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText primary="User">
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
export default SideMenu;
