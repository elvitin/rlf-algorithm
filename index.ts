import fs from 'node:fs';
import { EOL } from 'node:os';

console.info('Coloração Grafos...');

//read content (List of List)
const content = fs.readFileSync('./docs/ListaTesteAColoracao.txt', { encoding: 'utf-8' });
const lines = content.split(EOL);
console.info({ lines });

//remove first lines of vertices
lines.shift();

//get list of list (v1)
const listOfList = lines.map(line => line.split(' '));
console.info({ listOfList });

//get list of list (v2)
const listOfListV2 = lines.reduce((prev, curr) => {
	const elements = curr.split(' ');
	const firstElement = elements.shift() as string;
	Reflect.set(prev, firstElement, elements);
	return prev;
}, {});
console.info({ listOfListV2 });

/*
  listOfListV2: {
    A: [ 'B', 'D' ],
    B: [ 'A', 'C' ],
    C: [ 'B', 'D', 'H' ],
    D: [ 'A', 'C', 'E', 'F' ],
    E: [ 'D', 'G' ],
    F: [ 'D', 'G' ],
    G: [ 'E', 'F' ],
    H: [ 'C', 'I' ],
    I: [ 'H' ]
  }

  get max item of listOfListV2 using native functions
*/

const queue: number[] = [];
