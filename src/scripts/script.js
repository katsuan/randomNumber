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

    // 雑学を表示するかの確率
    const showTrivia = Math.random() < 0.5;
    // メッセージをリセット
    messageElement.textContent = "";

    // 最小・最大・中央値のメッセージを表示
    if (number === min) {
        messageElement.textContent = `最小値 ${paddedMin} が出ました！`;
    } else if (number === max) {
        messageElement.textContent = `最大値 ${paddedMax} が出ました！`;
    } else if (number === (max + min) / 2) {
        messageElement.textContent = `中央値が出ました！`;
    }

    // 雑学が存在する場合
    if (triviaTable[number] && showTrivia) {
        const triviaList = triviaTable[number];
        const randomTrivia = triviaList[Math.floor(Math.random() * triviaList.length)]; // ランダムに雑学を選択
        messageElement.textContent = " 雑学: " + randomTrivia; // メッセージに雑学を追加
    }

    // メッセージが設定された場合は表示
    if (messageElement.textContent) {
        messageElement.style.display = "block"; // メッセージを表示
    } else {
        messageElement.style.display = "none"; // メッセージがない場合は非表示
    }
}

const triviaTable = {
    1: [
        "自然数の中で最小の数字",
        "何事も始まりは1から"
    ],
    2: [
        "唯一の偶数の素数",
        "2EZ =too easy(とても簡単)",
        "2C =too cool(超イケてる)",
        "ハートの <3 より少ない <2 はマイナスの感情"
    ],
    3: [
        "<3でハートマーク I<3UやK3U",
        "最初の奇数の素数です",
        "「三権」といえば、「司法 立法 行政」",
        "三種の神器 「八咫鏡 草薙剣 八尺瓊勾玉」",
        "光の三原色 「赤(Red) 緑(Green) 青(Blue)」",
        "色の三原色 「青緑(Cyan)、赤紫(Magenta)、黄(Yellow)」",
        "物質の三態 「固体 液体 気体」",
        "三部作(英語ではトリロジー(Trilogy)と呼ばれる)",
        "トリオ(Trio)というのは三つで構成される形態",
        "三つ子の魂百まで",
        "石の上にも三年",
        "三度目の正直",
        "仏の顔も三度まで",
        "早起きは三文の徳",
        // "キリスト教では「三位一体」神と子と聖霊が一体(唯一の神)とする教えがある",
        "野球で打者はストライクを3つ(三振)でアウト",
        "トライアスロン(三種競技)は「水泳 自転車 マラソン」",
        "3月3日は桃の節句(ひな祭り)"
    ],
    4: [
        "G4U =Good for you.(良かったね)",
        "ハートの <3の を大きくした <4 はとても好き",
        "最初の合成数です",
        "四つの方角は「北、南、東、西」",
        "四季は「春、夏、秋、冬」",
        "四つ葉のクローバーは幸運のシンボルです"
    ],
    5: [
        "五感は視覚、聴覚、触覚、味覚、嗅覚。",
        "五輪の輪は5大陸の団結を意味する",
        "五輪の輪は左から青、黄、黒、緑、赤",
        "「五大元素」は土、火、水、風、空"
    ],
    6: [
        "最初の完全数で、1+2+3=6",
        "六本木は東京の繁華街の一つ"
    ],
    7: [
        "ラッキーセブンとして知られています。",
        "七夕は、星に願いをかける日本の伝統行事",
        "虹は「赤橙黄緑青藍紫」"
    ],
    8: [
        "8月8日は「パラオ独立記念日」",
        "八方美人は「欠点のない人」を意味していた"
    ],
    10: [
        "最初の2桁の数字",
        "英語スラングではカッコいいを表す"
    ],
    11: [
        "素数です",
        "11月11日は「ポッキーの日」"
    ],
    12: [
        "完全数の2つ目で、1+2+3+4+6=12"
    ],
    13: [
        "不吉な数字とされています"
    ],
    16: [
        "16ビットコンピュータは昔の標準"
    ],
    17: [
        "素数です",
        "南イタリアでは忌み数"
    ],
    19: [
        "素数です"
    ],
    23: [
        "素数です",
        "22日はショートケーキの日(上に苺(15日)の日)"
    ],
    29: [
        "素数です"
    ],
    31: [
        "素数です"
    ],
    37: [
        "素数です"
    ],
    41: [
        "素数です"
    ],
    42: ["新聞紙を42回折ると月に届く。"],
    43: [
        "素数です"
    ],
    47: [
        "素数です"
    ],
    53: [
        "素数です"
    ],
    57: [
        "グロタンディーク素数です",
        "57は7の倍数です。"
    ],
    59: [
        "素数です"
    ],
    61: [
        "素数です"
    ],
    67: [
        "素数です"
    ],
    71: [
        "素数です"
    ],
    73: [
        "素数です"
    ],
    79: [
        "素数です"
    ],
    83: [
        "素数です"
    ],
    89: [
        "素数です"
    ],
    97: [
        "素数です"
    ],
    100: [
        "10の2乗です。",
        "完璧なスコアの象徴とされています。"
    ]
};