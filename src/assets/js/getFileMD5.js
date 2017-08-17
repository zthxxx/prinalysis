const SparkMD5 = require('spark-md5');

let getFileMD5 = function (file) {
  return new Promise(function (resolve, reject) {
    // Read in chunks of 2MB
    let chunkSize = 2097152;
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    let chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    let spark = new SparkMD5.ArrayBuffer();
    let fileReader = new FileReader();

    fileReader.onload = function (e) {
      // console.warn('read chunk nr', currentChunk + 1, 'of', chunks);
      spark.append(e.target.result);
      currentChunk++;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.info('finished file loading');
        let md5Value = spark.end().toUpperCase();
        console.info('computed hash', file.name, md5Value);
        resolve(md5Value);
      }
    };

    fileReader.onerror = function () {
      let errorMsg = 'fileReader went wrong.';
      console.error(errorMsg);
      reject(errorMsg);
    };

    function loadNext() {
      let start = currentChunk * chunkSize;
      let end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;

      fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
    }

    loadNext();
  });
};


export default getFileMD5
