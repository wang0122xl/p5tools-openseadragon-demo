/*
 * @Date: 2022-03-08 09:24:16
 * @Author: wang0122xl@163.com
 * @LastEditors: wang0122xl@163.com
 * @LastEditTime: 2022-03-08 10:18:54
 * @Description: file content
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import OpenSeadragon, { TileSource } from 'openseadragon'
import './App.css'
import { createPortal } from 'react-dom'
import Pannel from './components/pannel'
import P5ToolsManager from 'p5tools'
import P5 from 'p5'



function App() {
    const domEl = useRef<HTMLDivElement>(null!)
    const [pannelVisible, setPannelVisible] = useState(true)
    const [viewer, setViewer] = useState<OpenSeadragon.Viewer>()
    const [toolsManager] = useState<P5ToolsManager>(() => {
        const textTool = new P5ToolsManager.TextTool()
        const circleTool = new P5ToolsManager.CircleTool()
        const squareTool = new P5ToolsManager.SquareTool()
        const lineTool = new P5ToolsManager.LineTool()
        const freehandTool = new P5ToolsManager.FreehandTool()
        const arrowLineTool = new P5ToolsManager.ArrowLineTool()
        const cropTool = new P5ToolsManager.CropTool()
        const manager = new P5ToolsManager()
        manager
            .useTool(textTool)
            .useTool(circleTool)
            .useTool(squareTool)
            .useTool(lineTool)
            .useTool(freehandTool)
            .useTool(arrowLineTool)
            .useTool(cropTool)
        return manager
    })
    const [sk, setSK] = useState<P5>()

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
    const initP5 = useCallback(() => {
        toolsManager.hasEnabledToolCallback = has => {
            if (has) {
                viewer?.setMouseNavEnabled(false)
            } else {
                viewer?.setMouseNavEnabled(true)
            }
        }
    }, [viewer, toolsManager])

    useEffect(() => {
        let viewer: OpenSeadragon.Viewer
        if (domEl.current) {
            viewer = initSeadragon(domEl.current)
            setViewer(viewer)
        }
        return () => {
            viewer.destroy()
        }
    }, [])

    useEffect(() => {

    }, [initP5, ])

    return (
        <div>
            <div className="h-100vh w-full z-1" ref={domEl} />
            {
                pannelVisible && createPortal(
                    <Pannel manager={toolsManager} sk={sk} />,
                    document.body
                )
            }
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