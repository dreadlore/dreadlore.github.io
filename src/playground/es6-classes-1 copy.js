class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }
  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
};

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }
  getDescription() {
    let description = super.getDescription();
    if (this.hasMajor()) {
      description += ` Their major is ${this.major}.`;
    }
    return description;
  }
  hasMajor() {
    return !!this.major;
  }
};

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  hasHomeLocation() {
    return !!this.homeLocation;
  }
  getDescription() {
    let description = super.getDescription();
    if (this.hasHomeLocation()) {
      description += ` I'm visiting from ${this.homeLocation}`;
    }
    return description;
  }
};

const me = new Traveler('Bill Bunkum', 37, 'Kentucky');
console.log('Here is ', me);
console.log(me.getDescription());

const other = new Traveler();
console.log(other.getDescription());