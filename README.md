# sdk-scientific

Fitbit SDK example application which demonstrates the Scientific API using the
accelerometer sensor.

3 circles are displayed on screen and can be moved by tilting the device. Each
circle uses a different method for calculating its coordinates. The red circle
uses the raw accelerometer reading, the yellow circle uses a mean value to
create a smoother transition, and the green circle uses a 5hz lowpass
butterworth filter to create the smoothest transition.

![](screenshot.png)

Find out more information on the
[Fitbit Developer Website](https://dev.fitbit.com).

## License

This example is licensed under the [MIT License](./LICENSE).
