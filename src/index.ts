import { sortAlgorithm, ALGORITHM_TYPE } from "./strategy";


const array1 = [5,8,1,3,2,7];
const array2 = [6,2,8,7,0,3,5];


const algoritmo = new sortAlgorithm(array1, ALGORITHM_TYPE.BUBBLE)
const algoritmo2 = new sortAlgorithm(array2, ALGORITHM_TYPE.MERGE)
 algoritmo.logic();
 console.log(algoritmo2.logic());