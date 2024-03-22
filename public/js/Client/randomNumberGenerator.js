var bits, index = null;

function setBits(newBits, newIndex) {
  bits = newBits;
  index = newIndex;
}

function getIndex(){
  return index;
}

function generateRandomNumber(min, max) {
  const range = max - min;
  var numBitsToTake = Math.floor(Math.log2(range) + 1);
  if (bits.length - index < numBitsToTake) {
    // TODO: read new file?
    // FIXME: instead of throwing error, read new file
    throw new Error("Not enough bits to generate random number");
  }

  let value = 0;
  do {
    var bitsString = "";
    // for (var i = 0; i < numBitsToTake; i++) {
    //   bitsString += bits.pop() === 0 ? "1" : "0";
    // }
    for (let i = index; i < index + numBitsToTake; i++) {
      bitsString += bits[i % bits.length];
    }
    index = (index + numBitsToTake) % bits.length;
    value = parseInt(bitsString, 2);
  } while (value > range);
  return value + min;
}

export { generateRandomNumber, setBits, getIndex };