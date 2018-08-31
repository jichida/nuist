
const simulatordata = {
  "pressure":{//压力
    offset:42,
    length:4,
    max:50,
    min:20,
    gethex:(value)=>{
      const valuestring = `${value}`;
      const sz = valuestring.split(".");
      const PTB210_Pressure0 = sz[0];
      const PTB210_Pressure1 = sz.length > 1?sz[1]:0;
      let hex0 = new Number(PTB210_Pressure0).toString(16);
      while(hex0.length < 4){
        hex0 = '0'+hex0;
      }
      let hex1 = new Number(PTB210_Pressure0).toString(16);
      while(hex0.length < 4){
        hex0 = '0'+hex0;
      }
    },
    parsevalue(hexstring)=>{
      const buf = Buffer.from(hexstring,'hex');
      const PTB210_Pressure0 =  (buf[1] << 8) + buf[0];
      const PTB210_Pressure1 =  buf[3];
      const valuestring = `${PTB210_Pressure0}.${PTB210_Pressure1}`;
      debug(`气压为:${PTB210_Pressure0}.${PTB210_Pressure1}`);
      return parseFloat(valuestring);
    }
  },
  "winddirection":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "windspeed":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "humidity" ::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "rainfall" : :{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "temperature" : :{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "deformation"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "voltage"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "stress0"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "stress1"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "osmoticpressure"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "no"::{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "co":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "pm2d5":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "h2s":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "no2":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "o3":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "level":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "displacement":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  },
  "steelbarmeter":{
    offset:0,
    length:2,
    max:50,
    min:20,
    gethex:(value)=>{

    },
    parsevalue(hexstring)=>{

    }
  };

  module.exports = simulatordata;
