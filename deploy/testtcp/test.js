const handler = require('./datadefinehandler');
const debug = require('debug')('testtcp:test');

const simulatordata_pressure_hex = handler.pressure.gethex(1020.21);
debug(`simulatordata_pressure_hex->${simulatordata_pressure_hex}`);
const simulatordata_pressure_value = handler.pressure.parsevalue(simulatordata_pressure_hex);
debug(`simulatordata_pressure_value->${simulatordata_pressure_value}`);
