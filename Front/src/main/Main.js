import React, { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import AdbIcon from "@mui/icons-material/Adb";

import Login from "./Login";
import Signup from "./Signup";

export default function Main() {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles = Array.from({ length: 30 }, (_, i) => {
        const size = Math.random() * 50 + 10;
        const speed = Math.random() * 0.8 + 0.3;
        const delay = Math.random() * 500;
        const xPos = Math.random() * window.innerWidth;
        const yPos = Math.random() * window.innerHeight;
        const color = getRandomColor();
        return {
          size,
          speed,
          delay,
          xPos,
          yPos,
          color,
        };
      });
      setBubbles(newBubbles);
    };

    generateBubbles();
  }, []);

  const getRandomColor = () => {
    const colors = ["#61dafb", "#ff7e67", "#a9e200", "#ff1e56", "#63b132"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {bubbles.map((bubble, index) => (
        <Bubble key={index} {...bubble} />
      ))}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            width: "300px",
            height: "200px",
          }}
        >
          <Login />
          <Signup />
        </div>
      </div>
    </div>
  );
}

function Bubble({ size, speed, delay, xPos, yPos, color }) {
  const props = useSpring({
    from: { opacity: 0, transform: `translateY(-100vh) scale(0)` },
    to: async (next, cancel) => {
      while (true) {
        await next({ opacity: 1, transform: `translateY(0) scale(1)` });
        await next({ transform: `translateY(100vh) scale(0)` });
      }
    },
    delay,
    config: { duration: 10000 * speed },
  });

  return (
    <animated.div
      style={{
        ...props,
        position: "absolute",
        top: yPos,
        left: xPos,
      }}
    >
      <AdbIcon
        style={{
          width: size,
          height: size,
          color: color,
        }}
      />
    </animated.div>
  );
}
