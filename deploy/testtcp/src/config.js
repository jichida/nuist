const config = {
  targetip: process.env.targetip || '127.0.0.1',
  targetport: process.env.targetport || '50000',
  gwid:process.env.gwid || '2',
  senddatainterval:process.env.senddatainterval || '6000',
  sendpinginterval:process.env.sendpinginterval || '30000',

  deviceid_data_max:process.env.deviceid_data_max || '101',
  deviceid_data_min:process.env.deviceid_data_min || '100',

  pressure_data_offset:process.env.pressure_data_offset || '41',
  pressure_data_length:process.env.pressure_data_length || '4',
  pressure_data_min:process.env.pressure_data_min || '20',
  pressure_data_max:process.env.pressure_data_max || '40',

  winddirection_data_offset:process.env.winddirection_data_offset || '17',
  winddirection_data_length:process.env.winddirection_data_length || '2',
  winddirection_data_min:process.env.winddirection_data_min || '0',
  winddirection_data_max:process.env.winddirection_data_max || '409',

  windspeed_data_offset:process.env.windspeed_data_offset || '47',
  windspeed_data_length:process.env.windspeed_data_length || '2',
  windspeed_data_min:process.env.windspeed_data_min || '0',
  windspeed_data_max:process.env.windspeed_data_max || '32',

  humidity_data_offset:process.env.humidity_data_offset || '35',
  humidity_data_length:process.env.humidity_data_length || '2',
  humidity_data_min:process.env.humidity_data_min || '0',
  humidity_data_max:process.env.humidity_data_max || '100',

  rainfall_data_offset:process.env.rainfall_data_offset || '45',
  rainfall_data_length:process.env.rainfall_data_length || '2',
  rainfall_data_min:process.env.rainfall_data_min || '0',
  rainfall_data_max:process.env.rainfall_data_max || '100',

  temperature_data_offset:process.env.temperature_data_offset || '33',
  temperature_data_length:process.env.temperature_data_length || '2',
  temperature_data_min:process.env.temperature_data_min || '0',
  temperature_data_max:process.env.temperature_data_max || '100',

};



module.exports = config;
