import { useEffect, useState } from 'react';
import './App.css';
import { confetti } from "tsparticles-confetti";

const generaColoreEsadecimale = (): string => {
  const lettere = '0123456789ABCDEF';
  let colore = '#';
  for (let i = 0; i < 6; i++) {
    colore += lettere[Math.floor(Math.random() * 16)];
  }
  return colore;
}

function App() {
  const [confettiOptions] = useState({
    angle: 90,
    count: 500,
    position: {
      x: 50,
      y: 50
    },
    spread: 45,
    startVelocity: 45,
    decay: 0.9,
    gravity: 1,
    drift: 0,
    ticks: 200,
    colors: ["#ffffff"],
    shapes: ["square", "circle", "star", "heart", "spades", "diamonds"],
    scalar: 1,
    zIndex: 100,
    disableForReducedMotion: true
  });

  const [confettiClickOptions, setConfettiClickOptions] = useState(confettiOptions);

  const handleFunction = (event: MouseEvent) => {
    const opt = { ...confettiClickOptions };
    const xScaled = (event.clientX / window.innerWidth) * 100;
    const yScaled = (event.clientY / window.innerHeight) * 100;
    opt.position = { x: xScaled, y: yScaled };
    opt.colors.push(generaColoreEsadecimale());
    setConfettiClickOptions(opt);
    confetti("tsparticles", opt);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => handleFunction(event);
    document.body.addEventListener("click", handleClick);

    const timeout = setInterval(() => {
      const optCopy = { ...confettiOptions };
      optCopy.colors.push(generaColoreEsadecimale(), generaColoreEsadecimale());
      confetti("tsparticles", optCopy);
    }, 1000);

    return () => {
      clearInterval(timeout);
      document.body.removeEventListener("click", handleClick);
    };
  }, [confettiOptions]);
  
  return (
    <div className="App">
      <div className="background-text">Frodo</div>
      <h1>Happy Holidays Gianni!</h1>
      <h2>!Bro, something magical will happen!</h2>
    </div>
  );
}

export default App;
