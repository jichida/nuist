export const getdomposition = (divid)=> {
    const el = document.getElementById(divid);
    if(!!el){
      const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        top: `${rect.top + scrollTop}px`,
        left:`${rect.left + scrollLeft}px`,
        height:`${rect.height}px`,
        width:`${rect.width}px`,
        display:'block'
      };
    }
    return {  display:'none' };
}

export const getCoureName = (course)=> {
    var name = "";
    if(typeof course === 'string'){
      course = parseFloat(course);
    }

    if ((course >= 0 && course < 22.5) || (course >= 337.5 && course < 360)) // 0
    {
        name = "正北";
    }
    else if (course >= 22.5 && course < 67.5) // 45
    {
        name = "东北";
    }
    else if (course >= 67.5 && course < 112.5) // 90
    {
        name = "正东";
    }
    else if (course >= 112.5 && course < 157.5) //135
    {
        name = "东南";
    }
    else if (course >= 157.5 && course < 202.5) //180
    {
        name = "正南";
    }
    else if (course >= 202.5 && course < 247.5) //225
    {
        name = "西南";
    }
    else if (course >= 247.5 && course < 292.5) //270
    {
        name = "正西";
    }
    else if (course >= 292.5 && course < 337.5) //315
    {
        name = "西北";
    }
    else {
        name = "未知.";
    }
    return name;
}

export const getindexstring = (index,length)=>{
  index = ''+index;
  while(index.length < length){
    index = '0'+index;
  }
  return index;
}
