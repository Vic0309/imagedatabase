export const moduleData = {
    title: "鏡頭 FOV 計算",
    desc: "給定感光元件尺寸與焦距來計算水平視角 (HFOV)。",
    math: "$$ FOV = 2 \\cdot \\arctan\\left(\\frac{h}{2f}\\right) $$",
    renderUI: (container) => {
        container.innerHTML = `
            <div class="calc-group">
                <label>焦距 f (mm): </label>
                <input type="number" id="f_val" value="3.6">
            </div>
            <div class="calc-group">
                <label>感光元件寬度 h (mm): </label>
                <input type="number" id="h_val" value="4.8">
            </div>
            <button id="run-btn">立即計算</button>
            <div id="res-box" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
        `;

        // 綁定計算邏輯
        document.getElementById('run-btn').onclick = () => {
            const f = parseFloat(document.getElementById('f_val').value);
            const h = parseFloat(document.getElementById('h_val').value);
            const res = 2 * Math.atan(h / (2 * f)) * (180 / Math.PI);
            document.getElementById('res-box').innerText = `水平視角 (HFOV): ${res.toFixed(2)} 度`;
        };
    }
};