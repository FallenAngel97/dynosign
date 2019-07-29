let timerMarchingAnts;
/**
 * Draws selection box with pixel sizes on the sides
 * @param {number} offsetDash - the distance between ants
 */

let _currentCoordinate = { x: 0, y: 0 };
let previousCoordinate = { x: 0, y: 0 };

export function draw (offsetDash, canvas, flag, coordinate = _currentCoordinate, prevCoordinate = previousCoordinate) {
  if (!canvas) return;
  _currentCoordinate = coordinate;
  previousCoordinate = prevCoordinate;
  var ctx = canvas.getContext('2d');
  ctx.beginPath();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setLineDash([6]);
  ctx.lineDashOffset = offsetDash;
  const diffX = coordinate.x - prevCoordinate.x;
  const diffY = coordinate.y - prevCoordinate.y;
  ctx.strokeRect(coordinate.x - diffX, coordinate.y - diffY, diffX, diffY);
  if (flag) {
    ctx.fillText(Math.abs(diffX) + 'px', prevCoordinate.x + diffX / 2, prevCoordinate.y - 10)
    ctx.fillText(Math.abs(diffY) + 'px', prevCoordinate.x - 40, prevCoordinate.y + diffY / 2)
  }
  clearTimeout(timerMarchingAnts)
  timerMarchingAnts = setTimeout(() => {
    offsetDash++;
    draw(offsetDash, canvas, flag, coordinate, prevCoordinate);
  }, 100);
}
