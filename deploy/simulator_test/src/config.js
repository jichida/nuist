const config = {
  srvredis:{
    host:process.env.srvredis_host||'127.0.0.1',
    port: process.env.srvredis_port||6379,
    // user: process.env.srvredis_user||'wxq',
    // password: process.env.srvredis_password||'124',
    // db: process.env.srvredis_db||'zndb'
  }
};
module.exports = config;
