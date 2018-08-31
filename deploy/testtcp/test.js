const handler = require('./datadefinehandler');
const debug = require('debug')('testtcp:test');

const pressure = 1020.21;
debug(`pressure->${pressure}`);
const pressure_hex = handler.pressure.gethex(pressure);
debug(`pressure_hex->${pressure_hex}`);
const pressure_value = handler.pressure.parsevalue(pressure_hex);
debug(`pressure_value->${pressure_value}`);
debug(`${pressure===pressure_value}\n`);

const winddirection = 300;
const winddirection_hex = handler.winddirection.gethex(winddirection);
debug(`winddirection_hex->${winddirection_hex}`);
const winddirection_value = handler.winddirection.parsevalue(winddirection_hex);
debug(`winddirection_value->${winddirection_value}`);
debug(`${winddirection===winddirection_value}\n`);

const humidity = 32.9;
const humidity_hex = handler.humidity.gethex(humidity);
debug(`humidity_hex->${humidity_hex}`);
const humidity_value = handler.humidity.parsevalue(humidity_hex);
debug(`humidity_value->${humidity_value}`);
debug(`${humidity===humidity_value}\n`);

const rainfall = 23;
const rainfall_hex = handler.rainfall.gethex(rainfall);
debug(`rainfall_hex->${rainfall_hex}`);
const rainfall_value = handler.rainfall.parsevalue(rainfall_hex);
debug(`rainfall_value->${rainfall_value}`);
debug(`${rainfall===rainfall_value}\n`);

const temperature = 36.89;
const temperature_hex = handler.temperature.gethex(temperature);
debug(`temperature_hex->${temperature_hex}`);
const temperature_value = handler.temperature.parsevalue(temperature_hex);
debug(`temperature_value->${temperature_value}`);
debug(`${temperature===temperature_value}\n`);
