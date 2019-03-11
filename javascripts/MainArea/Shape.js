export class Shape {
  constructor (x, y, w, h, fill) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 0;
    this.h = h || 0;
    this.fill = fill || '#000';
  }
  contains (clientX, clientY) {
    return (this.x <= clientX && this.x + this.w >= clientX) &&
      (this.y <= clientY && this.y + this.h >= clientY);
  }
}
