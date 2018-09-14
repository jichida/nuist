const config =  {
  appversion:'1.0.0(build0911)',
  logdir:process.env.logdir ||'../../dist/log',
  issendtoredis:process.env.issendtoredis==='false'?false:true,
  srvredis:{
    host:process.env.srvredis_host||'api.nuistiot.com',
    port: process.env.srvredis_port|| 6379,
  },
  listenport:process.env.listenport ||50000,
  deviceid_data_max:process.env.deviceid_data_max || '200',
  deviceid_data_min:process.env.deviceid_data_min || '100',

  pressure_data_offset:process.env.pressure_data_offset || '41',
  pressure_data_length:process.env.pressure_data_length || '4',
  pressure_data_min:process.env.pressure_data_min || '20',
  pressure_data_max:process.env.pressure_data_max || '40',

  winddirection_data_offset:process.env.winddirection_data_offset || '17',
  winddirection_data_length:process.env.winddirection_data_length || '2',
  winddirection_data_min:process.env.winddirection_data_min|| '0',
  winddirection_data_max:process.env.winddirection_data_max || '360',

  windspeed_data_offset:process.env.windspeed_data_offset || '47',
  windspeed_data_length:process.env.windspeed_data_length || '2',
  windspeed_data_min:process.env.windspeed_data_min|| '0',
  windspeed_data_max:process.env.windspeed_data_max|| '100',

  humidity_data_offset:process.env.humidity_data_offset || '35',
  humidity_data_length:process.env.humidity_data_length || '2',
  humidity_data_min:process.env.humidity_data_min|| '0',
  humidity_data_max:process.env.humidity_data_max|| '100',

  rainfall_data_offset:process.env.rainfall_data_offset || '45',
  rainfall_data_length:process.env.rainfall_data_length || '2',
  rainfall_data_min:process.env.rainfall_data_min|| '0',
  rainfall_data_max:process.env.rainfall_data_max|| '100',

  temperature_data_offset:process.env.temperature_data_offset || '33',
  temperature_data_length:process.env.temperature_data_length || '2',
  temperature_data_min:process.env.temperature_data_min|| '0',
  temperature_data_max:process.env.temperature_data_max|| '100',

  deformation_data_min:process.env.deformation_data_min|| '0',
  deformation_data_max:process.env.deformation_data_max|| '100',
  voltage_data_min:process.env.voltage_data_min|| '0',
  voltage_data_max:process.env.voltage_data_max|| '100',
  stress0_data_min:process.env.stress0_data_min|| '0',
  stress0_data_max:process.env.stress0_data_max|| '100',
  stress1_data_min:process.env.stress1_data_min|| '0',
  stress1_data_max:process.env.stress1_data_max|| '100',
  osmoticpressure_data_min:process.env.osmoticpressure_data_min|| '0',
  osmoticpressure_data_max:process.env.osmoticpressure_data_max|| '100',
  no_data_min:process.env.no_data_min|| '0',
  no_data_max:process.env.no_data_max|| '100',
  co_data_min:process.env.co_data_min|| '0',
  co_data_max:process.env.co_data_max|| '100',
  pm2d5_data_min:process.env.pm2d5_data_min|| '0',
  pm2d5_data_max:process.env.pm2d5_data_max|| '100',
  h2s_data_min:process.env.h2s_data_min|| '0',
  h2s_data_max:process.env.h2s_data_max|| '100',
  no2_data_min:process.env.no2_data_min|| '0',
  no2_data_max:process.env.no2_data_max|| '100',
  o3_data_min:process.env.o3_data_min|| '0',
  o3_data_max:process.env.o3_data_max|| '100',
  level_data_min:process.env.level_data_min|| '0',
  level_data_max:process.env.level_data_max|| '100',
  displacement_data_min:process.env.displacement_data_min|| '0',
  displacement_data_max:process.env.displacement_data_max|| '100',
  steelbarmeter_data_min:process.env.steelbarmeter_data_min|| '0',
  steelbarmeter_data_max:process.env.steelbarmeter_data_max|| '100'
};



module.exports = config;
