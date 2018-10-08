function BufferLoader(context) {
  this.context = context;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.load = function(url) {
  var loader = this;
  return new Promise(function(resolve, reject) {
  
    // Load buffer asynchronously
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "arraybuffer";
  
    
  
    request.onload = function() {
      // Asynchronously decode the audio file data in request.response
      loader.context.decodeAudioData(
        request.response,
        function(buffer) {
          if (!buffer) {
            alert('error decoding file data: ' + url);
            reject('error decoding file data');
          }
     
          resolve(buffer);
        },
        function(error) {
          reject(error);
        }
      );
    }
  
    request.onerror = function() {
      reject('BufferLoader: XHR error');
    }
  
    request.send();
  });
}
