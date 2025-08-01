import React, { useState, useRef } from 'react';
import './Popup.css';
import { Typewriter } from 'react-simple-typewriter';

const Popup = ({ cards, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  const handleNext = () => {
    if (showFinalMessage) return;

    

    setFlip(true);
    setTimeout(() => {
      setFlip(false);
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      } else {
        setShowFinalMessage(true); // Show final message instead of closing
      }
    }, 400);
  };

  const { roast, compliment } = cards[currentIndex] || {};
  const message = 
`27!! You're getting olddd... jk jk.
10 years since I met you, and I still don’t have the words to explain how much you mean to me.
You’ve been my anchor through the mess, the miles, and all the things I couldn’t put into words.
I hope you get every single thing you want in life.
Hopefully next year, I get to celebrate you in person...
Here's to a lifetime of us (you're obviously not getting rid of me... deal with it).

I love you so damn much ♡ `;

  return (
    <div className="popup-overlay">
      <div className="popup">
        {!showFinalMessage && (
          <>
            <h2 className="popup-title">
              Why You’re the Best
              <div className="subtitle">(According to Me, Which Is What Matters)</div>
            </h2>
            <div className={`card ${flip ? 'flip' : ''}`}>
              <p className="roast">{roast}</p>
              <p className="compliment">{compliment}</p>
            </div>
          </>
        )}

        {showFinalMessage && (
          <div className="final-message">
            <pre className="typed-text">
              <Typewriter
                words={[message]}
                typeSpeed={20}
                deleteSpeed={9999999}  // Essentially never deletes
                cursor={false}
                loop={false}
              />
            </pre>
          </div>
        )}

        {!showFinalMessage ? (
          <button className="next-btn" onClick={handleNext}>
            {currentIndex === cards.length - 1
              ? 'Last thing I swear'
              : 'Next'}
          </button>
        ) : (
          <button className="next-btn close-btn" onClick={onClose}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;
