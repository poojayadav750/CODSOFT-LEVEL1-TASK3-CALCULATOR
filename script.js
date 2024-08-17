const keys = document.querySelectorAll('.key');
const dinput = document.querySelector('.display .input');
const doutput = document.querySelector('.display .output');
let input = "";
for (let key of keys) {
	const value = key.dataset.key;
	key.addEventListener('click', () => {
		if (value == "clear") {
			input = "";
			dinput.innerHTML = "";
			doutput.innerHTML = "";
		} else if (value == "backspace") {
			input = input.slice(0, -1);
			dinput.innerHTML = cinput(input);
		} else if (value == "=") {
			let result = eval(uinput(input));
			doutput.innerHTML = uoutput(result);
		} else if (value == "brackets") {
			if (
				input.indexOf("(") == -1 || 
				input.indexOf("(") != -1 && 
				input.indexOf(")") != -1 && 
				input.lastIndexOf("(") < input.lastIndexOf(")")
			) {
				input += "(";
			} else if (
				input.indexOf("(") != -1 && 
				input.indexOf(")") == -1 || 
				input.indexOf("(") != -1 &&
				input.indexOf(")") != -1 &&
				input.lastIndexOf("(") > input.lastIndexOf(")")
			) {
				input += ")";
			}
			dinput.innerHTML = cinput(input);
		} else {
			if (ValidateInput(value)) {
				input += value;
				dinput.innerHTML = cinput(input);
			}
		}
	})
}
function cinput(input) {
	let iarray = input.split("");
	let l = iarray.length;
	for (let i = 0; i < l; i++) {
		if (iarray[i] == "*") {
			iarray[i] = ` <span class="operator">x</span> `;
		} else if (iarray[i] == "/") {
			iarray[i] = ` <span class="operator">÷</span> `;
		} else if (iarray[i] == "+") {
			iarray[i] = ` <span class="operator">+</span> `;
		} else if (iarray[i] == "-") {
			iarray[i] = ` <span class="operator">-</span> `;
		} else if (iarray[i] == "(") {
			iarray[i] = `<span class="brackets">(</span>`;
		} else if (iarray[i] == ")") {
			iarray[i] = `<span class="brackets">)</span>`;
		} else if (iarray[i] == "%") {
			iarray[i] = `<span class="percent">%</span>`;
		}
	}
	return iarray.join("");
}

function uoutput (output) {
	let output_string = output.toString();
	let decimal = output_string.split(".")[1];
	output_string = output_string.split(".")[0];
	let oarray = output_string.split("");
	if (oarray.length > 3) {
		for (let i = oarray.length - 3; i > 0; i -= 3) {
			oarray.splice(i, 0, ",");
		}
	}
	if (decimal) {
		oarray.push(".");
		oarray.push(decimal);
	}
	return oarray.join("");
}

function ValidateInput (value) {
	let last_input = input.slice(-1);
	let operators = ["+", "-", "*", "/"];
	if (value == "." && last_input == ".") {
		return false;
	}
	if (operators.includes(value)) {
		if (operators.includes(last_input)) {
			return false;
		} else {
			return true;
		}
	}
	return true;
}
function uinput (input) {
	let iarray = input.split("");
	for (let i = 0; i < iarray.length; i++) {
		if (iarray[i] == "%") {
			iarray[i] = "/100";
		}
	}
	return iarray.join("");
}