import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001,
    proxy: {
     "/api": {
       target: "http://rails:3000/", // rails api 接続用
       //target: "http://nginx/", // Larabel api 接続用
       //target: "http://spring:8080/", // spring-boot api 接続用
       changeOrigin: true
     }
    }
  },
})
