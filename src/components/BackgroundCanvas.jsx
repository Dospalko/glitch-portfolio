import React, { useRef, useEffect } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let animationFrameId;
    let gridSpacing = 30; // Vzdialenosť medzi bodmi v sieti
    let dotSize = 1; // Veľkosť bodov
    let glitchIntensity = 0; // Určuje intenzitu glitch efektu
    let glitchTimer = 0; // Časovač pre glitch efekt
    let glitchDuration = 0; // Dĺžka trvania aktuálneho glitchu

    // Načítanie farieb z CSS premenných, s fallback hodnotami
    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue('--color-text-secondary').trim() || '#b0b0b0';
    const accentColor = style.getPropertyValue('--color-accent-glitch').trim() || '#00FFFF';
    const backgroundColor = style.getPropertyValue('--color-background').trim() || '#050505';

    // Debounce handler pre zmenu veľkosti okna
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        drawGrid(); // Prekreslenie po zmene veľkosti
      }, 150);
    };

    // Nastavenie počiatočnej veľkosti plátna
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', handleResize);

    // Funkcia na prekreslenie siete a glitch efektov
    const drawGrid = () => {
      // Vyčistenie plátna a nastavenie pozadia
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Nastavenie vlastností pre vykresľovanie bodov
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.4;

      // Určenie, či má byť aktivovaný glitch efekt
      let isGlitching = false;
      if (glitchTimer <= 0 && Math.random() < 0.012) { // Zvýšená pravdepodobnosť pre glitch
        glitchDuration = Math.random() * 15 + 5; // Glitch trvá 5-20 snímok
        glitchTimer = glitchDuration;
        glitchIntensity = Math.random() * 0.6 + 0.2; // Intenzita glitch efektu
      }
      if (glitchTimer > 0) {
        isGlitching = true;
        glitchTimer--;
        if (glitchTimer <= 0) {
          glitchIntensity = 0; // Reset intenzity po ukončení glitchu
        }
      }

      // Vykreslenie vertikálnych bodov siete s glitch efektom
      for (let x = 0; x <= canvas.width; x += gridSpacing) {
        let currentX = x;
        let currentAlpha = 0.4;
        let currentColor = primaryColor;

        // Náhodné posunutie a zmena farby v prípade glitch efektu
        if (isGlitching && Math.random() < glitchIntensity * 0.5) {
          currentX += (Math.random() - 0.5) * 10 * glitchIntensity; // Horizontálne posunutie
          currentAlpha = 0.1 + Math.random() * 0.6 * glitchIntensity;
          if (Math.random() < glitchIntensity * 0.3) {
            currentColor = accentColor;
            currentAlpha = 0.5 + Math.random() * 0.5;
          }
        }
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = currentColor;
        for (let y = 0; y <= canvas.height; y += gridSpacing) {
          let currentY = y;
          if (isGlitching && Math.random() < glitchIntensity * 0.3) {
            currentY += (Math.random() - 0.5) * 8 * glitchIntensity; // Vertikálne posunutie
          }
          ctx.beginPath();
          ctx.arc(currentX, currentY, dotSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Dodatočné glitch efekty: posunuté horizontálne "slices" a náhodné oblasťky
      if (isGlitching) {
        // Glitch - posun horizontálnych "slice" častí obrazu
        const numSlices = Math.floor(Math.random() * 3) + 1; // 1 až 3 slices
        for (let i = 0; i < numSlices; i++) {
          const sliceHeight = Math.random() * 30 + 10; // Výška slice (10 až 40px)
          const y = Math.floor(Math.random() * canvas.height);
          const offset = Math.floor((Math.random() - 0.5) * 40 * glitchIntensity); // Náhodný horizontálny posun
          try {
            const slice = ctx.getImageData(0, y, canvas.width, sliceHeight);
            ctx.putImageData(slice, offset, y);
          } catch (err) {
            console.error('Glitch slice error: ', err);
          }
        }
        // Glitch - vykreslenie náhodných farebných oblasťok s accent farbou
        const numRects = Math.floor(Math.random() * 2);
        for (let i = 0; i < numRects; i++) {
          const rectWidth = Math.random() * canvas.width * 0.5;
          const rectHeight = Math.random() * 20 + 5;
          const rectX = Math.random() * canvas.width;
          const rectY = Math.random() * canvas.height;
          ctx.fillStyle = accentColor;
          ctx.globalAlpha = 0.3 + Math.random() * 0.5;
          ctx.fillRect(rectX, rectY, rectWidth, rectHeight);
        }
        ctx.globalAlpha = 1; // Reset globálnej priehľadnosti
      }
    };

    // Animácia pomocou requestAnimationFrame
    const render = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Vyčistenie zdrojov pri odmontovaní komponentu
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10, // Umiestnenie za ostatný obsah
        pointerEvents: 'none', // Ignorovanie udalostí myši
        opacity: 0.8 // Nastavenie priehľadnosti
      }}
      aria-hidden="true"
    />
  );
};

export default BackgroundCanvas;
