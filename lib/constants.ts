export  const generateUserColor = () => {
    // Predefined hues that work well for user colors
    const hues = [210, 270, 330, 30, 120, 180, 240, 300];
    
    const hue = hues[Math.floor(Math.random() * hues.length)];
    const saturation = 80; // Fixed saturation for consistency
    const lightness = 55; // Fixed lightness for good contrast
    
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }; 