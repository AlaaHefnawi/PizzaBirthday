import { useEffect, useRef } from 'react';

const useBlowDetection = (onBlow) => {
  const blownRef = useRef(false);
  const blowStartTime = useRef(null);

  useEffect(() => {
    let audioContext;
    let mic;
    let analyser;
    let dataArray;

    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        mic = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024;
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        mic.connect(analyser);

        const detect = () => {
          analyser.getByteFrequencyData(dataArray);

          // Blow freq range ~2kHz to 6kHz → index 80 to 180 in 1024 FFT
          const blowFreqData = dataArray.slice(80, 180);
          const avg = blowFreqData.reduce((sum, val) => sum + val, 0) / blowFreqData.length;

          const now = Date.now();

          // Detect sustained high energy
          if (avg > 55) {
            if (!blowStartTime.current) {
              blowStartTime.current = now;
            }

            const duration = now - blowStartTime.current;

            if (duration > 300 && !blownRef.current) {
              blownRef.current = true;
              onBlow('strong');
            }
          } else {
            blowStartTime.current = null;
          }

          requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error('Mic access denied:', err);
      }
    };

    startListening();

    return () => {
      if (audioContext) audioContext.close();
    };
  }, [onBlow]);
};

export default useBlowDetection;




/*import { useEffect, useRef } from 'react';

const useBlowDetection = (onBlow) => {
  const blownRef = useRef(false);
  const lastBlowTime = useRef(0);
  const blowDuration = useRef(0);

  useEffect(() => {
    let audioContext;
    let mic;
    let analyser;
    let dataArray;

    const startListening = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        mic = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        mic.connect(analyser);
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const detect = () => {
          analyser.getByteFrequencyData(dataArray);

          // Medium-high freq range (bins 10 to 30)
          const freqSlice = dataArray.slice(10, 30);
          const avgFreqEnergy = freqSlice.reduce((a, b) => a + b, 0) / freqSlice.length;

          const now = Date.now();

          if (avgFreqEnergy > 40 && !blownRef.current) {
            blowDuration.current += 16; // approx frame time ms
          } else {
            blowDuration.current = 0;
          }

          // Weak blow detected: moderate freq energy but not enough duration
          if (avgFreqEnergy > 70 && avgFreqEnergy <= 110) {
            onBlow('weak');
          }

          // Strong blow: steady for 200ms and high energy
          if (
            blowDuration.current > 700 &&
            avgFreqEnergy > 120 &&
            now - lastBlowTime.current > 2000
          ) {
            blownRef.current = true;
            lastBlowTime.current = now;
            onBlow('strong');
          }

          requestAnimationFrame(detect);
        };

        detect();
      } catch (err) {
        console.error('Mic access denied:', err);
      }
    };

    startListening();

    return () => audioContext && audioContext.close();
  }, [onBlow]);
};

export default useBlowDetection;
*/