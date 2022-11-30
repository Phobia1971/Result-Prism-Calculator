import { readFileSync, writeFileSync } from 'node:fs';

const array4 = [];
const array5 = [];
const array6 = [];
const array7 = [];
const array8up = [];

const allFileContents = readFileSync('C:\\Nodejs\\real-hangman\\src\\data\\Woordenlijst.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line =>  {
  
  const split = line.split('>');
  const word = split.shift();
  if(word.length < 4) return;
  const defenition = split.join(' >');

  if(word.length === 4) array4.push({'word': word, 'defenition': defenition});
  if(word.length === 5) array5.push({'word': word, 'defenition': defenition});
  if(word.length === 6) array6.push({'word': word, 'defenition': defenition});
  if(word.length === 7) array7.push({'word': word, 'defenition': defenition});
  if(word.length >= 8 ) array8up.push({'word': word, 'defenition': defenition});

});

console.log('word-4:', array4.length);
write('4-letters', array4);
console.log('word-5:', array5.length);
write('5-letters', array5);
console.log('word-6:', array6.length);
write('6-letters', array6);
console.log('word-7:', array7.length);
write('7-letters', array7);
console.log('word-8up:', array8up.length);
write('8up-letters', array8up);

function write(name, data) {
  writeFileSync(`C:\\Nodejs\\real-hangman\\src\\data\\${name}.json`, JSON.stringify(data, null, ' '), "utf8");
}