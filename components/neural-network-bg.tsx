"use client"

import { useEffect, useRef } from "react"

interface Node {
    x: number
    y: number
    vx: number
    vy: number
}

export function NeuralNetworkBg() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        let animationId: number
        let nodes: Node[] = []
        const nodeCount = 100
        const connectionDistance = 150
        const mouseRadius = 200

        const mouse = { x: 0, y: 0 }

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
            initNodes()
        }

        const initNodes = () => {
            nodes = []
            for (let i = 0; i < nodeCount; i++) {
                nodes.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                })
            }
        }

        const getNodeColor = () => {
            const isDark = document.documentElement.classList.contains("dark")
            return isDark ? "56, 189, 248" : "14, 116, 144"
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            const nodeColor = getNodeColor()

            // Update and draw nodes
            nodes.forEach((node, i) => {
                node.x += node.vx
                node.y += node.vy

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1

                // Draw connections
                nodes.forEach((otherNode, j) => {
                    if (i === j) return
                    const dx = node.x - otherNode.x
                    const dy = node.y - otherNode.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < connectionDistance) {
                        const opacity = (1 - distance / connectionDistance) * 0.2
                        ctx.beginPath()
                        ctx.strokeStyle = `rgba(${nodeColor}, ${opacity})`
                        ctx.lineWidth = 1
                        ctx.moveTo(node.x, node.y)
                        ctx.lineTo(otherNode.x, otherNode.y)
                        ctx.stroke()
                    }
                })

                // Mouse interaction
                const dx = mouse.x - node.x
                const dy = mouse.y - node.y
                const distance = Math.sqrt(dx * dx + dy * dy)
                if (distance < mouseRadius) {
                    const opacity = (1 - distance / mouseRadius) * 0.4
                    ctx.beginPath()
                    ctx.strokeStyle = `rgba(${nodeColor}, ${opacity})`
                    ctx.lineWidth = 1.5
                    ctx.moveTo(node.x, node.y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.stroke()
                }

                // Draw node
                ctx.beginPath()
                ctx.fillStyle = `rgba(${nodeColor}, 0.7)`
                ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2)
                ctx.fill()
            })

            animationId = requestAnimationFrame(animate)
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", resize)
        window.addEventListener("mousemove", handleMouseMove)
        resize()
        animate()

        return () => {
            window.removeEventListener("resize", resize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationId)
        }
    }, [])

    return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none opacity-60" style={{ zIndex: 1 }} />
}
