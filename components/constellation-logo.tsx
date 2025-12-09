"use client"

import { useEffect, useState } from "react"

interface ConstellationLogoProps {
    className?: string
    size?: number
}

export function ConstellationLogo({ className, size = 32 }: ConstellationLogoProps) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    // S-shaped constellation nodes (x, y coordinates)
    const nodes = [
        // Top curve of S
        { x: 28, y: 6 },
        { x: 20, y: 4 },
        { x: 12, y: 6 },
        { x: 8, y: 12 },
        // Middle section
        { x: 12, y: 18 },
        { x: 20, y: 22 },
        { x: 28, y: 26 },
        // Bottom curve of S
        { x: 32, y: 32 },
        { x: 28, y: 38 },
        { x: 20, y: 42 },
        { x: 12, y: 40 },
        { x: 6, y: 36 },
    ]

    // Connections between nodes (index pairs)
    const connections = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 8],
        [8, 9],
        [9, 10],
        [10, 11],
        // Cross connections for constellation effect
        [0, 2],
        [1, 3],
        [4, 6],
        [5, 7],
        [8, 10],
        [9, 11],
    ]

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 40 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Connection lines */}
            {connections.map(([from, to], i) => (
                <line
                    key={`line-${i}`}
                    x1={nodes[from].x}
                    y1={nodes[from].y}
                    x2={nodes[to].x}
                    y2={nodes[to].y}
                    className="stroke-primary/40"
                    strokeWidth="1"
                    strokeLinecap="round"
                >
                    {mounted && (
                        <animate
                            attributeName="stroke-opacity"
                            values="0.2;0.6;0.2"
                            dur={`${2 + (i % 3) * 0.5}s`}
                            repeatCount="indefinite"
                        />
                    )}
                </line>
            ))}

            {/* Main nodes */}
            {nodes.map((node, i) => (
                <g key={`node-${i}`}>
                    {/* Glow effect */}
                    <circle cx={node.x} cy={node.y} r="4" className="fill-primary/20">
                        {mounted && (
                            <animate attributeName="r" values="3;5;3" dur={`${1.5 + (i % 4) * 0.3}s`} repeatCount="indefinite" />
                        )}
                    </circle>
                    {/* Core node */}
                    <circle cx={node.x} cy={node.y} r="2" className="fill-primary">
                        {mounted && (
                            <animate
                                attributeName="opacity"
                                values="0.7;1;0.7"
                                dur={`${1.5 + (i % 4) * 0.3}s`}
                                repeatCount="indefinite"
                            />
                        )}
                    </circle>
                </g>
            ))}
        </svg>
    )
}
