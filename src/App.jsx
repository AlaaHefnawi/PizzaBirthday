// App.js
import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import './components/Cake.css';
import Cake from './components/Cake';
import useBlowDetection from './components/useBlowDetection';
import confetti from 'canvas-confetti';
import Popup from './components/popup';
import Countdown from './components/Countdown';
import { DateTime } from 'luxon';

const cards = [
  { roast: "I love your brain, even though you overwork the poor thing.", compliment: "" },
  { roast: "You give great advice.. Then ignore your own (and mine) like the idiot you are.", compliment: "" },
  { roast: "You live stupidly far away, yet still feel like the closest person I have.", compliment: "" },
  { roast: "You're always there for me, even when you have 0% battery mentally or emotionally.", compliment: "" },
  { roast: "You're stubborn as hell and a pain in my ass, but I wouldn't have you any other way.", compliment: "" },
  { roast: "You listen and don’t judge. Even when I probably deserve it.", compliment: "" },
  { roast: "You make life less awful, and I'll always be grateful for you", compliment: "" },
];

function CakeWithBlowDetection({ cards, audioRef }) {
  const [blown, setBlown] = useState(false);
  const [weakBlow, setWeakBlow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useBlowDetection((strength) => {
    if (strength === 'strong') {
      setBlown(true);
      confetti();
      if (audioRef.current) {
        audioRef.current.play();
        audioRef.current.onended = () => {
          setTimeout(() => {
            setShowPopup(true);
          }, 2500);
        };
      }
      setWeakBlow(false);
    } else if (strength === 'weak' && !blown) {
      setWeakBlow(true);
      setTimeout(() => setWeakBlow(false), 1000);
    }
  });



  return (
    <>
      <Cake blown={blown} sway={weakBlow && !blown} />
      {showPopup && <Popup cards={cards} onClose={() => setShowPopup(false)} />}
    </>
  );
}


function App() {
  const [showCake, setShowCake] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('/Happy-birthday-bitch.mp3');
  }, []);

const target = new Date(Date.UTC(2025, 7, 3, 4, 0, 0));

  return (
    <>
      {!showCake ? (
        <Countdown
          targetDate={target}
          onComplete={() => setShowCake(true)}
          onSkip={() => setShowCake(true)}
        />
      ) : (
        <CakeWithBlowDetection cards={cards} audioRef={audioRef} />
      )}
    </>
  );
}

export default App;
