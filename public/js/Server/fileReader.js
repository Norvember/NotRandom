const fs = require("fs");
const Storage = require("node-storage");
const { checkFilePath } = require("./fileUtils");

const startIndex = 44;
const stepSize = 16;

const localPath = "./public/data.txt";
const bytesPath = "./public/ambient.wav";

function readFileBits(bytesPath) {
  const file = fs.readFileSync(bytesPath);
  const bytes = file.slice(startIndex);
  // bytes = new Uint8Array(bytes);
  const bits = [];
  var skip = false;
  bytes.forEach((byte) => {
    if(!skip) {
      bit = getNthBit(byte, 0);
      bits.push(bit);
    }
    skip = !skip;
    
  });
  return bits;
}

function getNthBit(num, n) {
  // from right to left
  return (num >> n) & 1;
}

async function getBytesLoaded() {
  try {
    var bits = [];
    var lastIndex = 0;
  
    const localFileCreated = await checkFilePath(localPath);
    if (localFileCreated) {
      const store = new Storage(localPath);
      bits = store.get("bytesLoaded");
      lastIndex = store.get("lastIndex");
      // console.log("Read", bits.length, "bits");
    }
    else{
      const store = new Storage(localPath);
      bits = readFileBits(bytesPath);
      store.put("bytesLoaded", bits);
      store.put("lastIndex", 0);
    }
    return [bits, lastIndex];
  } catch (error) {
    console.error("Error reading bytes loaded:", error);
    return [];
  }
}

function saveBytesLoaded(lastIndex) {
  try {
    const store = new Storage(localPath);
    store.put("lastIndex", lastIndex);
  } catch (error) {
    console.error("Error saving bytes loaded:", error);
  }
}

module.exports = { getBytesLoaded, saveBytesLoaded };