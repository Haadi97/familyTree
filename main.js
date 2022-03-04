import fetch from "node-fetch";

class Family {
  constructor() {
    this._familyList = [];
  }
  get familyList() {
    return this._familyList;
  }
  set familyList(familyTree) {
    this._familyList = familyTree;
  }
  get totalFamilyMember() {
    return this._familyList.length;
  }

  addFamilyMember(person) {
    person.family = this;
    this.familyList.push(person);
    return this.familyList;
  }
  removeFamilyMember(person) {
    var index = this.familyList.indexOf(person);
    this.familyList.splice(index, 1);
  }

  sortFamilyName() {
    const familyList = this.familyList.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    const orderedFamilyList = familyList.map((familyMember) => {
      return familyMember.name;
    });
    return orderedFamilyList;
  }

  sortFamilyAge() {
    const familyList = this.familyList.sort((a, b) => {
      if (a.age < b.age) {
        return -1;
      }
      if (a.age > b.age) {
        return 1;
      }
      return 0;
    });
    const orderedFamilyList = familyList.map((familyMember) => {
      return familyMember.name;
    });
    return orderedFamilyList;
  }

  ageDifference(person, personRelative) {
    let ageOfPerson = person.age;
    let ageOfRelative = personRelative.age;
    let personDOB = new Date(person.birthday);
    let relativeDOB = new Date(personRelative.birthday);
    let month = personDOB.getMonth() - relativeDOB.getMonth();
    let year = personDOB.getFullYear() - relativeDOB.getFullYear();
    if (ageOfPerson < ageOfRelative) {
      return `${person.name} is younger by ${year} years and ${month} months`;
    } else
      return `${person.name} is older by ${year} years and ${month} months`;
  }

  heightDifference(personA, personB) {
    let heightOfPersonA = personA.height;
    let heightOfPersonB = personB.height;
    if (heightOfPersonA > heightOfPersonB) {
      return `${personA.name} is taller by ${
        heightOfPersonA - heightOfPersonB
      }cm`;
    } else
      return `${personB.name} is taller by ${
        heightOfPersonB - heightOfPersonA
      }cm`;
  }
  totalSiblings() {
    let currentFamily = this;
    let currentSiblings = currentFamily.map((familyMember) => {
      if ((familyMember = familyMember instanceof Son)) {
        return;
      }
    });
  }
}

class Person {
  constructor(name, gender, birthday, height, hobby) {
    this._name = name;
    this._gender = gender;
    this._birthday = birthday;
    this._height = height;
    this._hobby = hobby;
    this._family = null;
  }
  get name() {
    return this._name;
  }
  get gender() {
    return this._gender;
  }
  get birthday() {
    return this._birthday;
  }

  get height() {
    return this._height;
  }
  get hobby() {
    return this._hobby;
  }
  get age() {
    return this.ageOfPerson();
  }
  get catFact() {
    return this.getRandomCatInfo();
  }
  set family(family) {
    this._family = family;
  }

  ageOfPerson() {
    var today = new Date();
    var birthDay = new Date(this._birthday);
    var personAge = today.getFullYear() - birthDay.getFullYear();
    var month = today.getMonth() - birthDay.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDay.getDate())) {
      personAge--;
    }
    return personAge;
  }
  getRandomCatInfo = async () => {
    const catInfo = await fetch("https://cat-fact.herokuapp.com/facts/random/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.text;
      })
      .catch((error) => {
        return error;
      });

    return catInfo;
  };
}
// personsHobby() {
//   const boyHobby = ["Football", "Gaming", "Fishing", "Sleeping"];
//   const girlHobby = ["Gardening", "Cooking", "Watching Series", "Painting"];
//   if (this.gender === "Female") {
//     return girlHobby[Math.floor(Math.random() * girlHobby.length)];
//   } else return boyHobby[Math.floor(Math.random() * boyHobby.length)];
// }
//   calculateHeight() {
//     const personsAge = this.age;
//     const rate = this._growth;

//     const maxHeight = this._maxHeight;
//     const height = personsAge * rate;
//     return (this._height = math.min(height, maxHeight));
//   }
// }

class Mother extends Person {
  constructor(name, birthday, height, hobby) {
    super(name, "Female", birthday, height, hobby);
  }
}

class Father extends Person {
  constructor(name, birthday, height, hobby) {
    super(name, "Male", birthday, height, hobby);
  }
}

class Son extends Person {
  constructor(name, birthday, height, hobby) {
    super(name, "Male", birthday, height, hobby);
  }
  get siblings() {
    return this._siblings;
  }
  totalSiblings() {
    let family = this._family;
    let siblings = family.map(
      family.some((familySiblings) => {
        if (
          familySiblings instanceof Son &&
          familySiblings instanceof Daughter
        ) {
          return family.forEach((personSiblings) => {
            personSiblings instanceof Son && personSiblings instanceof Daughter;
          });
        }
      })
    );
    return siblings.length;
    //console.log(family)
  }
}

class Daughter extends Person {
  constructor(name, birthday, height, hobby) {
    super(name, "Female", birthday, height, hobby);
  }
  totalSiblings() {
    let family = this._family;
    let siblings = family.map(
      family.some((familySiblings) => {
        if (
          familySiblings instanceof Son &&
          familySiblings instanceof Daughter
        ) {
          return family.forEach((personSiblings) => {
            personSiblings instanceof Son && personSiblings instanceof Daughter;
          });
        }
      })
    );
    return siblings.length;
    //console.log(family)
  }
}

const marianne = new Mother("Marianne", "01-01-1963", 175, "Gardening");
const eli = new Father("Eli", "12-31-1963", 180, "Carpenting");
const elaine = new Daughter("Elaine", "07-15-2007");
const leon = new Son("Leon", "10-05-2000");
const marcus = new Son("Marcus", "04-01-2010");
const jones = new Family();
jones.addFamilyMember(marianne);
jones.addFamilyMember(eli);
jones.addFamilyMember(leon);
jones.addFamilyMember(marcus);
jones.addFamilyMember(elaine);

//jones.removeFamilyMember(marcus);
console.log(jones.totalFamilyMember);
console.log(jones.sortFamilyName());
console.log(jones.sortFamilyAge());
// console.log(jones.sortFamilyAge());

console.log("Eli is", eli.age, "years old.");
console.log("Marianne is", marianne.age, "years old.");
console.log("Eli's birthday is on", eli.birthday);
console.log(marianne.height, "cm");
console.log(marianne.hobby);
console.log(eli.hobby);
console.log(jones.ageDifference(eli, marianne));
console.log(jones.heightDifference(eli, marianne));
console.log(await eli.getRandomCatInfo());
leon.totalSiblings();
elaine.totalSiblings();
