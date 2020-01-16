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

function simpleLineDraw(ctx, ctrlPressed, prevX, prevY, currX, currY, color) {
  ctx.beginPath();
  if (ctrlPressed) { // draw orthogonal line
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(prevX, currY);
  } else {
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
  }
  var y = 2;
  ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
  ctx.lineWidth = y;
  ctx.stroke();
}

function rectangleDraw(ctx, shapes, currX, currY, prevX, prevY, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (shapes)
    shapes.map((shape) => {
      shape.draw(ctx);
    });
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
  let diffX = currX - prevX;
  let diffY = currY - prevY;
  ctx.fillRect(currX - diffX, currY - diffY, diffX, diffY)
}

function circleDraw(ctx, shapes, currX, currY, prevX, prevY, color) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (shapes) {
    shapes.map((shape) => {
      shape.draw(ctx);
    });
  }
  ctx.beginPath();
  ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},${color.a})`;
  diffX = currX - prevX;
  diffY = currY - prevY;
  ctx.arc(currX - diffX, currY - diffY, Math.abs(diffX), 0, 2 * Math.PI)
  ctx.fill()
}

export const draw  = (canvas, color, mouseType, ctrlPressed, 
  { prevX, prevY, currX, currY }, shapes) => {

  var ctx = canvas.getContext('2d');

  switch (mouseType) {
    case 'draw':
      simpleLineDraw(ctx, ctrlPressed, prevX, prevY, currX, currY, color);

      break;
    case 'rectangle':
      rectangleDraw(ctx, shapes, currX, currY, prevX, prevY, color);

      break;
    case 'circle':
      circleDraw(ctx, shapes, currX, currY, prevX, prevY, color);

      break;
    case 'default':
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.map((shape) => {
        shape.draw(ctx)
      });
      break;
  }
  ctx.closePath();
}
