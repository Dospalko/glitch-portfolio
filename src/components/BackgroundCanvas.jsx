import React, { useRef, useEffect } from 'react';

const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas exists

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let gridSpacing = 30; // Pixels between grid lines
    let dotSize = 1;
    let glitchIntensity = 0; // Controls how often glitches happen (0-1)
    let glitchTimer = 0;
    let glitchDuration = 0;

    // Colors from CSS Variables (ensure these are defined in index.css)
    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue('--color-text-secondary').trim() || '#b0b0b0';
    const accentColor = style.getPropertyValue('--color-accent-glitch').trim() || '#00FFFF';
    const backgroundColor = style.getPropertyValue('--color-background').trim() || '#050505';

    // Debounced resize handler
    let resizeTimeout;
    const handleResize = () => {
       clearTimeout(resizeTimeout);
       resizeTimeout = setTimeout(() => {
           canvas.width = window.innerWidth;
           canvas.height = window.innerHeight;
           // Redraw immediately on resize might be needed depending on draw loop
           drawGrid();
       }, 150); // Debounce resize events
    };

    // Set initial canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', handleResize);


    const drawGrid = () => {
      // Clear canvas with background color
       ctx.fillStyle = backgroundColor;
       ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set line styles
       ctx.strokeStyle = primaryColor;
       ctx.fillStyle = primaryColor; // For dots
       ctx.lineWidth = 0.5;
       ctx.globalAlpha = 0.4; // Make grid subtle

      // Decide if glitching this frame
       let isGlitching = false;
       if (glitchTimer <= 0 && Math.random() < 0.008) { // Low probability to start glitch
          glitchDuration = Math.random() * 15 + 5; // Glitch for 5-20 frames
          glitchTimer = glitchDuration;
          glitchIntensity = Math.random() * 0.6 + 0.1; // Random intensity
       }
       if (glitchTimer > 0) {
          isGlitching = true;
          glitchTimer--;
          if (glitchTimer <= 0) {
             glitchIntensity = 0; // Reset intensity when duration ends
          }
       }

       // Draw vertical lines / dots
       for (let x = 0; x <= canvas.width; x += gridSpacing) {
          let currentX = x;
          let currentAlpha = 0.4;
          let currentColor = primaryColor;

          // Apply Glitch effects
           if (isGlitching && Math.random() < glitchIntensity * 0.5) {
              currentX += (Math.random() - 0.5) * 10 * glitchIntensity; // Displacement
              currentAlpha = 0.1 + Math.random() * 0.6 * glitchIntensity; // Random alpha
               if (Math.random() < glitchIntensity * 0.3) {
                  currentColor = accentColor; // Flash accent color
                  currentAlpha = 0.5 + Math.random() * 0.5; // Brighter alpha for accent
               }
           }

           ctx.globalAlpha = currentAlpha;
           ctx.fillStyle = currentColor;

            // Draw dots instead of lines
            for (let y = 0; y <= canvas.height; y+= gridSpacing) {
               let currentY = y;
                 if (isGlitching && Math.random() < glitchIntensity * 0.3) {
                    currentY += (Math.random() - 0.5) * 8 * glitchIntensity;
                 }

                 ctx.beginPath();
                 ctx.arc(currentX, currentY, dotSize, 0, Math.PI * 2);
                 ctx.fill();

                 // --- OR Draw Lines (Comment out dots if using lines) ---
                 // ctx.strokeStyle = currentColor;
                 // ctx.beginPath();
                 // ctx.moveTo(currentX, 0);
                 // ctx.lineTo(currentX, canvas.height);
                 // ctx.stroke();
                 // break; // Remove break if drawing lines AND dots
            }
       }

       // Draw horizontal dots (simplified, similar logic can be applied)
       ctx.globalAlpha = 0.4; // Reset alpha for horizontal pass if needed
       ctx.fillStyle = primaryColor;
        for (let y = 0; y <= canvas.height; y += gridSpacing) {
           for (let x = 0; x <= canvas.width; x += gridSpacing) {
              // Could add horizontal glitching here too if desired
              // This loop currently redraws dots, ensure logic aligns with vertical pass
               // Re-enable if only drawing horizontal dots separately
              //  ctx.beginPath();
              //  ctx.arc(x, y, dotSize, 0, Math.PI * 2);
              //  ctx.fill();
           }
        }


       ctx.globalAlpha = 1; // Reset global alpha
    };


    // Animation loop
    const render = () => {
      drawGrid();
      animationFrameId = requestAnimationFrame(render);
    };

    render(); // Start the loop

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };

  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', // Keep it fixed behind everything
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10, // Ensure it's far behind content and other potential overlays
        pointerEvents: 'none', // Ignore mouse events
        opacity: 0.8 // Adjust overall opacity if needed
      }}
      aria-hidden="true" // Hide from accessibility tree
    />
  );
};

export default BackgroundCanvas;