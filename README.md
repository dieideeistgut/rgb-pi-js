## rgb-pi-js
**A JavaScript / NodeJS port of [rgb-pi](https://github.com/ryupold/rgb-pi)**

Controlling RGB LED stripes using a Raspberry Pi and a mobile device



## Installation

```bash
npm install httpdispatcher
npm install rpio
```

[node-rpio](https://github.com/jperkin/node-rpio) requires the user to be a member of the `gpio`group, such that the user can access `/dev/gpiomem` which is being used by the module. You may need to configure udev with the following rule:

```bash
sudo cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```


## Contributors
[realkyton](https://github.com/realkyton)  
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