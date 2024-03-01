function Calculator(firstVariable = 0) {
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




    const methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "x": (a, b) => a * b,
        "/": (a, b) => {
            if (b == 0) return Infinity
            return a / b
        }
    }

    this.operate = function (calculationArr) {
        let number1 = +calculationArr[0];
        let operator = calculationArr[1];
        let number2 = +calculationArr[2];

        let result = this.methods[operator](number1, number2)

        let newCalculationArr = calculationArr.toSpliced(0, 3, result)

        if (newCalculationArr.length > 1) return this.operate(newCalculationArr);

        return result;
    }
}

let calculator = new Calculator(0)
const buttons = document.querySelectorAll("button")
buttons.forEach((btn) => btn.addEventListener("click", (btnEvent) => numberInjection(btnEvent.target.textContent || btnEvent.target.innerText, calculator)))

let numberInjection = function (str, CalculatorObj) {
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
            calculator = new Calculator();
            break;

        case "+":
        case "-":
        case "/":
        case "x":
            CalculatorObj.addOperatorInput(str)
            break;

        default:
            break;
    }
    console.log(CalculatorObj.variables)

}