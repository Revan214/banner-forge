import { useEffect, useRef, useState } from 'react';

interface Props {
  imageUrl: string;
  width: number;
  height: number;
  setImageUrl: (url: string) => void;
  headerText: string;
  txtColor: string;
  fontSize: number;
}

const CroppedImage: React.FC<Props> = ({ headerText, txtColor, fontSize, imageUrl, width, height, setImageUrl }) => {
  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // const [headerTxt, setHeaderTxt] = useState<string>(headerText)
  // const [textColor, setTxtColor] = useState<string>(txtColor)
  // const [fontSze, setfontSize] = useState<number>(fontSize)

  // var fntSize = fontSize
  // var hederText = headerText
  // var textColor = txtColor
  useEffect(() => {
    const image = new Image();
    image.onload = () => setImageElement(image);
    image.src = imageUrl;
  }, [imageUrl]);

  useEffect(() => {
    if (imageElement && canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
  
      const cropWidth = Math.min(imageElement.width, imageElement.height * (width / height));
      const cropHeight = Math.min(imageElement.height, imageElement.width * (height / width));
      const cropX = (imageElement.width - cropWidth) / 2;
      const cropY = (imageElement.height - cropHeight) / 2;
  
      const ctx = canvas.getContext('2d');
      if (ctx) {
  
        ctx.drawImage(imageElement, cropX, cropY, cropWidth, cropHeight, 0, 0, width, height);
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const text = headerText;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.fillStyle = txtColor;
  
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 5;
  
        ctx.globalAlpha = 1;
        // Draw the text onto the canvas at the center coordinates
        ctx.fillText(text, centerX, centerY);
      }
      const modifiedImageUrl = canvas.toDataURL();
      setImageUrl(modifiedImageUrl);
    }
  }, [imageElement, width, height, headerText, txtColor, fontSize]);

  return <canvas style={{ width: 0, height: 0 }} ref={canvasRef} />;
};

export default CroppedImage;