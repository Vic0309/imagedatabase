export const moduleData = {
    title: "相機最大感光度計算 (Sensitivity / Minimum Illumination)",
    desc: "輸入燈源的Luminance(cd/m2)，ND filter的減光量(Reduction = 1/透光率 transmisson)，計算出相機最大感光度 (Sensitivity / Minimum Illumination)",
    math: `
        <p>相機最大感光度 (Sensitivity / Minimum Illumination)是</p>
        <p>$$Nyquist \\ Limit \\ (lp/mm) = \\frac{1}{2 \\times Pixel \\ Size \\ (mm)}$$</p>
        `,
    renderUI: (container) => {
        container.innerHTML = `
            <div class="calc-group">
                <label>Sensor Pixel Size (um): </label>
                <input type="number" id="pixel_size" value="2.9">
            </div>
            <div class="calc-group">
                <label>Sensor Size (Heigh): </label>
                <input type="number" id="h_val" value="1080">
            </div>
            <button id="run-btn">Calculation</button>
            <div id="res-box" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
            <div id="res-box-PH" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
        `;

        // 綁定計算邏輯
        document.getElementById('run-btn').onclick = () => {
            const pixel_size = parseFloat(document.getElementById('pixel_size').value);
            const image_h = parseFloat(document.getElementById('h_val').value);
            const res_mm = 1 / (2 * pixel_size/1000);
            const ph = image_h * pixel_size
            const res_ph = res_mm * ph;
            document.getElementById('res-box').innerText = `Sensor奈奎斯特最大解析度: ${res_mm.toFixed(2)} LP/mm = ${res_ph.toFixed(2)} LP/PH`;
        };
    }
};