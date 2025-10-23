import fs from 'node:fs';
import { EOL } from 'node:os';
console.info('Coloração Grafos...');

const content = fs.readFileSync('./docs/ListaTesteAColoracao.txt', { encoding: 'utf-8' });
const lines = content.split(EOL);
console.info({ lines });
