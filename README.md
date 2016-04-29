# rgb-pi-js

### Controlling RGB LED stripes using a Raspberry Pi and a mobile device

##### _A JavaScript / NodeJS port of [rgb-pi](https://github.com/ryupold/rgb-pi)_



This project provides a server, written in TypeScript / NodeJS, which controls one  RGB LED strip attached to the Raspberry Pi's GPIO pins _(in the future we will support more than one)_. The server, once running, can be reached via HTTP requests. The _[request protocol](http://htmlpreview.github.io/?https://github.com/ryupold/rgb-pi/blob/master/doc/protocol.html)_ is also still in development.

To control the whole thing there are (official) mobile apps planned for various platforms:

* Windows Phone
* Android
* Desktop
* Eventually iOS

Since the servers code is open-source you may develop your own app.

## Hardware
#### Prototype
**IMPORTANT NOTE:**
We're _no eletricians_ and we take no responsibility or liability, so far as legally possible, for any damages as a result of following the instructions shown below.
_In other words: We can't and we won't guarantee that your house won't burn down._

The following prototype allows multiple strips to be attached. We recommend using suitable extension cords with pins, such that you can easily plug them into your breadboard.

![Fritzing circuit](https://github.com/BenjaminDieter/rgb-pi-js/blob/master/doc/RGBPi_Steckplatine.png)

See also: [Raspberry Pi + PWM RGB LED Strip](http://mitchtech.net/raspberry-pi-pwm-rgb-led-strip/) at http://mitchtech.net/

## Getting Started

* Clone this repository.
* Run `npm install` from the project root.
* [node-rpio](https://github.com/jperkin/node-rpio) requires the user to be a member of the `gpio` group, such that the user can access `/dev/gpiomem` which is being used by the module. You may need to configure udev with the following rule:

`
sudo cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF`
* Run `gulp build` from the project root.
* Navigate to the dist folder: `cd dist`
* Run the server with `node Server.js`
* Profit

_still in work, see [rgb-pi](https://github.com/ryupold/rgb-pi) for instructions on how to setup the hardware_

## Configuration
tbc

## Communication
tbc

## Contributors
[BenjaminDieter](https://github.com/BenjaminDieter)  
[ryupold](https://github.com/ryupold)

## License
```
The MIT License (MIT)

Copyright (c) 2013 Creative RyU

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
