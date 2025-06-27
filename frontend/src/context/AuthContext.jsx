import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    try {
      if (token) {
        const decodedUser = jwtDecode(token);
        const isExpired = decodedUser.exp * 1000 < Date.now();
        if (isExpired) {
          logout();
        } else {
          setUser(decodedUser);
        }
      }
    } catch (error) {
      console.error("Invalid token found", error);
      logout();
    }
  }, [token]);

  const login = async (username, password) => {
    // --- KODE DEBUGGING DIMULAI DI SINI ---
    console.log("Fungsi login di dalam AuthContext DIPANGGIL.");
    console.log("Mencoba login dengan username:", username);
    // ------------------------------------

    try {
      console.log("Mencoba melakukan FETCH ke server...");
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      console.log("FETCH selesai. Respons dari server:", response.status);

      if (!response.ok) {
        throw new Error('Login gagal. Cek kembali username dan password.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);

    } catch (error) {
      console.error("TERJADI ERROR DI DALAM FUNGSI LOGIN:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};