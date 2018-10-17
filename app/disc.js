import { me as device } from "device";

export default class Disc {
  constructor(ele, radius, color) {
    this.elem = ele;
    this.radius = radius;
    this.x = device.screen.width / 2;
    this.y = device.screen.height / 2;
    this.elem.style.fill = color;
    this.elem.cx = this.x;
    this.elem.cy = this.y;
    this.elem.r = this.radius;
    this.vx = 0;
    this.vy = 0;
  }
  reposition(ax, ay) {
    ax *= -1; //flip x

    this.vx = this.vx + ax;
    this.vy = this.vy + ay;

    this.y = parseInt(this.y + this.vy);
    this.x = parseInt(this.x + this.vx);

    if (this.x < this.radius) {
      this.x = this.radius;
      this.vx = -this.vx * 0.5;
    }

    if (this.x > device.screen.width - this.radius) {
      this.x = device.screen.width - this.radius;
      this.vx = -this.vx * 0.5;
    }

    if (this.y < this.radius) {
      this.y = this.radius;
      this.vy = -this.vy * 0.6;
    }

    if (this.y > device.screen.height - this.radius) {
      this.y = device.screen.height - this.radius;
      this.vy = -this.vy * 0.6;
    }

    this.elem.cx = this.x;
    this.elem.cy = this.y;
  }
}
