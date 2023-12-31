function memorySizeOf(obj) {
    var bytes = 0;
  
    function sizeOf(obj) {
      if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
          case "number":
            bytes += 8;
            break;
          case "string":
            bytes += obj.length * 2;
            break;
          case "boolean":
            bytes += 4;
            break;
          case "object":
            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if (objClass === "Object" || objClass === "Array") {
              for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
        }
      }
      return bytes;
    }
  
    function formatByteSize(bytes) {
      if (bytes < 1024) return bytes + " bytes";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
      else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
      else return (bytes / 1073741824).toFixed(3) + " GiB";
    }
  
    return formatByteSize(sizeOf(obj));
  }

  

  const obi = {
    ecg : Array.from({
        length: 7000
    }, () => Math.floor(Math.random() * 10)),
    spo02 : Array.from({
        length: 3
    }, () => Math.floor(Math.random() * 10)),
    bp : Array.from({
        length: 3
    }, () => Math.floor(Math.random() * 10)),
    hear : Array.from({
        length: 3
    }, () => Math.floor(Math.random() * 10))
  }

  const arrr = Array.from({length : 500 }, () => Math.floor(Math.random() * 1000))
  //let sizeinbytes = memorySizeOf(obi)

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
  console.log(time)

  
  var strfied = JSON.stringify(arrr)


  var today1 = new Date();
  var time1 = today1.getHours() + ":" + today1.getMinutes() + ":" + today1.getSeconds() + ":" + today1.getMilliseconds();
  console.log(time1)
