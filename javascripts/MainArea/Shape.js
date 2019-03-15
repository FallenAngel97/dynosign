/**
 * @module Shape
 */

export class Shape {
  constructor (x, y, w, h, fill) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.fill = fill || '#000';
    this.shapeType = 'rectangle';
  }
  /**
   * Changes shape type to new one
   * @param {string} shape - type of shape (rectangle, circle)
   */
  setShape (shape) {
    this.shapeType = shape;
  }
  /**
   * Checks if shape contains mouse position
   * @param {number} clientX - mouse x coordintae
   * @param {number} clientY - mouse y coordinate
   */
  contains (clientX, clientY) {
    return (this.x <= clientX && this.x + this.w >= clientX) &&
      (this.y <= clientY && this.y + this.h >= clientY);
  }
  /**
   * Draws current shape on specified canvas
   * @param {object} ctx - Canvas context
   */
  draw (ctx) {
    ctx.beginPath();
    switch (this.shapeType) {
      case 'rectangle':
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.closePath();
        break;
      case 'circle':
        ctx.fillStyle = this.fill;
        ctx.arc(this.x, this.y, this.w, 0, 2 * Math.PI)
        ctx.fill()
        break;
    }
  }
}
