function zeroPadding(number, length) {
    return number.toString().padStart(length, "0");
}

function getParameters() {
    const params = new URL(window.location.href).searchParams;
    const minString = params.get("min") || "1";
    const maxString = params.get("max") || "100";
    let colorString = params.get("color") || "none";

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
    const { min, max, colors } = getParameters();
    const randomNumber = createRandomNumber(min, max);
    document.getElementById("number").textContent = zeroPadding(randomNumber, 2);

    setBackgroundColor(randomNumber, min, max, colors);
}

function createRandomNumber(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
}
