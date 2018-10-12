import { Accelerometer } from "accelerometer";
import { display } from "display";
import document from "document";
import * as S from "scientific";
import * as signal from "scientific/signal";

import { Disc } from "./disc";

display.autoOff = false;
display.on = true;

let disc1 = new Disc(document.getElementById("disc1"), 30, "fb-red");
let disc2 = new Disc(document.getElementById("disc2"), 26, "fb-yellow");
let disc3 = new Disc(document.getElementById("disc3"), 22, "fb-green");

// 5hz lowpass butterworth filter
const coeffA = new Float32Array([1, -2.37409474, 1.92935567, -0.53207537]);
const coeffB = new Float32Array([
  0.00289819,
  0.00869458,
  0.00869458,
  0.00289819
]);
const filter5hzX = new signal.LinearFilter(coeffB, coeffA);
const filter5hzY = new signal.LinearFilter(coeffB, coeffA);

let accel = new Accelerometer({ frequency: 100, batch: 10 });

accel.onreading = () => {
  // Unfiltered, raw reading
  disc1.ax = accel.readings.x[0];
  disc1.ay = accel.readings.y[0];
  disc1.reposition();

  // Unfiltered, averaged reading
  disc2.ax = S.mean(accel.readings.x);
  disc2.ay = S.mean(accel.readings.y);
  disc2.reposition();

  // Filtered reading
  disc3.ax = filter5hzX.update(accel.readings.x)[0];
  disc3.ay = filter5hzY.update(accel.readings.y)[0];
  disc3.reposition();
};

accel.start();
