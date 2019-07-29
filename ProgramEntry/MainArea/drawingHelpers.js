export const dragDroppedPicture = (canvas, event) => {
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];
  let filename = '';
  for (let f of event.dataTransfer.files) {
    filename = f.name;
    if (validImageTypes.includes(f.type)) {
      var reader = new FileReader();
      reader.onload = () => {
        var dataURL = reader.result;
        let layerImg = new Image();
        layerImg.src = dataURL;
        layerImg.onload = () => {
          let ctx = canvas.getContext('2d');
          let cropRatio = Math.max(
            layerImg.width / (canvas.width - 20),
            layerImg.height / (canvas.height - 20)
          );
          const imgWidth = layerImg.width / cropRatio;
          const imgHeight = layerImg.height / cropRatio;
          ctx.drawImage(layerImg, (canvas.width / 2 - imgWidth / 2), (canvas.height / 2 - imgHeight / 2), imgWidth, imgHeight);
        }
      };
      reader.readAsDataURL(f);
    }
  }
  return filename;
}
