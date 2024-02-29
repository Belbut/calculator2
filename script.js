function Calculator(firstVariable = 0) {
    this.variables = [firstVariable];

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