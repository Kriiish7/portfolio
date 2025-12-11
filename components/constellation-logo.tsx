"use client"

interface ConstellationLogoProps {
    className?: string
    size?: number
}

export function ConstellationLogo({ className, size = 40 }: ConstellationLogoProps) {
    // Node positions forming an S shape matching the reference
    const nodes = [
        // Top curve of S (right to left)
        { x: 28, y: 4, r: 2.5 }, // 0: top-right small
        { x: 18, y: 2, r: 2 }, // 1: top-center small
        { x: 8, y: 6, r: 3 }, // 2: top-left medium

        // Upper left edge
        { x: 4, y: 16, r: 3.5 }, // 3: left side upper, medium-large

        // Middle crossing section
        { x: 20, y: 12, r: 2 }, // 4: upper-right connecting small
        { x: 12, y: 24, r: 3 }, // 5: center-left node (waist of S)
        { x: 26, y: 22, r: 3 }, // 6: center-right node

        // Lower section
        { x: 4, y: 38, r: 4 }, // 7: bottom-left large
        { x: 16, y: 42, r: 3.5 }, // 8: bottom-center medium
        { x: 30, y: 32, r: 3 }, // 9: right-lower medium
    ]

    const connections = [
        // Top curve
        [0, 1],
        [1, 2],
        // Top to left side
        [2, 3],
        [2, 4],
        // Upper cross connections
        [0, 4],
        [1, 4],
        // Middle section - forming the diagonal cross
        [3, 5],
        [4, 5],
        [4, 6],
        [5, 6],
        // Lower section connections
        [5, 7],
        [5, 8],
        [5, 9],
        [6, 9],
        // Bottom curve
        [7, 8],
        [8, 9],
        // Cross mesh connections
        [3, 8],
        [6, 8],
    ]

    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 34 46"
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
                    className="stroke-primary"
                    strokeWidth="1"
                    strokeLinecap="round"
                />
            ))}

            {/* Nodes */}
            {nodes.map((node, i) => (
                <circle key={`node-${i}`} cx={node.x} cy={node.y} r={node.r} className="fill-primary" />
            ))}
        </svg>
    )
}
