function generateLink() {
    const min = document.getElementById("min").value;
    const max = document.getElementById("max").value;
    const minColor = document.getElementById("minColor").value.replace('#', ''); // #を省略
    const maxColor = document.getElementById("maxColor").value.replace('#', ''); // #を省略
    const showMessage = document.getElementById("showMessage").value;

    // 現在のオリジンを取得
    const baseUrl = window.location.origin;
    const path = "/randomNumber/";

    // 完全なURLを作成
    let link = baseUrl + path;

    // 初期値でない場合のみパラメータを追加
    const params = [];
    if (min !== "1") params.push(`min=${min}`);
    if (max !== "100") params.push(`max=${max}`);
    if (minColor !== "ffffff" || maxColor !== "ffffff") {
        params.push(`color=${minColor},${maxColor}`); // 両方のカラーを出力
    }
    if (showMessage !== "false") params.push(`showMessage=${showMessage}`);

    // パラメータが存在する場合はリンクに追加
    if (params.length > 0) {
        link += "?" + params.join("&");
    }

    document.getElementById("generatedLink").href = link;
    document.getElementById("generatedLink").textContent = link;

    window.location.href = link;
}

function resetDefaults() {
    document.getElementById("min").value = 1;
    document.getElementById("max").value = 100;
    document.getElementById("minColor").value = "#ffffff"; // 初期値は白
    document.getElementById("maxColor").value = "#ffffff"; // 初期値は白
    document.getElementById("showMessage").value = "false";
    document.getElementById("generatedLink").href = "#"; // リンクをクリア
    document.getElementById("generatedLink").textContent = ""; // テキストもクリア
    updateColorPreview(); // プレビューを更新
}

function updateColorPreview() {
    const minColor = document.getElementById("minColor").value;
    const maxColor = document.getElementById("maxColor").value;
    const colorPreview = document.getElementById("colorPreview");

    // グラデーションの更新
    colorPreview.style.background = `linear-gradient(to right, ${minColor}, ${maxColor})`;
}