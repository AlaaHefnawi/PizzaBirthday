import React, { useState, useEffect } from 'react';import './Cake.css';
import cakeImg from '../assets/cake.png';
import Lottie from 'lottie-react';
import balloons from '../assets/balloons.json';


const Flame = ({ x, y = 0, sway, blown }) => (
  <div
    className={`flame-overlay ${sway ? 'sway' : ''} ${blown ? 'out' : ''}`}
    style={{ left: `${x}%`, top: `${y}%` }}
  >
    <div className="flame" />
  </div>
);

const balloonVariants = [
  { top: '5%', left: '20%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(0deg)' },
  { top: '15%', right: '10%', width: 200, height: 200, opacity: 0.7, filter: 'hue-rotate(90deg) saturate(130%)' },
  { bottom: '10%', left: '5%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(40deg) saturate(50%) brightness(120%)' },
  { bottom: '15%', right: '10%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(270deg) saturate(110%)' },
  { top: '35%', right: '20%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(30deg)' },
  { bottom: '50%', left: '1%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(300deg) saturate(150%)' },
  { bottom: '35%', left: '16%', width: 150, height: 200, opacity: 0.7, filter: 'hue-rotate(120deg) saturate(120%)' },
  { bottom: '40%', right: '5%', width: 100, height: 120, opacity: 0.7, filter: 'hue-rotate(0deg)' },

];

const Cake = ({ sway, blown }) => {
  const [balloonsFlying, setBalloonsFlying] = useState(false);

   useEffect(() => {
    if (blown) {
      setBalloonsFlying(true);
      // Hide balloons after animation duration (3s)
      const timer = setTimeout(() => {
        setBalloonsFlying(false);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setBalloonsFlying(false);
    }
  }, [blown]);


const flamePositions = [
  { x: 29, y: 23 },
  { x: 39, y: 20 },
  { x: 49, y: 16 },
  { x: 56, y: 21 },
  { x: 65, y: 20 },
  { x: 74, y: 23 }
];
  return (
    <>
{/* Balloons container */}
      {!blown || balloonsFlying ? (
        balloonVariants.map((style, i) => (
          <Lottie
            key={i}
            animationData={balloons}
            loop
            autoplay
            className={blown ? 'balloon-fly' : ''}
  style={{
    position: 'fixed',
    zIndex: 0,
    pointerEvents: 'none',
    ...style,
            }}
          />
        ))
      ) : null}

    <div className="container">
     
      
    <div className="cake-container">
      <div className='hbd'>
      <h2>Happy Birthday Babe!</h2>
      <br/>
            <h3>Make a wish and blow... hard </h3>
            </div>
      <div className="cake-wrapper">
        <img src={cakeImg} alt="Birthday Cake" className="cake-image" />
        {flamePositions.map((pos, i) => (
  <Flame key={i} x={pos.x} y={pos.y} sway={sway} blown={blown} />

        ))}
      </div>


    </div>
    </div>
    </>
  );
};

export default Cake;
