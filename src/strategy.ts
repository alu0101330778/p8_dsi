
/**
 * Tipos de algoritmos soportados.
 */
export enum ALGORITHM_TYPE {BUBBLE = "Bubble", MERGE = "Merge"};


/**
 * Clase que ordena un array de numeros con distintos algorimtos
 */
export class sortAlgorithm {

  private lista: number[];
  private algoritmo: ALGORITHM_TYPE;
  constructor (lista: number[], algorithmType: ALGORITHM_TYPE) {
    this.lista = lista;
    this.algoritmo = algorithmType;
  }

/**
 * La funcion bubble sort ordena el vector mirando en cada iteracion
 * el elemento siguiente y comparando si es mayor, en caso de que no lo sea se intercambian
 * posiciones. Cuando se haga una vuelta al vector y no haya cambios estará ordenado
 */

  bubbleSort () {
  let flag = true;
  let flagcambio = false;
    while(flag) {
      for (let i = 0; i < this.lista.length - 1; i++) {
        if (this.lista[i] > this.lista[i + 1]) {
          const aux = this.lista[i];
          this.lista[i] = this.lista[i + 1];
          this.lista[i + 1] = aux;
          flagcambio = true;
        }
      }
      if (flagcambio) {
        flagcambio = false;
      } else {
        flag = false;
      }
    }

    console.log(this.lista)

  }

  /**
   * El algoritmo parte el array a la mitad hasta obtener solo 2 elementos y poder compararlos
   */
  bubbleSortMerge (array: number[]): number [] {
    if (array.length <= 1) {
      return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    return this.merge(
      this.bubbleSortMerge(left),
      this.bubbleSortMerge(right)
    );
  
  }
  /**
   * 
   * @param left 
   * @param right 
   * @returns 
   */
  merge (left: number[], right: number[]): number[] {
    const resultArray: number[] = [];
    let leftIndex = 0, rightIndex = 0;
    if (left.length > 2) {
      left = this.bubbleSortMerge(left)
    }
    if (right.length > 2) {
      right = this.bubbleSortMerge(right)
    }
      if (left[leftIndex] < right[rightIndex]) {
        resultArray.push(left[leftIndex]);
        leftIndex++;
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++;
      }
    
    resultArray.concat(left.slice(leftIndex));
    resultArray.concat(right.slice(rightIndex));
    return resultArray;
      
      
  }


  /**
   * Retorne la lista de numeros
   * @returns La lista de numeros
   */
  get_lista(): number[] {
    return this.lista;
  }

  /**
   * Decide que algoritmo usar
   * @returns La lista ordenada
   */
  logic (): number[] {
      if (this.algoritmo === "Bubble") {
        this.bubbleSort();
      } else if (this.algoritmo === "Merge") {
        this.bubbleSortMerge(this.lista);
      } else {
        console.log("Error. El algoritmo no es válido.")
      }

      return this.lista;
  }
}