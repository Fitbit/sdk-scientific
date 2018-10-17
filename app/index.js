import { Accelerometer } from "accelerometer";
import { display } from "display";
import document from "document";
import { mean }from "scientific";
import { LinearFilter } from "scientific/signal";

import Disc from "./disc";

// Keep the display on
display.autoOff = false;
display.on = true;

const disc1 = new Disc(document.getElementById("disc1"), 30, "fb-red");
const disc2 = new Disc(document.getElementById("disc2"), 26, "fb-yellow");
const disc3 = new Disc(document.getElementById("disc3"), 22, "fb-green");

// 5hz lowpass butterworth filter
const coeffA = new Float32Array([1, -2.37409474, 1.92935567, -0.53207537]);
const coeffB = new Float32Array([
  0.00289819,
  0.00869458,
  0.00869458,
  0.00289819
]);
const filter5hzX = new LinearFilter(coeffB, coeffA);
const filter5hzY = new LinearFilter(coeffB, coeffA);

// Batched accelerometer readings
const accel = new Accelerometer({ frequency: 100, batch: 10 });

accel.onreading = () => {
  // Unfiltered, raw reading
  let ax1 = accel.readings.x[0];
  let ay1 = accel.readings.y[0];
  disc1.reposition(ax1, ay1);

  // Unfiltered, averaged reading
  let ax2 = mean(accel.readings.x);
  let ay2 = mean(accel.readings.y);
  disc2.reposition(ax2, ay2);

  // Filtered reading
  let ax3 = filter5hzX.update(accel.readings.x)[0];
  let ay3 = filter5hzY.update(accel.readings.y)[0];
  disc3.reposition(ax3, ay3);
};

accel.start();
