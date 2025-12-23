import { useEffect } from 'react'
import './App.css'
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

  const confettiOptions = {
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
    shapes: ["square", "circle", "star", "heart", "spades", "dimonds"],
    scalar: 1,
    zIndex: 100,
    disableForReducedMotion: true
  };

  const confettiClickOptions = { ...confettiOptions }

  const handleFunction = (event: MouseEvent) => {
    const xScaled = (event.clientX / window.innerWidth) * 100;
    const yScaled = (event.clientY / window.innerHeight) * 100;
    confettiClickOptions.position = { x: xScaled, y: yScaled };
    confettiClickOptions.colors.push(generaColoreEsadecimale());
    (async () => {
      await confetti("tsparticles", confettiClickOptions);
    })();
  };

  useEffect(() => {
    document.body.onclick = (event) => handleFunction(event);
    setInterval(() => (async () => {
      confettiOptions.colors.push(generaColoreEsadecimale(), generaColoreEsadecimale());
      await confetti("tsparticles", confettiOptions);
    })(), 2000);
  }, []);

  
  return (
    <div className="App">
      <h1>Happy Holidays Frodo</h1>
      <h2>Some of magics will happen!</h2>
    </div>
  )
}

export default App
