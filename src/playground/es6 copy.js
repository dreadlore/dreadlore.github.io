// ARROW FUNCTION CHALLENGE
const fullName = 'Bill Bunkum';
const getFirstName = (fullName) => console.log(fullName.split(' ')[0]);
getFirstName(fullName);

// map() CHALLENGE
const multiplier = {
  numbers: [1, 2, 3, 4],
  multiplyBy: 2,
  multiply() {
    return this.numbers.map( (number) => number * this.multiplyBy);
  },
};
console.log(multiplier.multiply());