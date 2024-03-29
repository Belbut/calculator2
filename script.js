function Calculator(firstVariable = "0") {
    this.variables = [firstVariable];

    let result;

    this.addNumberInput = function (input) {
        let lastVariable = this.variables[this.variables.length - 1];

        if (isNaN(lastVariable)) {//last variable is a operator
            this.variables.push(input)
        } else {
            this.variables[this.variables.length - 1] = lastVariable + input
        }
    }

    this.addOperatorInput = function (input) {
        let lastVariable = this.variables[this.variables.length - 1];

        if (isNaN(lastVariable)) {//last variable is a operator
            this.variables.pop();
        }

        this.variables.push(input)

    }

    this.addCommaInput = function () {
        let lastVariable = this.variables[this.variables.length - 1];

        if (isNaN(lastVariable)) {//last variable is a operator
            this.variables.push(".")
        } else if (!lastVariable.includes(".")) {
            this.variables[this.variables.length - 1] = lastVariable + "."
        }
    }

    this.eraseInput = function () {
        let lastVariable = this.variables[this.variables.length - 1];
        if (lastVariable == null) return;

        if (lastVariable.length > 1) {
            this.variables[this.variables.length - 1] = lastVariable.slice(0, -1);
        } else {
            this.variables.pop()
        }
    }

    const methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "x": (a, b) => a * b,
        "/": (a, b) => {
            if (b == 0) return Infinity
            return a / b
        }
    }

    this.operate = function () {
        if (isNaN(this.variables.at(-1))) this.variables.pop();
        if (this.variables.length == 1) return this.variables[0];

        let calculationArr = this.variables
        console.log(calculationArr)
        let number1 = +calculationArr[0];
        let operator = calculationArr[1];
        let number2 = +calculationArr[2];


        let result = methods[operator](number1, number2).toString()

        let newCalculationArr = calculationArr;
        newCalculationArr.splice(0, 3, result)

        if (newCalculationArr.length > 1) return this.operate(newCalculationArr);
    }
}
let buttonClickInjection = function (str, CalculatorObj) {
    switch (str) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            CalculatorObj.addNumberInput(str)
            break;

        case "C":
        case "c":
        case "Delete":

            calculator = new Calculator();
            break;

        case "+":
        case "-":
        case "/":
        case "x":
            CalculatorObj.addOperatorInput(str)
            break;

        case "←":
        case "Backspace":
            CalculatorObj.eraseInput()
            break;


        case ",":
        case ".":
            CalculatorObj.addCommaInput()
            break;

        case "=":
        case "Enter":
            CalculatorObj.operate()
            break;


        default:
            console.log("You shouldn't mess with the calculator html it will break stuff")
            break;
    }
    console.log(CalculatorObj.variables)
}

function updateAllHtml(CalculatorObj) {
    const functionOutput = document.querySelector(".function")

    functionOutput.textContent = CalculatorObj.variables.join("");
}

let calculator = new Calculator()
updateAllHtml(calculator)
const buttons = document.querySelectorAll("button")
buttons.forEach((btn) => btn.addEventListener("click", (btnEvent) => {
    buttonClickInjection(btnEvent.target.textContent || btnEvent.target.innerText, calculator)
    updateAllHtml(calculator)
}))

document.addEventListener("keydown", (e) => {
    buttonClickInjection(e.key, calculator)
    updateAllHtml(calculator)
});