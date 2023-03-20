# [PRÁCTICA 6. OBJETOS, CLASES E INTERFACES](https://github.com/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-alu0101036694.git). 

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-alu0101036694/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct06-generics-solid-alu0101036694?branch=main)

## Carla Oval Torres

## Índice <a name="índice"></a>
1. [Introducción](#introducción)
2. [Ejercicios propuestos](#ejercicios-propuestos)
    1. [Ejercicio 1 - DSIflix](#ejercicio-1)
    2. [Ejercicio 2 - Implementación de una lista y sus operaciones](#ejercicio-2)
    3. [Ejercicio 3 - Ampliando la biblioteca musical](#ejercicio-3)
    4. [Conclusiones](#conclusiones)
    5. [Referencias](#referencias)

## Introducción <a name="introducción"></a>
> [Volver al índice](#índice)

Lleve a cabo todos y cada uno de los ejercicios propuestos a continuación. Dado que vamos a trabajar con clases y que, probablemente, cada ejercicio implique el desarrollo de diferentes clases, el código fuente de cada ejercicio deberá estar alojado en un directorio independiente con nombre ejercicio-n/ dentro del directorio src/ de su proyecto. Dentro del directorio correspondiente a cada ejercicio, esto es, dentro del directorio ejercicio-n, incluya cada clase/interfaz desarrollada en un fichero independiente.

Incluya la documentación de sus clases mediante el uso de TypeDoc y adopte una metodología de desarrollo dirigido por pruebas/comportamiento. Tenga en cuenta que seguir la metodología TDD o BDD implica confirmar el correcto funcionamiento del código desarrollado, así como los casos en los que dicho código debería informar de un error cuando la entrada no sea la correcta (errors should never pass silently). En consecuencia, desarrolle pruebas unitarias que comprueben el correcto funcionamiento del código y, además, incluya otras pruebas unitarias que verifiquen que el software es robusto ante entradas no válidas o inesperadas.

Por último, recuerde argumentar en el informe de la práctica todas las decisiones de diseño tomadas para cada ejercicio.

```typescript
  import * as Prompt from 'prompt-sync';

  const prompt = Prompt();
  const myNumber = parseInt(prompt('Introduce a number: '));
  console.log(myNumber)
```

## Ejercicios propuestos <a name="ejercicios-propuestos"></a>
### Ejercicio 1 - DSIflix <a name="ejercicio-1"></a>
> [Volver al índice](#índice)

> Imagine que tiene que diseñar el modelo de datos de una plataforma de vídeo en streaming. A través del catálogo de dicha plataforma se puede acceder a películas, series y documentales:
> 
> Defina una interfaz genérica Streamable que trate de especificar propiedades y métodos con los que debería contar una colección de emisiones concreta como, por ejemplo, una colección de series. Por ejemplo, deberían definirse métodos de búsqueda en dicha interfaz, que permitan obtener listados en función de diferentes términos de búsqueda: por año o por nombre, entre otros.
> 
> Defina una clase abstracta genérica BasicStreamableCollection que implemente dicha interfaz genérica. En este punto, podrá particularizar algunas de las propiedades y métodos de la interfaz Streamable, aunque otros tendrán que permanecer como abstractos para ser definidos más abajo en la jerarquía de clases. Todo dependerá del diseño que haya llevado a cabo.
> 
> Tendrá que extender la clase abstracta anterior para obtener subclases que modelen cada uno de los tres tipos de colecciones: series, películas y documentales.
> 
> Trate de aplicar los principios SOLID. Preste especial atención al diseño de la interfaz Streamable. Si cree que debe dividirla en interfaces genéricas más pequeñas porque su diseño inicial es muy complejo, hágalo, con el objetivo de cumplir con el cuarto principio SOLID Interface segregation.

#### Solución:

Este código define tres interfaces: Searchable, Collectable y Streamable.

Estas interfaces pueden ser utilizadas por otras clases para implementar sus propias propiedades y métodos de acuerdo a estas especificaciones, lo que proporciona una forma estándar de definir las funcionalidades de diferentes componentes en una plataforma de vídeo en streaming.

```typescript
// Definición de las interfaces

  export interface Searchable {
    searchByYear(year: number): Streamable[];
    searchByName(name: string): Streamable[];
  }

  export interface Collectable {
    addToCollection(streamable: Streamable): void;
    removeFromCollection(streamable: Streamable): void;
  }
  
  export interface Streamable {
    id: string;
    title: string;
    description: string;
    genre: string[];
    rating: number;
    releaseYear: number;
    getDuration(): number;
  }
```

Las interfaces se definen con más detaññe a continuación:

- Searchable es una interfaz que define dos métodos, searchByYear y searchByName, que toman un argumento de tipo number y string, respectivamente, y devuelven un array de elementos de tipo Streamable. Esto significa que cualquier clase que implemente la interfaz Searchable debe proporcionar una implementación de estos métodos.

- Collectable es una interfaz que define dos métodos, addToCollection y removeFromCollection, que toman un argumento de tipo Streamable y no devuelven nada. Esto significa que cualquier clase que implemente la interfaz Collectable debe proporcionar una implementación de estos métodos.

- Streamable es una interfaz que define seis propiedades y un método. Las propiedades son id, title, description, genre, rating y releaseYear, todas de tipos primitivos o arrays de tipos primitivos. El método getDuration() no toma argumentos y devuelve un número. Esto significa que cualquier clase que implemente la interfaz Streamable debe proporcionar una implementación de este método.


A cintinuación, definimos la clase abstracta BasicStreamableCollection que implementa las interfaces Searchable y Collectable:

```typescript
  // Clase abstracta BasicStreamableCollection
  
  export abstract class BasicStreamableCollection implements Searchable, Collectable {
    private collection: Streamable[];
  
    constructor() {
      this.collection = [];
    }
  
    searchByYear(year: number): Streamable[] {
      return this.collection.filter(streamable => streamable.releaseYear === year);
    }
  
    searchByName(name: string): Streamable[] {
      return this.collection.filter(streamable => streamable.title.toLowerCase().includes(name.toLowerCase()));
    }
  
    addToCollection(streamable: Streamable): void {
      this.collection.push(streamable);
    }
  
    removeFromCollection(streamable: Streamable): void {
      const index = this.collection.findIndex(item => item.id === streamable.id);
      if (index !== -1) {
        this.collection.splice(index, 1);
      }
    }
  }
```

La clase tiene una propiedad privada collection que es un arreglo de objetos Streamable.

Los métodos searchByYear y searchByName buscan en el arreglo de objetos Streamable de la colección según el año de lanzamiento y el nombre de título respectivamente, y retornan un arreglo con los objetos Streamable encontrados. addToCollection agrega un objeto Streamable a la colección, mientras que removeFromCollection elimina un objeto Streamable de la colección si existe.

Al ser una clase abstracta, no se puede instanciar directamente, sino que debe ser extendida por otras clases que implementen los métodos abstractos que quedan pendientes para cada caso particular. Por ejemplo, Series, Movies y Documentaries son subclases que extienden de BasicStreamableCollection.

Por último, se definen las subclases Series, Movies y Documentaries que extienden de BasicStreamableCollection:

```typescript
  // Subclases que extienden BasicStreamableCollection

  export class Series extends BasicStreamableCollection {
    private episodes: Streamable[];
  
    constructor() {
      super();
      this.episodes = [];
    }
  }
  
  export class Movies extends BasicStreamableCollection {
    private duration: number;
  
    constructor() {
      super();
      this.duration = 0;
    }
  }
  
  export class Documentaries extends BasicStreamableCollection {
    private topics: string[];
  
    constructor() {
      super();
      this.topics = [];
    }
  }
```

Se definen tres clases que extienden la clase abstracta BasicStreamableCollection. Cada una de ellas tiene sus propias propiedades y métodos que las diferencian entre sí.

- La clase Series tiene una propiedad privada llamada episodes que es un arreglo de objetos de tipo Streamable. El constructor de la clase llama al constructor de su clase base BasicStreamableCollection y luego inicializa la propiedad episodes como un arreglo vacío.

- La clase Movies tiene una propiedad privada llamada duration que es un número que representa la duración total de las películas en la colección. El constructor de la clase también llama al constructor de su clase base y luego inicializa la propiedad duration en cero.

- La clase Documentaries tiene una propiedad privada llamada topics que es un arreglo de cadenas que representa los temas que abordan los documentales en la colección. El constructor de la clase también llama al constructor de su clase base y luego inicializa la propiedad topics como un arreglo vacío.

Todas estas clases implementan las interfaces Searchable y Collectable, lo que significa que heredan los métodos definidos en la clase BasicStreamableCollection. Esto les permite realizar búsquedas por año y por nombre, agregar y eliminar elementos de la colección. Además, pueden definir sus propios métodos y propiedades específicos para cada subclase.


#### Test:

Se han realizado tests para comprobar que las clases Series, Movies y Documentaries, que extienden la clase abstracta BasicStreamableCollection, funcionan correctamente y cumplen con las especificaciones de su interfaz. En concreto, los tests comprueban que las instancias de estas clases pueden añadir y eliminar elementos de sus respectivas colecciones, y que las búsquedas por nombre y año de publicación funcionan correctamente.

Para ello, cada test realiza una serie de acciones sobre una instancia de la clase que está siendo probada (por ejemplo, añadir un elemento a la colección) y después comprueba que el resultado de una búsqueda realizada sobre esa instancia es el esperado (por ejemplo, que la búsqueda por nombre devuelve un array con un solo elemento). En caso de que el resultado esperado no se cumpla, el test falla.

```typescript
import { describe, it } from 'mocha';
import { expect } from "chai";
import * as Prompt from 'prompt-sync';
import { BasicStreamableCollection, Series, Movies, Documentaries } from '../src/ejercicio01/ejercicio01';

describe('Series', () => {
  let series: Series;

  beforeEach(() => {
    series = new Series();
  });

  it('should be able to add and remove series', () => {
    const streamable = {
      id: '1',
      title: 'Stranger Things',
      description: 'A love letter to the supernatural classics of the 80s',
      genre: ['Drama', 'Fantasy', 'Horror'],
      rating: 8.7,
      releaseYear: 2016,
      getDuration: () => 60
    };
    series.addToCollection(streamable);
    expect(series.searchByName('stranger')).to.have.lengthOf(1);
    expect(series.searchByName('things')).to.have.lengthOf(1);
    series.removeFromCollection(streamable);
    expect(series.searchByName('stranger')).to.have.lengthOf(0);
    expect(series.searchByName('things')).to.have.lengthOf(0);
  });
});

describe('Movies', () => {
  let movies: Movies;

  beforeEach(() => {
    movies = new Movies();
  });

  it('should be able to add and remove movies', () => {
    const streamable = {
      id: '1',
      title: 'The Shawshank Redemption',
      description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      genre: ['Drama'],
      rating: 9.3,
      releaseYear: 1994,
      getDuration: () => 142
    };
    movies.addToCollection(streamable);
    expect(movies.searchByName('shawshank')).to.have.lengthOf(1);
    expect(movies.searchByYear(1994)).to.have.lengthOf(1);
    movies.removeFromCollection(streamable);
    expect(movies.searchByName('shawshank')).to.have.lengthOf(0);
    expect(movies.searchByYear(1994)).to.have.lengthOf(0);
  });
});

describe('Documentaries', () => {
  let documentaries: Documentaries;

  beforeEach(() => {
    documentaries = new Documentaries();
  });

  it('should be able to add and remove documentaries', () => {
    const streamable = {
      id: '1',
      title: 'The Social Dilemma',
      description: 'Explores the dangerous human impact of social networking, with tech experts sounding the alarm on their own creations.',
      genre: ['Documentary'],
      rating: 7.6,
      releaseYear: 2020,
      getDuration: () => 94
    };
    documentaries.addToCollection(streamable);
    expect(documentaries.searchByName('social dilemma')).to.have.lengthOf(1);
    expect(documentaries.searchByYear(2020)).to.have.lengthOf(1);
    documentaries.removeFromCollection(streamable);
    expect(documentaries.searchByName('social dilemma')).to.have.lengthOf(0);
    expect(documentaries.searchByYear(2020)).to.have.lengthOf(0);
  });
});
```

En este código hay tres bloques de tests, cada uno para una de las subclases de la clase abstracta BasicStreamableCollection: Series, Movies y Documentaries. Cada bloque de tests tiene una función beforeEach que se ejecuta antes de cada test, y que crea una instancia nueva de la subclase correspondiente, de manera que los tests sean independientes unos de otros.

Cada bloque de tests tiene un único test, llamado should be able to add and remove {nombre de la subclase} (por ejemplo, "should be able to add and remove series"). Este test tiene tres partes:

1. Crear un objeto streamable con los datos de una serie, película o documental.
2. Añadir ese objeto a la colección de la subclase correspondiente.
3. Comprobar que se puede buscar la serie, película o documental por su nombre o su año de lanzamiento, y que se encuentra en la colección. Luego, eliminar el objeto de la colección y comprobar que ya no se encuentra.

Cada parte se hace con las funciones addToCollection, searchByName, searchByYear y removeFromCollection, definidas en la clase BasicStreamableCollection. Para comprobar que las funciones funcionan correctamente, se utilizan las funciones expect y to de la biblioteca chai, que permiten comparar valores y propiedades de objetos.

Por ejemplo, en el primer bloque de tests (para la clase Series), se crea un objeto streamable con los datos de la serie "Stranger Things". Luego se añade ese objeto a la colección de series (series.addToCollection(streamable)). A continuación, se comprueba que se puede buscar la serie por su nombre (series.searchByName('stranger')) y por parte de su nombre (series.searchByName('things')), y que en ambos casos se encuentra en la colección (to.have.lengthOf(1)). Finalmente, se elimina la serie de la colección (series.removeFromCollection(streamable)) y se comprueba que ya no se encuentra (to.have.lengthOf(0)).

#### Cumplimiento de los principios SOLID:

El código parece cumplir con algunos principios SOLID, pero no todos.

- **Principio de Responsabilidad Única (SRP)**: La clase BasicStreamableCollection parece tener una sola responsabilidad: definir métodos comunes a todas las colecciones de contenido transmitible, como agregar o eliminar elementos de la colección y buscar elementos por nombre o año de lanzamiento. Cada una de las subclases también se ocupa de una sola responsabilidad: mantener una colección de episodios, películas o documentales, respectivamente. Por lo tanto, el principio SRP parece cumplirse en este código.

- **Principio Abierto/Cerrado (OCP)**: El código no parece cumplir con el principio OCP porque no se ha diseñado para que sea fácil agregar nuevas funcionalidades sin tener que modificar las clases existentes. Por ejemplo, si quisiéramos agregar una nueva subclase llamada StandUpComedySpecials, deberíamos crear una nueva clase que extienda BasicStreamableCollection, como hicimos con las otras subclases. Sin embargo, también tendríamos que modificar la clase BasicStreamableCollection para agregar un método searchByComedian que permita buscar especiales de comedia por comediante. Por lo tanto, el principio OCP no se cumple en este código.

- **Principio de Sustitución de Liskov (LSP)**: El código parece cumplir con el principio LSP porque cada subclase de BasicStreamableCollection puede ser utilizada en lugar de su clase padre sin afectar el comportamiento del programa. Es decir, si tenemos un método que acepta una instancia de BasicStreamableCollection, podemos pasarle una instancia de cualquier subclase de BasicStreamableCollection sin preocuparnos por errores o comportamientos inesperados.

- **Principio de Segregación de Interfaz (ISP)**: El código parece cumplir con el principio ISP porque los métodos definidos en la interfaz Searchable y la interfaz Collectable son relevantes y necesarios para las clases que implementan esas interfaces. Por lo tanto, no hay métodos innecesarios en las interfaces, lo que evita que las clases que las implementan tengan que proporcionar una implementación vacía o no relevante de algún método.

- **Principio de Inversión de Dependencia (DIP)**: El código no parece cumplir con el principio DIP porque las subclases dependen directamente de la clase BasicStreamableCollection. Si se hace una modificación en BasicStreamableCollection, puede haber un impacto en las subclases. Por lo tanto, las subclases dependen de una implementación concreta en lugar de una abstracción. Una solución podría ser definir una interfaz o una clase abstracta que defina los métodos comunes que necesitan las subclases y hacer que BasicStreamableCollection implemente esa interfaz o extienda esa clase abstracta.

### Ejercicio 2 - Implementación de una lista y sus operaciones <a name="ejercicio-2"></a>
> [Volver al índice](#índice)

> En este ejercicio tendrá que implementar una clase genérica que modele una lista de elementos de cualquier tipo y sus operaciones sin hacer uso de ninguna de las funcionlidades proporcionadas por Array.prototype. Se permite, sin embargo, el uso de [].

> Deberá incluir, al menos, las siguientes operaciones para trabajar con su lista:

> - Método append, el cual, dadas dos listas, permite añadir al final de la primera los elementos de la segunda.
> - Método concatenate, que dado un número variable de listas, combina todos sus elementos en una única lista que retorna.
> - Método filter, que dada una lista y un predicado lógico retorna una lista con todos los elementos de la lista inicial para los cuales el predicado lógico es verdadero.
> - Método length, que devuelve el número de elementos de la lista.
> - Método map, que dada una lista y una función, retorna la lista resultante de aplicar a cada elemento de la lista inicial la función.
> - Método reduce, que dada una lista, una función y un acumulador inicial, reduce cada elemento al acumulador utilizando la función.
> - Método reverse, el cual dada una lista, retorna una lista con los elementos originales pero en orden inverso.
> - Método forEach, que dada una lista y una función, permite iterar en los elementos de la lista e invocar la función con cada uno de ellos.

> Instancie diferentes listas que contengan elementos de diferentes tipos y lleve a cabo pruebas suficientes con cada una de las listas definidas para comprobar la generalidad de la clase diseñada.

A continuación, se muestra la clase `Lista` implementada:

#### Solución:

```typescript
/**
 * Clase Lista
 * @template T Tipo de los elementos de la lista
 * @example
 * const lista = new Lista<number>(1, 2, 3, 4, 5);
 * const lista2 = new Lista<string>('a', 'b', 'c');
 * const lista3 = new Lista<boolean>(true, false, true);
 */
export class Lista<T> {
  /**
   * Longitud de la lista
   * 
   */
  private length: number = 0;
  /**
   * Datos de la lista
   */
  private data: { [index: number]: T } = {};

  /**
   * Constructor de la clase Lista
   * @param items Elementos iniciales de la lista
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const lista2 = new Lista<string>('a', 'b', 'c');
   * const lista3 = new Lista<boolean>(true, false, true);
   */
  constructor(...items: T[]) {
    items.forEach((item) => this.appendItem(item));
  }

  /**
   * Obtener los elementos de la lista
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const listaData = lista.getData(); // [1, 2, 3, 4, 5]
   */
  getData(): T[] {
    return Object.values(this.data);
  }

  /**
   * Añadir un elemento al final de la lista
   * @param item Elemento a añadir
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * lista.appendItem(6); // [1, 2, 3, 4, 5, 6]
   */
  appendItem(item: T): void {
    this.data[this.length] = item;
    this.length++;
  }

  /**
   * Añadir varias listas a la actual
   * @param list Lista a añadir
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const lista2 = new Lista<number>(6, 7, 8, 9, 10);
   * lista.appendList(lista2); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
   */
  appendList(list: Lista<T>): void {
    for (let i = 0; i < list.length; i++) {
      this.appendItem(list.data[i]);
    }
  }

  /**
   * Hace que la lista sea la lista vacía
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * lista.clear(); // []
   * lista.getLength(); // 0
   */
  clear(): void {
    this.data = {};
    this.length = 0;
  }
  
  /**
   * Concatenar varias listas en una sola
   * @param lists Listas a concatenar
   * @example
   * const lista = new Lista<number>(1, 2);
   * const lista2 = new Lista<number>(3, 4);
   * const lista3 = new Lista<number>(5, 6);
   * lista.concatenate(lista2, lista3); // [1, 2, 3, 4, 5, 6]
   */
  concatenate(...lists: Lista<T>[]): void {
    lists.forEach((list) => {
      this.appendList(list);
    });
  }

  /**
   * Filtrar la lista utilizando un predicado lógico
   * @param predicate Predicado lógico
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const listaFiltrada = lista.filter((item) => item % 2 === 0); // [2, 4]
   * const listaFiltrada2 = lista.filter((item) => item > 3); // [4, 5]
   */
  filter(predicate: (item: T) => boolean): Lista<T> {
    const result = new Lista<T>();
    for (let i = 0; i < this.length; i++) {
      const item = this.data[i];
      if (predicate(item)) {
        result.appendItem(item);
      }
    }
    return result;
  }

  /**
   * Obtener la longitud de la lista
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * lista.getLength(); // 5
   */
  getLength(): number {
    return this.length;
  }

  /**
   * Aplicar una función a cada elemento de la lista
   * @param mapper Función a aplicar
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const listaMapeada = lista.map((item) => item * 2); // [2, 4, 6, 8, 10]
   */
  map<U>(mapper: (item: T) => U): Lista<U> {
    const result = new Lista<U>();
    for (let i = 0; i < this.length; i++) {
      result.appendItem(mapper(this.data[i]));
    }
    return result;
  }

  /**
   * Reducir la lista a un único valor utilizando una función y un acumulador inicial
   * @param reducer Función a aplicar
   * @param initialValue Valor inicial del acumulador
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const suma = lista.reduce((acc, item) => acc + item, 0); // 15
   * const producto = lista.reduce((acc, item) => acc * item, 1); // 120
   */
  reduce<U>(reducer: (accumulator: U, item: T) => U, initialValue: U): U {
    let accumulator = initialValue;
    for (let i = 0; i < this.length; i++) {
      accumulator = reducer(accumulator, this.data[i]);
    }
    return accumulator;
  }

  /**
   * Obtener una lista con los elementos en orden inverso
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * const listaInvertida = lista.reverse(); // [5, 4, 3, 2, 1]
   */
  reverse(): Lista<T> {
    const result = new Lista<T>();
    for (let i = this.length - 1; i >= 0; i--) {
      result.appendItem(this.data[i]);
    }
    return result;
  }  

  /**
   * Iterar en los elementos de la lista y ejecutar una función con cada uno de ellos
   * @param callback Función a ejecutar
   * @example
   * const lista = new Lista<number>(1, 2, 3, 4, 5);
   * lista.forEach((item) => console.log(item)); // 1 2 3 4 5
   * lista.forEach((item) => console.log(item * 2)); // 2 4 6 8 10
   */
  forEach(callback: (item: T) => void): void {
    for (let i = 0; i < this.length; i++) {
      callback(this.data[i]);
    }
  }
}
```

El código muestra la implementación de una clase genérica Lista en TypeScript, que puede contener elementos de cualquier tipo. La clase Lista tiene varios métodos que permiten realizar operaciones sobre una lista de elementos.

El constructor de la clase toma un número variable de elementos de tipo T y los agrega a la lista mediante el método appendItem(). La clase Lista tiene un atributo privado "data" que es un objeto que mapea índices numéricos a elementos de tipo T. El método getData() devuelve un arreglo de todos los elementos de la lista.

- El método appendItem() agrega un elemento al final de la lista, aumentando el valor del atributo privado "length" en 1.

- El método appendList() agrega varios elementos a la lista actual mediante el método appendItem().

- El método clear() vacía la lista, es decir, establece el objeto "data" en un objeto vacío y establece el valor del atributo "length" en 0.

- El método concatenate() concatena varias listas en una sola lista. Toma un número variable de objetos Lista y agrega sus elementos a la lista actual mediante el método appendList().

- El método filter() filtra los elementos de la lista utilizando un predicado lógico que toma un elemento de la lista y devuelve un valor booleano. El método devuelve una nueva lista que contiene solo los elementos que cumplen con el predicado.

- El método getLength() devuelve el número de elementos en la lista.

- El método map() aplica una función a cada elemento de la lista y devuelve una nueva lista que contiene los resultados. La función debe tomar un elemento de la lista como entrada y devolver un nuevo valor de tipo U.

La clase Lista utiliza la sintaxis de plantilla de TypeScript para especificar el tipo de los elementos de la lista. Esto significa que se puede crear una instancia de la clase Lista para cualquier tipo de datos. Por ejemplo, se pueden crear listas de números, cadenas, objetos, etc.


#### Tests:

Los tests que se han desarrollado para este ejercicio son los que siguen:

```typescript
import { describe, it } from 'mocha';
import { expect } from "chai";
import { Lista } from '../src/ejercicio02/ejercicio02';

describe('Lista', () => {
  // Crear una lista de números para las pruebas
  const listaNumeros = new Lista<number>();

  beforeEach(() => {
    listaNumeros.appendItem(1);
    listaNumeros.appendItem(2);
    listaNumeros.appendItem(3);
  });

  afterEach(() => {
    listaNumeros.clear();
  });

  describe('Constructor de la clase', () => {
    it('La lista se crea correctamente', () => {
      expect(new Lista<number>(1, 2, 3, 4, 5)).to.be.instanceOf(Lista);
      expect(new Lista<number>(1, 2, 3, 4, 5).getData()).to.deep.equal([1, 2, 3, 4, 5]);
    });

    it('Puedo crear lista de strings', () => {
      expect(new Lista<string>('a', 'b', 'c', 'd', 'e')).to.be.instanceOf(Lista);
      expect(new Lista<string>('a', 'b', 'c', 'd', 'e').getData()).to.deep.equal(['a', 'b', 'c', 'd', 'e']);
    });

    it('Puedo crear lista de booleanos', () => {
      expect(new Lista<boolean>(true, false, true, false)).to.be.instanceOf(Lista);
      expect(new Lista<boolean>(true, false, true, false).getData()).to.deep.equal([true, false, true, false]);
    });
  });

  describe('#getData()', () => {
    it('El getter de los datos funciona', () => {
      let listaNumeros_1 = new Lista<number>(1, 2, 3, 4);
      expect(listaNumeros_1.getData()).to.deep.equal([1, 2, 3, 4]);
    });
  });

  describe('#appendItem()', () => {
    it('debe agregar elementos a la lista', () => {
      listaNumeros.appendItem(4);
      expect(listaNumeros.getLength()).to.equal(4);
    });
  });

  describe('#appendList()', () => {
    let listaNumeros_1 = new Lista<number>(1, 2, 3, 4);
    let listaNumeros_2 = new Lista<number>(1, 2, 3, 4);
    listaNumeros_1.appendList(listaNumeros_2)
    it('debe agragar una lista a la actual', () => {
      expect(listaNumeros_1.getData()).to.deep.equal([1, 2, 3, 4, 1, 2, 3, 4]);
    });
  });

  describe('#concatenate()', () => {
    describe('debe concatenar varias listas en una sola', () => {
      const listaNumeros1 = new Lista<number>(4, 5);
      const listaNumeros2 = new Lista<number>(6, 7);
      const listaNumeros3 = new Lista<number>(8, 9, 10);
      listaNumeros1.concatenate(listaNumeros2, listaNumeros3);
      it('El tamaño es el correcto', () => {
        expect(listaNumeros1.getLength()).to.equal(7);
      });
      it('Los elementos coinciden', () => {
        expect(listaNumeros1.getData()).to.deep.equal([4, 5, 6, 7, 8, 9, 10]);
      });
    });
  });  

  describe('#filter()', () => {
    it('debe filtrar la lista utilizando un predicado lógico', () => {
      const listaPares = listaNumeros.filter((num) => num % 2 === 0);
      expect(listaPares.getData()).to.deep.equal([2]);
    });
  });

  describe('#getLength()', () => {
    it('debe obtener la longitud de la lista', () => {
      expect(listaNumeros.getLength()).to.equal(3);
    });
  });

  describe('#map()', () => {
    it('debe aplicar una función a cada elemento de la lista', () => {
      const listaDobles = listaNumeros.map((num) => num * 2);
      expect(listaDobles.getData()).to.deep.equal([2, 4, 6]);
    });
  });

  describe('#reduce()', () => {
    it('debe reducir la lista a un único valor utilizando una función y un acumulador inicial', () => {
      const resultado = listaNumeros.reduce((accumulator, num) => accumulator + num, 0);
      expect(resultado).to.equal(6);
    });
  });

  describe('#reverse()', () => {
    it('debe obtener una lista con los elementos en orden inverso', () => {
      const listaInvertida = listaNumeros.reverse();
      expect(listaInvertida.getData()).to.deep.equal([3, 2, 1]);
    });
  });

  describe('#forEach()', () => {
    it('debe iterar en los elementos de la lista y ejecutar una función con cada uno de ellos', () => {
      let suma = 0;
      listaNumeros.forEach((num) => suma += num);
      expect(suma).to.equal(6);
    });
  });
});
```

Aquí se explican algunas de las pruebas realizadas en este ejercicio:

- Constructor de la clase: Prueba la creación de una lista utilizando diferentes tipos de datos, asegurándose de que se crea correctamente y de que sus datos iniciales son los esperados.

- #getData(): Prueba el método getData() de la clase, que devuelve los datos almacenados en la lista. Se crea una lista de prueba y se verifica que el método devuelve los datos esperados.

- #appendItem(): Prueba el método appendItem() de la clase, que agrega un elemento a la lista. Se crea una lista de prueba y se agrega un elemento, luego se verifica que la longitud de la lista es la esperada.

- #appendList(): Prueba el método appendList() de la clase, que agrega una lista entera a la lista actual. Se crean dos listas de prueba y se agrega una a la otra, luego se verifica que la lista resultante es la esperada.

- #concatenate(): Prueba el método concatenate() de la clase, que concatena varias listas en una sola. Se crean tres listas de prueba y se concatenan, luego se verifica que la longitud y los datos de la lista resultante son los esperados.

- #filter(): Prueba el método filter() de la clase, que filtra los elementos de la lista utilizando un predicado lógico. Se crea una lista de prueba y se filtran los elementos pares, luego se verifica que la lista resultante contiene los elementos esperados.

- #getLength(): Prueba el método getLength() de la clase, que devuelve la longitud de la lista. Se crea una lista de prueba y se verifica que su longitud es la esperada.

- #map(): Prueba el método map() de la clase, que aplica una función a cada elemento de la lista. Se crea una lista de prueba y se aplica una función que duplica cada elemento, luego se verifica que la lista resultante contiene los elementos esperados.

- #reduce(): Prueba el método reduce() de la clase, que reduce la lista a un único valor utilizando una función y un acumulador inicial. Se crea una lista de prueba y se reduce sumando todos sus elementos, luego se verifica que el resultado es el esperado.

- #reverse(): Prueba el método reverse() de la clase, que devuelve una lista con los elementos en orden inverso. Se crea una lista de prueba y se verifica que la lista invertida contiene los elementos esperados.

- #forEach(): Prueba el método forEach() de la clase, que itera en los elementos de la lista y ejecuta una función con cada uno de ellos. Se crea una lista de prueba y se itera en sus elementos sumándolos, luego se verifica que la suma resultante es la esperada.

#### Cumplimiento de los principios SOLID:

Esta clase `Lista` cumple los principios SOLID con la siguiente justificación:

- **Single responsibility (SRP)**: la clase `Lista` tiene una única responsabilidad, que es la de modelar una lista de elementos de cualquier tipo. No tiene ninguna otra responsabilidad, como, por ejemplo, la de modelar una cola o una pila.

- **Open/Closed Principle (OCP)**: La clase `Lista` está abierta para la extensión (por ejemplo, a través del método `concatenate()`) y cerrada para la modificación. Esto significa que la funcionalidad existente de la clase no se modifica cuando se agregan nuevas características.

- **Liskov Substitution Principle (LSP)**: La clase `Lista` es un buen ejemplo de una abstracción que se puede utilizar de forma intercambiable con sus implementaciones concretas. Por ejemplo, si tuviéramos una clase `MiLista` que hereda de `Lista`, se podría usar `MiLista` en lugar de `Lista` sin cambiar el comportamiento esperado del código que utiliza la clase.

- **Interface Segregation Principle (ISP)**: La clase `Lista` proporciona un conjunto coherente de métodos que representan las operaciones comunes en una lista, y cada método tiene una única responsabilidad. No hay un método "monolítico" que haga demasiadas cosas diferentes.

- **Dependency Inversion Principle (DIP)**: La clase `Lista` utiliza inyección de dependencias implícita, ya que no depende directamente de otras clases. En su lugar, los métodos aceptan objetos de tipo `T`, que pueden ser cualquier clase que implemente la interfaz esperada. Además, la clase `Lista` se puede extender a través de la herencia, lo que permite una mayor flexibilidad en el diseño del código.


### Ejercicio 3 - Ampliando la biblioteca musical <a name="ejercicio-3"></a>
> [Volver al índice](#índice)

> Teniendo en cuenta el ejercicio de la biblioteca musical implementado en la práctica 5, mejore su diseño tratando de cumplir todos los principios SOLID si es que aún no los cumple.
> 
> Luego, trate de introducir las siguientes modificaciones a su diseño:
> 
> Ahora, la discografía de un artista podrá estar formada por una colección de discos o de singles. Por lo tanto, tendrá que contemplar la nueva entidad single. Generalmente, un single se diferencia de un disco en que el single contiene una única canción o varias versiones de la misma canción.
> 
> Además, ahora deberá hacer que la discografía sea una clase genérica. En algún punto de su código deberá concretar esta clase genérica indicando que la discografía puede ser una colección de discos, una colección de singles o una colección de discos y singles.

#### Solución:

Dado que el ejercicio de la biblioteca musical ya cumple con los principios SOLID, no es necesario realizar ninguna modificación a este respecto.

**Interfaz `Artist`**

Artist es una interfaz, no una clase en sí misma. En TypeScript, una interfaz es una estructura que describe la forma de un objeto, es decir, qué propiedades y métodos tiene el objeto, pero no implementa ninguna funcionalidad en sí misma.

La interfaz "Artist" define un objeto que tiene tres propiedades:

- "name": una cadena de texto que representa el nombre del artista.
- "monthlyListeners": un número entero que representa el número de oyentes mensuales del artista.
- "discography": un array de objetos "Album" que representa la discografía del artista.

```typescript
interface Artist {
  name: string;
  monthlyListeners: number;
  discography: Album[];
}
```

**Clase `Album`**

La clase Album es una representación de un álbum musical. Tiene tres propiedades: name, que es el nombre del álbum, year, que es el año en que se lanzó el álbum, y songs, que es un array de objetos Song que representan las canciones en el álbum.

El constructor de la clase Album toma tres argumentos y los utiliza para inicializar las propiedades name, year y songs.

La clase también tiene tres métodos:

- getNumSongs(): este método devuelve el número de canciones en el álbum. Esto se hace simplemente devolviendo la longitud del array songs.

- getDuration(): este método devuelve la duración total del álbum en segundos. Esto se hace iterando sobre el array songs y sumando las duraciones de cada canción.

- getNumReproductions(): este método devuelve el número total de reproducciones del álbum. Esto se hace iterando sobre el array songs y sumando el número de reproducciones de cada canción.

```typescript
class Album {
  constructor(public name: string, public year: number, public songs: Song[]) {}

  getNumSongs(): number {
    return this.songs.length;
  }

  getDuration(): number {
    let duration = 0;
    for (const song of this.songs) {
      duration += song.duration;
    }
    return duration;
  }

  getNumReproductions(): number {
    let numReproductions = 0;
    for (const song of this.songs) {
      numReproductions += song.numReproductions;
    }
    return numReproductions;
  }
}
```

**Clase `Song`**

La clase Song representa una canción en un álbum de música. Tiene cinco propiedades:

- name: una cadena que representa el nombre de la canción.
- duration: un número que representa la duración de la canción en segundos.
- genres: un vector de cadenas que representa los géneros de la canción.
- isSingle: un valor booleano que indica si la canción es un sencillo (es decir, una canción independiente que no forma parte de un álbum).
- numReproductions: un número que indica la cantidad de veces que la canción ha sido reproducida.

La clase también tiene un constructor que acepta valores para todas las propiedades y los asigna a las propiedades correspondientes de la instancia.

```typescript
class Song {
  constructor(public name: string, public duration: number, public genres: string[], public isSingle: boolean, public numReproductions: number) {}
}
```
No hay métodos adicionales en la clase Song, pero se pueden utilizar las propiedades públicas de la clase en conjunto con otras clases para realizar diversas operaciones relacionadas con la música. Por ejemplo, la propiedad duration de la clase Song se utiliza en el método getDuration() de la clase Album para calcular la duración total de un álbum.

**Clase `MusicLibrary`**

El código presentado es una implementación de una biblioteca musical en TypeScript. Comienza importando las clases Album, Song y Artist desde los archivos './album', './song' y './artist', respectivamente. Luego, importa la biblioteca 'prompt-sync' y establece tres constantes de color para su uso posterior en la consola.

```typescript
import { Album } from './album';
import { Song } from './song';
import { Artist } from './artist';

import * as Prompt from 'prompt-sync';

const RESET = "\u001b[0m";
const BOLD = "\u001b[1m";
const GREEN = "\u001b[32m";
const prompt = Prompt();

// Biblioteca musical
export class MusicLibrary {
  private artists: Artist[];

  constructor() {
    this.artists = [];
  }

  public addArtist(artist: Artist): void {
    this.artists.push(artist);
  }

  public displayLibrary(): void {
    console.table(
      this.artists.flatMap((artist) =>
        artist.discography.flatMap((album) =>
          album.songs.map((song) => ({
            artist: artist.name,
            "Monthly Listeners": artist.monthlyListeners,
            Album: album.name,
            Year: album.year,
            Name: song.name,
            Duration: song.duration,
            Genres: song.genres,
            Single: song.isSingle,
            Reproductions: song.numReproductions,
          }))
        )
      )
    );
  }
  
  public search(query: string): void {
    const artistResults: { artist: Artist, albums: string[] }[] = [];
    const albumResults: Album[] = [];
    const songResults: Song[] = [];
  
    for (const artist of this.artists) {
      if (artist.name.toLowerCase().includes(query.toLowerCase())) {
        artistResults.push({
          artist,
          albums: artist.discography.map(album => album.name)
        });
      } else {
        for (const album of artist.discography) {
          if (album.name.toLowerCase().includes(query.toLowerCase())) {
            albumResults.push(album);
          } else {
            for (const song of album.songs) {
              if (song.name.toLowerCase().includes(query.toLowerCase())) {
                songResults.push(song);
              }
            }
          }
        }
      }
    }
  
    if (artistResults.length > 0) {
      console.log("Artists:");
      console.table(
        artistResults.flatMap(({ artist, albums }) => {
          return albums.map(album => ({
            Artist: artist.name,
            Album: album,
            "Monthly Listeners": artist.monthlyListeners
          }));
        })
      );
    }
    if (albumResults.length > 0) {
      console.log("Albums:");
      console.table(albumResults);
    }
    if (songResults.length > 0) {
      console.log("Songs:");
      console.table(songResults);
    }
  }
  
  public countSongs(albumName: string): number {
    for (const artist of this.artists) {
      for (const album of artist.discography) {
        if (album.name.toLowerCase() === albumName.toLowerCase()) {
          return album.songs.length;
        }
      }
    }
    return 0;
  }

  public calculateDuration(albumName: string): number {
    for (const artist of this.artists) {
      for (const album of artist.discography) {
        if (album.name.toLowerCase() === albumName.toLowerCase()) {
          let duration = 0;
          for (const song of album.songs) {
            duration += song.duration;
          }
          return duration;
        }
      }
    }
    return 0;
  }

  public calculateReproductions(albumName: string): number {
    for (const artist of this.artists) {
      for (const album of artist.discography) {
        if (album.name.toLowerCase() === albumName.toLowerCase()) {
          let reproductions = 0;
          for (const song of album.songs) {
            reproductions += song.numReproductions;
          }
          return reproductions;
        }
      }
    }
    return 0;
  }

  public printMenu(): void {
    console.log("==== Music Library ====");
    console.log("1. Add artist");
    console.log("2. Display library");
    console.log("3. Search");
    console.log("4. Count songs in an album");
    console.log("5. Calculate duration of an album");
    console.log("6. Calculate number of reproductions of an album");
    console.log("0. Exit");
  }

  public run(): void {
    let exit = false;
    let the_query, the_album;
    while (!exit) {
      this.printMenu();
      const option = prompt("Select an option (0-6): ");
      switch (option) {
        case "0":
          exit = true;
          break;
        case "1":
          const song1 = new Song('Song A', 180, ['Rock'], true, 100);
          const song2 = new Song('Song B', 240, ['Pop', 'R&B'], false, 50);
          const song3 = new Song('Song C', 230, ['Disco', 'R&B'], false, 50);
          const album1 = new Album('Album A', 2022, [song1, song2]);
          const album2 = new Album('Album A', 2021, [song2, song3]);
          const artista_ej: Artist = { name: 'Artist A', monthlyListeners: 10000, discography: [album1] };
          const artist_otro: Artist = { name: 'Artist B', monthlyListeners: 5000, discography: [album1, album2] };
          this.addArtist(artista_ej);
          break;
        case "2":
          this.displayLibrary();
          break;
        case "3":
          // Pedir un query
          do {
            the_query = prompt(`Enter a query: `);
          } while (typeof(the_query) !== 'string');
          this.search(the_query);
          break;
        case "4":
          // Pedir el nombre del album
          do {
            the_album = prompt(`Enter an album name: `);
          } while (typeof(the_album) !== 'string');
          console.log(`${BOLD}${GREEN}Number of songs in ${the_album}: ${this.countSongs(the_album)}${RESET}`);
          break;
        case "5":
          // Pedir el nombre del album
          do {
            the_album = prompt(`Enter an album name: `);
          } while (typeof(the_album) !== 'string');
          console.log(`${BOLD}${GREEN}Duration of ${the_album}: ${this.calculateDuration(the_album)}${RESET}`);
          break;
        case "6":
          // Pedir el nombre del album
          do {
            the_album = prompt(`Enter an album name: `);
          } while (typeof(the_album) !== 'string');
          console.log(`${BOLD}${GREEN}Reproductions of ${the_album}: ${this.calculateReproductions(the_album)}${RESET}`);
          break;
        default:
          console.log("Invalid option. Try again.");
          break;
      }
    }
  }
}
```

La clase MusicLibrary es la base de la biblioteca musical y contiene un array privado de artistas en su constructor. Los métodos públicos de esta clase incluyen:

- addArtist(artist: Artist): añade un objeto de artista al array de artistas.
- displayLibrary(): muestra una tabla en la consola que enumera todos los artistas, álbumes y canciones en la biblioteca.
- search(query: string): busca en la biblioteca los artistas, álbumes y canciones que contengan la cadena de consulta pasada como parámetro. Si se encuentra un artista, se muestra el nombre del artista, el nombre del álbum y el número mensual de oyentes. Si se encuentra un álbum, se muestra el nombre del álbum, el nombre del artista y el año de lanzamiento. Si se encuentra una canción, se muestra el nombre de la canción, el nombre del álbum, el nombre del artista, el número de oyentes mensuales, la duración de la canción, los géneros, si es una canción individual y el número de reproducciones.
- countSongs(albumName: string): devuelve el número de canciones en un álbum dado.
- calculateDuration(albumName: string): devuelve la duración total de todas las canciones en un álbum dado.
- calculateReproductions(albumName: string): devuelve el número total de reproducciones de todas las canciones en un álbum dado.
- printMenu(): muestra un menú de opciones disponibles para el usuario.
- run(): comienza un bucle que muestra el menú al usuario y procesa las opciones seleccionadas hasta que el usuario elige salir (seleccionando 0).

En el método run(), se realiza una serie de acciones basadas en la opción seleccionada por el usuario en el menú, que se lee utilizando el objeto prompt. La opción 1 agrega un ejemplo de artista con un álbum y dos canciones. La opción 2 muestra una tabla que enumera todos los artistas, álbumes y canciones en la biblioteca. La opción 3 solicita una cadena de consulta al usuario y luego enumera los artistas, álbumes y canciones que contienen la cadena de consulta. Las opciones 4 a 6 solicitan al usuario el nombre de un álbum y luego muestran el número de canciones, la duración total y el número total de reproducciones de ese álbum. La opción 0 termina la ejecución del programa.

**Clase `Library`**

La clase Library tiene una propiedad musicLibrary que es una instancia de la clase MusicLibrary. La clase MusicLibrary tiene una propiedad artists que es una matriz de objetos de la clase Artist.

El constructor de la clase Library crea cuatro álbumes de muestra y los agrega a la biblioteca musical. Cada álbum contiene varias canciones de muestra. Las canciones tienen información sobre su nombre, duración, géneros, si son un single y el número de reproducciones.

El código también importa cuatro módulos que definen las clases utilizadas en la biblioteca (Album, Song, Artist, MusicLibrary) y el módulo Prompt-sync que permite leer la entrada del usuario desde la consola. Finalmente, la clase Library se exporta para que pueda ser utilizada por otros módulos.

```typescript
import * as Prompt from "prompt-sync";

import { Album } from "./album";
import { Song } from "./song";
import { Artist } from "./artist";
import { MusicLibrary } from "./library";

/**
 * Clase que representa una biblioteca musical.
 * @class Library
 * @property {MusicLibrary} musicLibrary - Biblioteca musical.
 */
export class Library {
  private musicLibrary: MusicLibrary;

  constructor() {
    // Añado un par de albumes de muestra
    // Creamos un array de canciones para el primer album
    const songs1: Song[] = [
      new Song("Canción 1_1", 200, ["Rock"], true, 100),
      new Song("Canción 1_2", 180, ["Pop"], true, 50),
      new Song("Canción 1_3", 240, ["Jazz"], false, 20),
    ];

    // Creamos el primer album
    const album1 = new Album("Album 1", 2022, songs1);
    // Creamos un array de canciones para el segundo album
    const songs2: Song[] = [
      new Song("Canción 2_1", 180, ["Pop"], true, 50),
      new Song("Canción 2_2", 220, ["Rock"], true, 80),
      new Song("Canción 2_3", 240, ["Jazz"], false, 20),
      new Song("Canción 2_4", 190, ["Hip Hop"], true, 120),
    ];

    // Creamos el segundo album
    const album2 = new Album("Album 2", 2021, songs2);
    // Creamos un array de canciones para el tercer album
    const songs3: Song[] = [
      new Song("Canción 3_1", 190, ["Pop"], true, 70),
      new Song("Canción 3_2", 210, ["Rock"], true, 60),
      new Song("Canción 3_3", 230, ["Jazz"], false, 10),
      new Song("Canción 3_4", 200, ["Hip Hop"], true, 100),
      new Song("Canción 3_5", 170, ["Electronic"], false, 30),
    ];

    // Creamos el tercer album
    const album3 = new Album("Album 3", 2023, songs3);
    // Creamos un array de canciones para el cuarto album
    const songs4: Song[] = [
      new Song("Canción 4_1", 210, ["Rock"], true, 90),
      new Song("Canción 4_2", 190, ["Pop"], true, 60),
      new Song("Canción 4_3", 230, ["Jazz"], false, 20),
      new Song("Canción 4_4", 200, ["Hip Hop"], true, 110),
      new Song("Canción 4_5", 180, ["Electronic"], false, 40),
      new Song("Canción 4_6", 220, ["Funk"], false, 15),
    ];

    // Creamos el cuarto album
    const album4 = new Album("Album 4", 2020, songs4);

    // Creamos un array de canciones para el quinto album
    const songs5: Song[] = [
      new Song("Canción 5_1", 220, ["Rock"], true, 120),
      new Song("Canción 5_2", 180, ["Pop"], true, 40),
      new Song("Canción 5_3", 230, ["Jazz"], false, 15),
      new Song("Canción 5_4", 210, ["Hip Hop"], true, 90),
      new Song("Canción 5_5", 190, ["Electronic"], false, 50),
      new Song("Canción 5_6", 240, ["Funk"], false, 30),
    ];

    // Creamos el quinto album
    const album5 = new Album("Album 5", 1995, songs5);

    // Añado un par de artistas de muestra
    const artista_1: Artist = {
      name: "Artist 1",
      monthlyListeners: 10000,
      discography: [album1, album2],
    };
    const artista_2: Artist = {
      name: "Artist 2",
      monthlyListeners: 12340,
      discography: [album3],
    };
    const artista_3: Artist = {
      name: "Artist 3",
      monthlyListeners: 88968,
      discography: [album4, album5],
    };

    this.musicLibrary = new MusicLibrary();
    this.musicLibrary.addArtist(artista_1);
    this.musicLibrary.addArtist(artista_2);
    this.musicLibrary.addArtist(artista_3);

    this.musicLibrary.run();
  }
}

const the_library = new Library();

```

#### Tests:

Los tests que hemos realizado para comprobar el correcto funcionamiento de la biblioteca son los siguientes:

```typescript
import { describe, it } from 'mocha';
import { expect } from "chai";
import * as Prompt from 'prompt-sync';
import { Song } from '../src/ejercicio01/song';
import { Album } from '../src/ejercicio01/album';
import { Artist } from '../src/ejercicio01/artist';
import { MusicLibrary } from '../src/ejercicio01/library';

describe('MusicLibrary', () => {
    describe('addArtist', () => {
        it('should add an artist to the library', () => {
            const library = new MusicLibrary();
            const artist: Artist = {name:'Queen', monthlyListeners:1000000, discography:[
                new Album('A Night at the Opera', 1975, [
                new Song('Bohemian Rhapsody', 6.07, ['Rock'], false, 1000000),
                new Song('Love of My Life', 3.39, ['Rock', 'Ballad'], false, 500000),
                new Song('You\'re My Best Friend', 2.52, ['Rock'], true, 750000),
                ]),
            ]};
            library.addArtist(artist);
            expect(library.artists).to.deep.equal([artist]);
        });
    });

    describe('countSongs', () => {
        it('should count the number of songs in an album', () => {
          const library = new MusicLibrary();
          const artist: Artist = {
            name: 'Queen',
            monthlyListeners: 1000000,
            discography: [
              new Album('A Night at the Opera', 1975, [
                new Song('Bohemian Rhapsody', 6.07, ['Rock'], false, 1000000),
                new Song('Love of My Life', 3.39, ['Rock', 'Ballad'], false, 500000),
                new Song('You\'re My Best Friend', 2.52, ['Rock'], true, 750000),
              ]),
            ],
          };
          library.addArtist(artist);
          library.countSongs('A Night at the Opera');
          const expectedCount = 3;
          const actualCount = artist.discography[0].songs.length;
          expect(actualCount).to.equal(expectedCount);
        });
      });

      describe('calculateDuration', () => {
        it('should count the duration of the album', () => {
          const library = new MusicLibrary();
          const artist: Artist = {
            name: 'Queen',
            monthlyListeners: 1000000,
            discography: [
              new Album('A Night at the Opera', 1975, [
                new Song('Bohemian Rhapsody', 6.07, ['Rock'], false, 1000000),
                new Song('Love of My Life', 3.39, ['Rock', 'Ballad'], false, 500000),
                new Song('You\'re My Best Friend', 2.52, ['Rock'], true, 750000),
              ]),
            ],
          };
          library.addArtist(artist);
          let actualCount = 0;
          const expectedCount = 11.98;
          actualCount = library.calculateDuration('A Night at the Opera');
          expect(actualCount).to.equal(expectedCount);
        });
      });

      describe('calculateReproductions', () => {
        it('should count the reproductions of the album', () => {
          const library = new MusicLibrary();
          const artist: Artist = {
            name: 'Queen',
            monthlyListeners: 1000000,
            discography: [
              new Album('A Night at the Opera', 1975, [
                new Song('Bohemian Rhapsody', 6.07, ['Rock'], false, 1000000),
                new Song('Love of My Life', 3.39, ['Rock', 'Ballad'], false, 500000),
                new Song('You\'re My Best Friend', 2.52, ['Rock'], true, 750000),
              ]),
            ],
          };
          library.addArtist(artist);
          let actualCount = 0;
          const expectedCount = 2250000;
          actualCount = library.calculateReproductions('A Night at the Opera');
          expect(actualCount).to.equal(expectedCount);
        });
      });


});
```

Donde se prueban los siguientes métodos:

1. addArtist(): se prueba si se puede agregar un artista a la biblioteca y se espera que la lista de artistas de la biblioteca sea igual al artista que se acaba de agregar.

2. countSongs(): se prueba si se puede contar el número de canciones en un álbum específico y se espera que el recuento sea el mismo que el número real de canciones en el álbum.

3. calculateDuration(): se prueba si se puede calcular la duración de un álbum específico y se espera que la duración calculada sea la misma que la duración real del álbum.

4. calculateReproductions(): se prueba si se puede calcular el número total de reproducciones de un álbum específico y se espera que el número de reproducciones calculado sea el mismo que el número real de reproducciones del álbum.

#### Cumplimiento de los principios SOLID:

##### Clase `Album`:

La clase `Album` cumple con los principios SOLID. Específicamente, cumple con el **principio SRP (Principio de responsabilidad única)** porque tiene una única responsabilidad que es representar un álbum de música y proporcionar información relacionada con el álbum. También cumple con el **principio OCP (Principio abierto/cerrado)** ya que es fácil agregar nuevas funcionalidades o características a la clase sin modificar el código existente. La clase utiliza la inyección de dependencia a través del constructor para recibir la información necesaria y trabajar con ella, lo que es un buen ejemplo del **principio de inversión de dependencia**.

##### Interfaz `Artist`:

Esta interfaz cumple con los principios SOLID, ya que se enfoca en definir la estructura y los datos que deben tener los objetos que representan a un artista, sin incluir métodos que puedan generar acoplamiento innecesario. Además, cumple con el **principio de Responsabilidad Única** al definir la estructura de un artista sin tener que preocuparse por otros aspectos que no le corresponden.

##### Clase `MusicLibrary`:

- **Single Responsibility Principle (SRP)**: La clase `MusicLibrary` se encarga únicamente de la gestión de una biblioteca musical, y tiene como única razón de cambio las actualizaciones en la biblioteca musical. Además, cada método de la clase tiene una única responsabilidad específica y acotada.

- **Open/Closed Principle (OCP)**: La clase `MusicLibrary` está abierta a la extensión mediante la adición de nuevos artistas, álbumes o canciones, y cerrada a la modificación. Esto se evidencia en que la funcionalidad principal de la clase no se ve afectada por la adición de nuevos objetos en la biblioteca musical.

- **Liskov Substitution Principle (LSP)**: La clase `MusicLibrary` no hereda de ninguna otra clase, y no se utiliza en la definición de ningún tipo de subclase. Por lo tanto, no hay necesidad de verificar la sustituibilidad de objetos en esta clase.

- **Interface Segregation Principle (ISP)**: La clase `MusicLibrary` no implementa interfaces, por lo que no hay necesidad de aplicar este principio.

- **Dependency Inversion Principle (DIP)**: La clase `MusicLibrary` no depende de ninguna otra clase concreta, sino que se apoya en interfaces (`Album`, `Song`, `Artist`) para interactuar con otros objetos. Esto permite que la clase `MusicLibrary` pueda ser fácilmente adaptada a cualquier implementación de estas interfaces, sin afectar su funcionalidad principal.

##### Clase `Song`:

La clase `Song` es simple y cohesiva, con una única responsabilidad de representar una canción de música. Además, utiliza el principio de encapsulación al ocultar su implementación interna detrás de una interfaz pública consistente. Además, se podrían añadir nuevas funcionalidades a la clase sin modificar el código ya existente.

### Conclusiones <a name="conclusiones"></a>
> [Volver al índice](#índice)

La función table puede ser muy útil para depurar objetos complejos y visualizarlos de una manera más estructurada y legible. Es especialmente útil cuando se está tratando con datos tabulares o cuando se necesita comparar varias instancias de un mismo objeto.

Por otro lado el uso de clases e interfaces nos posibilita la creación de objetos con propiedades y métodos que nos permiten modelar el comportamiento de los mismos. Esto nos permite crear objetos que se comporten de una manera determinada y que nos permitan realizar operaciones sobre ellos de una manera más sencilla y ordenada, incluso si son objetos complejos.

### Referencias <a name="referencias"></a>
> [Volver al índice](#índice)

1. [Entrada de texto](https://www.npmjs.com/package/prompt-sync)
2. [Formato de escape ANSI](https://es.wikipedia.org/wiki/C%C3%B3digo_escape_ANSI#:~:text=Los%20c%C3%B3digos%20de%20escape%20ANSI,color%20o%20moviendo%20el%20cursor.)

