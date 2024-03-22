import { generateRandomNumber } from "./randomNumberGenerator.js";

const NumberGenerator = {
    priority: function() {
      return generateRandomNumber(this.min, this.max);
    },
    time: function() {
      return generateTimeNumber(this.min, this.max);
    },
    setMin: function(min) {
      this.min = min;
    },
    setMax: function(max) {
      this.max = max;
    }
  };
const generateTimeNumber = (min, max) => {
    const startTime = Date.now();
    const timeToEnd = 5;
    var elapsedTime = 0;
    var results = [];
    while (elapsedTime < timeToEnd) {
        results.push(generateRandomNumber(min, max));
        elapsedTime = Date.now() - startTime;
    }
    return printOutResults(results);
};

function printOutResults(results) {
    const countOccurrences = results.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
    }, {});

    const maxOccurrences = Math.max(...Object.values(countOccurrences));
    
    // const sortedOccurrences = Object.entries(countOccurrences).sort((a, b) => b[1] - a[1]);
    // console.log("Occurrences sorted by times seen (descending): ", sortedOccurrences);

    const mostSeenResult = Object.keys(countOccurrences).find(key => countOccurrences[key] === maxOccurrences);

    // console.log("Most seen result: ", mostSeenResult + " (" + maxOccurrences + " times)");

    return mostSeenResult;
}

export { NumberGenerator };