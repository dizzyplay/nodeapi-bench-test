const leven = require('.').leven;
const js = require('./leven.js');
const readline = require('readline');

const command = ['hello', 'hi', 'install', ...randomWord(6, 1000000)];
console.info(command[10]);

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
console.info(command.length);

rl.question('Input your command -> ', answer => {
	const relationCommand = command.filter(v => v !== answer).filter(v => v.length <= answer.length + 1 );

	console.info(relationCommand.length);
	console.time('rust');
	const partial2 = relationCommand.filter(v => {
		const result = leven(v,answer);
		return result  < 2 && result >= 0;
	});
	console.timeEnd('rust');

	//console.time('js');
	//const partial = relationCommand.filter(v => {
	//	const result = js.leven(v, answer);
	//	return result  < 2 && result >= 0;
	//});
	//console.timeEnd('js');

	rl.close();
	console.info(`did you mean this ? -> ${partial2.reduce((acc,v) => acc += v + ' ', '')}`);
});

function randomWord(len, size) {
	const result = [];
	for (let j = 0; j < size; j++) {
		const word = [];
		for (let i = 0; i < len; i++) {
			const randomChar = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
			word.push(randomChar);
		}
		result.push(word.join(''));
	}
	return result;
}
