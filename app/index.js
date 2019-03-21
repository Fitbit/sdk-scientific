import { Accelerometer } from "accelerometer";
import { display } from "display";
import document from "document";
import { mean } from "scientific";
import { LinearFilter } from "scientific/signal";

import Disc from "./disc";

// Keep the display on
display.autoOff = false;
display.on = true;

if (Accelerometer) {
  // 3 circles
  const disc1 = new Disc(document.getElementById("disc1"), 30, "fb-red");
  const disc2 = new Disc(document.getElementById("disc2"), 26, "fb-yellow");
  const disc3 = new Disc(document.getElementById("disc3"), 22, "fb-green");

  // 5hz lowpass butterworth filter
  const coeffA = new Float32Array([
    1,
    -2.37409474,
    1.92935567,
    -0.53207537
  ]);
  const coeffB = new Float32Array([
    0.00289819,
    0.00869458,
    0.00869458,
    0.00289819
  ]);

  // An instance of the filter for each axis
  const filter5hzX = new LinearFilter(coeffB, coeffA);
  const filter5hzY = new LinearFilter(coeffB, coeffA);

  // Batched accelerometer readings
  const accel = new Accelerometer({ frequency: 100, batch: 10 });

  accel.addEventListener("reading", () => {
    // Unfiltered, raw reading
    disc1.reposition(
      accel.readings.x[0],
      accel.readings.y[0]
    );

    // Unfiltered, averaged reading
    disc2.reposition(
      mean(accel.readings.x),
      mean(accel.readings.y)
    );

    // Filtered reading
    disc3.reposition(
      filter5hzX.update(accel.readings.x)[0],
      filter5hzY.update(accel.readings.y)[0]
    );
  });

  accel.start();
}
