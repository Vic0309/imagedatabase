export const moduleData = {
    title: "Sensor奈奎斯特最大解析度計算和單位轉換",
    desc: "輸入Sensor Pixel Size / 影像高度，計算出奈奎斯特最大解析度LP/mm，再轉換成LP/PH。",
    math: `
        <p>Sensor奈奎斯特最大解析度為Sensor理論上能夠辨識的最細條紋（1個Line Pair）的極限．至少要2個pixels(1個pixel為黑, 一個pixel為白)才能解析一個Line Pair</p>
        <p>$$Nyquist \\ Limit \\ (lp/mm) = \\frac{1}{2 \\times Pixel \\ Size \\ (mm)}$$</p>
        `,
    renderUI: (container) => {
        container.innerHTML = `
            <div class="calc-group">
                <label>Sensor Pixel Size (um): </label>
                <input type="number" id="pixel_size" value="2.9">
            </div>
            <div class="calc-group">
                <label>Sensor Size (Height): </label>
                <input type="number" id="h_val" value="1080">
            </div>
            <button id="run-btn">Calculation</button>
            <div id="res-box" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
            <div id="res-box-mm" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
            <div id="res-box-ph" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
            
        `;

        // 綁定計算邏輯
        document.getElementById('run-btn').onclick = () => {
            const pixel_size = parseFloat(document.getElementById('pixel_size').value);
            const image_h = parseFloat(document.getElementById('h_val').value);
            const res_mm = 1 / (2 * pixel_size/1000);
            const ph = image_h * pixel_size /1000;
            const res_ph = res_mm * ph;
            document.getElementById('res-box').innerText = `Sensor奈奎斯特最大解析度: ${res_mm.toFixed(2)} LP/mm = ${res_ph.toFixed(1)} LP/PH`;
            document.getElementById('res-box-mm').innerText = `${res_mm.toFixed(2)} LP/mm，在1mm空間中有${res_mm.toFixed(2)}Line Pair`;
            document.getElementById('res-box-ph').innerText = `${res_ph.toFixed(1)} LP/PH，在影像高度${ph.toFixed(1)}mm空間中有${res_ph.toFixed(1)}Line Pair`;
        };
    }
};
