import React, { useRef, useEffect, useState } from "react";
import { 
  Box,
  BoxProps,
  useDimensions
} from "@chakra-ui/react"

type ProgressCircleProps = BoxProps & {
  size: BoxProps["height"],
  lines: number,
  completeColor?: BoxProps["bg"]
  incompleteColor?: BoxProps["bg"]
  progress: number,
  children?: React.ReactNode
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  size,
  lines,
  completeColor = "brandPurple.700",
  incompleteColor = "brandGray.400",
  progress,
  children,
  ...other
}) => {
  const lineArray = new Array(lines).fill(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [diameter, setDiameter] = useState(0);
  const dims = useDimensions(containerRef);

  useEffect(() => {
    if (dims) {
      setDiameter(dims.borderBox.height);
    }
  }, [dims])

  
  return (
    <Box
      ref={containerRef}
      height={size}
      width={size}
      pos="relative"
      m={"10px"}
      {...other}
    >
      {
        diameter !== 0 && lineArray.map((_, idx) => {
          const radius = diameter / 2;
          const centerX = radius;
          const centerY = radius;
          const angle = ((360 / lines) * idx) - 90;
          const x = centerX + radius * Math.cos(angle * Math.PI / 180);
          const y = centerY + radius * Math.sin(angle * Math.PI / 180);
          const progressIdx = Math.floor((lines - 1) * progress);
          const bg = idx <= progressIdx ? completeColor : incompleteColor;
          return (
            <Box
              pos="absolute"
              zIndex={1}
              top={y + "px"}
              left={x + "px"}
              height="20px"
              width="4px"
              bg={bg}
              opacity="0.75"
              transform={`translate(-50%, -50%) rotate(${angle + 90}deg)`}
            />
          )
        })
      }
      <Box 
        pos="absolute"
        top="50%"
        left='50%'
        transform={"translate(-50%, -50%)"}
        zIndex={2}
      >
        {children}
      </Box>
    </Box>
  )
}

export default ProgressCircle;