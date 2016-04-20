## rgb-pi-js
**A JavaScript / NodeJS port of [rgb-pi](https://github.com/ryupold/rgb-pi)**

Controlling RGB LED stripes using a Raspberry Pi and a mobile device



## Installation

```bash
npm install httpdispatcher
npm install rpio
```

node-rpio requires the user to be a member of the `gpio`group, such that the user can access `/dev/gpiomem` which is being used by the module. You may need to configure udev with the following rule:

```bash
sudo cat >/etc/udev/rules.d/20-gpiomem.rules <<EOF
SUBSYSTEM=="bcm2835-gpiomem", KERNEL=="gpiomem", GROUP="gpio", MODE="0660"
EOF
```

## API Reference

--

## Tests

--

## Contributors

--

## License

--