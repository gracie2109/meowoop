export function resizeDataUrlImage({
  dataUrl,
  width,
  height,
}: {
  dataUrl: string;
  width: number | string;
  height: number | string;
}): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = Number(width);
      canvas.height = Number(height);

      if (!ctx) {
        return reject(new Error("Canvas 2D context is not available"));
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const resizedDataUrl = canvas.toDataURL();
      resolve(resizedDataUrl);
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = dataUrl;
  });
}
