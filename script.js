function zeroPadding(number, length) {
    return number.toString().padStart(length, "0");
}

function getParameters() {
    const params = new URL(window.location.href).searchParams;
    const minString = params.get("min") || "1";
    const maxString = params.get("max") || "100";
    let colorString = params.get("color") || "none"; // デフォルトは none

    // `#`なしの16進数や、CSSの色名に対応
    if (colorString !== "none" && !CSS.supports("color", colorString)) {
        colorString = `#${colorString}`;
    }

    return {
        min: parseInt(minString, 10),
        max: parseInt(maxString, 10),
        color: colorString,
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

function setBackgroundColor(number, min, max, color) {
    if (color === "none") {
        document.body.style.backgroundColor = ""; // 背景色をリセット
        return;
    }

    const intensity = (number - min) / (max - min);
    const targetColor = hexOrNamedColorToRgb(color);
    const r = Math.floor(targetColor.r * intensity);
    const g = Math.floor(targetColor.g * intensity);
    const b = Math.floor(targetColor.b * intensity);
    document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

function displayNumber() {
    const { min, max, color } = getParameters();
    const randomNumber = createRandomNumber(min, max);
    document.getElementById("number").textContent = zeroPadding(randomNumber, 2);

    setBackgroundColor(randomNumber, min, max, color);
}

function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
