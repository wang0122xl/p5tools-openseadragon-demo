/*
 * @Date: 2022-03-08 09:24:16
 * @Author: wang0122xl@163.com
 * @LastEditors: wang0122xl@163.com
 * @LastEditTime: 2022-03-08 09:38:32
 * @Description: file content
 */
import { useEffect, useRef, useState } from 'react'
import OpenSeadragon, { TileSource } from 'openseadragon'
import './App.css'

function App() {
    const domEl = useRef<HTMLDivElement>(null!)
    const [pannelVisible, setPannelVisible] = useState(false)

    const tileSource = useRef<any>(new TileSource({
        width: 7026,
        height: 9221,
        tileSize: 256,
        tileOverlap: 2,
        getTileUrl(level, x, y) {
            return `//openseadragon.github.io//example-images/highsmith/highsmith_files/${level}/${x}_${y}.jpg`
        }
    }))

    const initSeadragon = (ele: HTMLDivElement) => {
        const viewer = OpenSeadragon({
            element: ele,
            crossOriginPolicy: 'Anonymous',
            // 不显示基础导航按钮
            showNavigationControl: false,
            // 显示小地图
            showNavigator: true,
            navigatorAutoFade: false,
            // 小地图自动缩放,关闭以提高性能
            navigatorAutoResize: false,
            navigatorHeight: 100,
            navigatorWidth: 200,
            navigatorPosition: 'TOP_LEFT',
            // 禁止鼠标双击放大缩小
            gestureSettingsMouse: {
                dblClickToZoom: false,
                clickToZoom: false
            }
        })
        viewer.addHandler('full-screen', (event) => {
            setPannelVisible(!event.fullScreen)
        })
        viewer.open(tileSource.current)
        return viewer
    }

    useEffect(() => {
        let viewer: OpenSeadragon.Viewer
        if (domEl.current) {
            viewer = initSeadragon(domEl.current)
            // initToolManager(viewer)
        }
        return () => {
            viewer.destroy()
        }
    }, [])

    return (
        <div>
        <div className="h-100vh w-full z-1" ref={domEl} />
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
