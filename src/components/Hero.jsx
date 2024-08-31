import React, { useEffect, useState } from 'react';
import Chatbot from './Chatbot';

export default function AnimatedText() {
  const [displayedText, setDisplayedText] = useState('');
  const text = "Where Compassion Meets Technology";
  const words = text.split(' ');

  useEffect(() => {
    let wordIndex = 0;
    const interval = setInterval(() => {
      if (wordIndex < words.length) {
        setDisplayedText((prev) => {
          return prev ? `${prev} ${words[wordIndex++]}` : words[wordIndex++];
        });

      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='text-4xl h-screen text-white flex flex-col gap-4 justify-center items-center  w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4 mb-10 rounded-lg'>
      <div>{displayedText}</div>
      <Chatbot/>
    </div>
  );
}

