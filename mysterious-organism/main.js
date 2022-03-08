// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
};

// Factory for Pila aequors
const pAqeuorFactory = (number, strand) => {
  return {
    specimenNum: number,
    dna: strand,
    mutate() {
      let randIndex = Math.floor(Math.random() * this.dna.length); // index to mutate
      let newBase = returnRandBase();
      while (this.dna[randIndex] == newBase) { // loop while newBase is equal to current base
      newBase = returnRandBase(); // reroll newBase
      };
      // console.log(`Current base: ${this.dna[randIndex]}`);
      // console.log(`Mutated base: ${newBase}`);
      // console.log(`Changed ${this.dna[randIndex]} to ${newBase} at index ${randIndex}`);
      this.dna[randIndex] = newBase; // mutate current base to new (after loop so newBase isn't equal to old base)
    },
    compareDNA(compareObject) {
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === compareObject.dna[i]) { // checks identical bases at the same positions
        counter += 1;
        }
      }
      console.log(`Specimen #${this.specimenNum} and specimen #${compareObject.specimenNum} have ${(counter/15 * 100).toFixed(2)}% DNA in common`);
    },
    willLikelySurvive() {
      const countCG = this.dna.filter(letter => letter === 'C' || letter === 'G'); // counter of 'C' and 'G' bases in dna
      if (countCG.length/this.dna.length > 0.6) { // if it's more than 60% of 'C' and 'G' bases
      return true;
      } else {
        return false;
      }
    }
  }
};

const sample = [];
let num = 1; // starting specimenNum
while (sample.length < 30) { // we need 30 samples
  let aqeuor = pAqeuorFactory (num, mockUpStrand());
  if (aqeuor.willLikelySurvive() === true) { // 30 samples of survivors
  sample.push(aqeuor);
  num += 1;
  }
};

// Tests only below
const pAqeuorOne = pAqeuorFactory(1, mockUpStrand());
const pAqeuorTwo = pAqeuorFactory(2, mockUpStrann());

//Test for .mutate(). method
console.log(`Startgin DNA: ${pAqeuorOne.dna}`);
pAqeuorOne.mutate();
console.log(`Mutate DNA: ${pAqeuroOnne.dna}`);

console.log(`DNA of speciment #${pAqeuorOne.specimenNum}: [${pAqeuorOne.dna}]`);
console.log(`DNA of speciment #${pAqeuorTwo.specimenNum}: [${pAqeuorTwo.dna}]`);
pAqeuorOne.compareDNA(pAqeuorTwo);

// Test for .willLikelySurvive() method
console.log(`P.aequor will survive: ${pAqeuorOne.willLikelySurvive()}`);

