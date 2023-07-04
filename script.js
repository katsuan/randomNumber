function zeroPadding(number, length) {
    // 指定の桁数まで数値の前に 0 をつける
    return number.toString().padStart(length, "0");
}

function createRandomNumber() {
    var min = 1;
    var max = 100;

    var a = Math.floor(Math.random() * (max + 1 - min)) + min;
    console.log(a);
    return a;
}

const element = document.getElementById("number");
element.textContent = zeroPadding(createRandomNumber(), 2)

