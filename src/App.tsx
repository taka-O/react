import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from './AuthContext';
import Layout from "./layout/Layout";
import Home from './pages/Home';
import Login from './auth/Login';
import AdminUserSearch from './pages/admin/user/Search';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/admin/user" element={<AdminUserSearch />} />
              <Route path="*" element={<h1>Not Found Page</h1>} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
