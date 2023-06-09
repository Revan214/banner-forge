import React, { useRef, useEffect } from 'react';
import { Image as MantineImage } from '@mantine/core';


interface Props {
  imageUrl: string;
  tintOpacity: number;
  bgColor: string;
  onImageUrlLoad: (url: string) => void;
}

function hexToRgb(hex: string): string | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    return null;
  }
  const r = parseInt(match[1], 16);
  const g = parseInt(match[2], 16);
  const b = parseInt(match[3], 16);

  const rStr = r.toString()
  const gStr = g.toString()
  const bStr = b.toString()
  const comma = ", "
  const rgb = rStr + comma + gStr + comma + bStr
  return rgb;
}

const TintedImage: React.FC<Props> = ({ imageUrl, onImageUrlLoad, tintOpacity, bgColor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const finalColor = hexToRgb(bgColor)

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (canvas && ctx) {
      const img = new Image();
      img.src = imageUrl;

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        if (bgColor !== "") {
          ctx.fillStyle = `rgba(${finalColor}, ${tintOpacity})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Get the URL of the modified image and pass it back to the parent component
        const modifiedImageUrl = canvas.toDataURL();
        onImageUrlLoad(modifiedImageUrl);
      }
    }
  }, [imageUrl, tintOpacity, bgColor]);

  return <canvas style={{width: 0, height: 0}} ref={canvasRef} />;
};

export default TintedImage;