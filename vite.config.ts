/*
 * @Date: 2022-03-08 09:24:16
 * @Author: wang0122xl@163.com
 * @LastEditors: wang0122xl@163.com
 * @LastEditTime: 2022-03-10 22:08:36
 * @Description: file content
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import WindiCSS from 'vite-plugin-windicss'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/p5tools-openseadragon-demo/',
    server: {
        host: '0.0.0.0',
        port: 3020
    },
    build: {
        sourcemap: true
    },
    plugins: [react(), WindiCSS()]
})
