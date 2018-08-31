const handler = require('./datadefinehandler');
const debug = require('debug')('testtcp:test');

const pressure_hex = handler.pressure.gethex(1020.21);
debug(`pressure_hex->${pressure_hex}`);
const pressure_value = handler.pressure.parsevalue(pressure_hex);
debug(`pressure_value->${pressure_value}`);

const winddirection_hex = handler.winddirection.gethex(300);
debug(`winddirection_hex->${winddirection_hex}`);
const winddirection_value = handler.winddirection.parsevalue(winddirection_hex);
debug(`winddirection_value->${winddirection_value}`);
