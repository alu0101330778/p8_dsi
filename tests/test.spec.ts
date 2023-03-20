import { sortAlgorithm, ALGORITHM_TYPE } from "../src/strategy";
import "mocha";
import {expect} from "chai";

const array1 = [5,8,1,3,2,7];
const array2 = [6,2,8,7,0,3,5];


const algoritmo = new sortAlgorithm(array1, ALGORITHM_TYPE.BUBBLE)
const algoritmo1 = new sortAlgorithm(array2, ALGORITHM_TYPE.BUBBLE)
const algoritmo2 = new sortAlgorithm(array2, ALGORITHM_TYPE.MERGE)

describe("algoritmos Sort function test", () => {
  it("Algoritmo BubbleSort([5,8,1,3,2,7]) returns [ 1, 2, 3, 5, 7, 8 ]", () => {
      expect(algoritmo.logic()).to.be.deep.equal([ 1, 2, 3, 5, 7, 8 ]);
  });
  it("Algoritmo BubbleSort([6,2,8,7,0,3,5]) returns [0,2,3,5,6,7,8]", () => {
    expect(algoritmo1.logic()).to.be.deep.equal([0,2,3,5,6,7,8]);
});
  
});