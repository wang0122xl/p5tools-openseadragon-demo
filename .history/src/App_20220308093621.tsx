/*
 * @Date: 2022-03-08 09:24:16
 * @Author: wang0122xl@163.com
 * @LastEditors: wang0122xl@163.com
 * @LastEditTime: 2022-03-08 09:36:21
 * @Description: file content
 */
import { useRef, useState } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {
    const domeEl = useRef<HTMLDivElement>(null!)

    return (
        <div>
        <div className="h-100vh w-full z-1" ref={domeEl} />
        {/* {
            innerData.controlPanelVisible && createPortal(
                <ControlPanel />,
                document.body
            )
        } */}
    </div>
    )
}

export default App
