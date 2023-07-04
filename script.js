function zeroPadding(number, length) {
    // 指定の桁数まで数値の前に 0 をつける
    return number.toString().padStart(length, "0");
}

function getParameters() {
    // パラメーターを定義する
    const params = new URL(window.location.href).searchParams;
    const minString = params.get("min") || "1";
    const maxString = params.get("max") || "100";
    return {
        min: parseInt(minString, 10),
        max: parseInt(maxString, 10),
    };
}

function createRandomNumber() {
    const parameters = getParameters();
    const min = parameters.min;
    const max = parameters.max;

    const a = Math.floor(Math.random() * (max + 1 - min)) + min;
    return a;
}
function displayNumber() {
    const element = document.getElementById("number");
    element.textContent = zeroPadding(createRandomNumber(), 2)
}

