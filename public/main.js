import { generateRandomNumber, setBits, getIndex } from "./js/Client/randomNumberGenerator.js";
import { NumberGenerator } from "./js/Client/generatorModes.js";

window.onload = main;

async function main() {
  const text = document.getElementById("text");
  // document.getElementById("priority").addEventListener("click", () => {
  //   const min = Number(text.value);
  //   NumberGenerator.setMin(min);
  //   NumberGenerator.setMax(min + 100);
  //   console.log("Priority number: ", NumberGenerator.priority());
  // });

  var [bits, index] = await getBytesLoaded();
  index = 0;
  setBits(bits, index);

  // printOutRandomNumbers();

  // index = getIndex();
  // saveBytesLoaded(index);
}

// async function getBytesLoaded(){
//   fetch('/data')
//   .then(response => response.json())
//   .then((bits, lastIndex) => {
//     return [bits, lastIndex];
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     return [];
//   });
// }
async function getBytesLoaded(){
  try {
    const response = await fetch('/data');
    const { bits, lastIndex } = await response.json();
    return [bits, lastIndex];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function printOutRandomNumbers() {
  NumberGenerator.setMin(0);
  NumberGenerator.setMax(100);
  const howMany = 25;

  console.log("Generating", howMany, "random numbers...");
  for (let i = 0; i < howMany; i++) {
    var result = NumberGenerator.time();

    console.log(result);
  }
}

// then(data => {
//   const { bits, lastIndex } = data;
//   console.log(bits, lastIndex);
//   return [bits, lastIndex];
// })