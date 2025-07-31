import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import type { User } from "../types";
import { post } from "./api/Service";
import AdminMenu from "./menu/AdminMenu";
import InstructorMenu from "./menu/InstructorMenu";
import StudentMenu from "./menu/StudentMenu";

const RoleBasedComponentMenu: React.FC = () => {
  const { token, getUser } = useAuth();
  const [user, setUser] = useState<User | null>(getUser());

  const isAdmin = (): boolean => {
    if (user == null) return false;

    return (user.role.toUpperCase() === 'ADMIN') ? true : false
  };

  const isInstructor = (): boolean => {
    if (user == null) return false;

    return (user.role.toUpperCase() === 'INSTRUCTOR') ? true : false
  };

  async function fetchData() {
    try {
      const response = await post('/api/auth/current', {}, token);

      if (response.ok) {
          const data: User = await response.json();
          setUser(data);
      }
    } catch(err) {
    }
  }

  useEffect(() => {
    if (user == null) fetchData();
  }, []);

  return isAdmin() ? <><AdminMenu /></> : isInstructor() ? <><InstructorMenu /></> : <><StudentMenu /></>;
};

export default RoleBasedComponentMenu;
