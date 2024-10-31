function zeroPadding(number, length) {
    return number.toString().padStart(length, "0");
}

function getParameters() {
    const params = new URL(window.location.href).searchParams;
    const minString = params.get("min") || "1";
    const maxString = params.get("max") || "100";
    let colorString = params.get("color") || "none";
    const showMessage = params.get("showMessage") !== "false"; // 'false' でないならメッセージ表示

    const colors = colorString.split(",");
    colors.forEach((color, index) => {
        if (color !== "none" && !CSS.supports("color", color)) {
            colors[index] = `#${color}`;
        }
    });

    return {
        min: parseInt(minString, 10),
        max: parseInt(maxString, 10),
        colors: colors,
        showMessage: showMessage,
    };
}

function hexOrNamedColorToRgb(color) {
    const tempDiv = document.createElement("div");
    tempDiv.style.color = color;
    document.body.appendChild(tempDiv);
    const rgb = window.getComputedStyle(tempDiv).color.match(/\d+/g);
    document.body.removeChild(tempDiv);
    return { r: parseInt(rgb[0]), g: parseInt(rgb[1]), b: parseInt(rgb[2]) };
}

function setBackgroundColor(number, min, max, colors) {
    if (colors[0] === "none") {
        document.body.style.backgroundColor = ""; // 背景色をリセット
        return;
    }

    const intensity = (number - min) / (max - min);
    const startColor = colors.length === 2 ? hexOrNamedColorToRgb(colors[0]) : { r: 255, g: 255, b: 255 };
    const endColor = hexOrNamedColorToRgb(colors[colors.length === 2 ? 1 : 0]);

    const r = Math.floor(startColor.r * (1 - intensity) + endColor.r * intensity);
    const g = Math.floor(startColor.g * (1 - intensity) + endColor.g * intensity);
    const b = Math.floor(startColor.b * (1 - intensity) + endColor.b * intensity);

    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function displayNumber() {
    const { min, max, colors, showMessage } = getParameters(); // showMessageも取得
    const randomNumber = createRandomNumber(min, max);
    document.getElementById("number").textContent = zeroPadding(randomNumber, 2);

    setBackgroundColor(randomNumber, min, max, colors);
    showMessageOnScreen(randomNumber, min, max, showMessage);
}

function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function showMessageOnScreen(number, min, max, showMessage) {
    const messageElement = document.getElementById("message");

    if (!showMessage) {
        messageElement.style.display = "none"; // メッセージを非表示
        return;
    }
    
    const paddedMin = zeroPadding(min, 2);
    const paddedMax = zeroPadding(max, 2);

    if (number === min) {
        messageElement.textContent = `最小値 ${paddedMin} が出ました！`;
        messageElement.style.display = "block";
    } else if (number === max) {
        messageElement.textContent = `最大値 ${paddedMax} が出ました！`;
        messageElement.style.display = "block";
    } else if (number === (max + min) / 2){
        messageElement.textContent = `中央値が出ました！`;
        messageElement.style.display = "block";
    }else {
        messageElement.style.display = "none";
    }
}
