export const moduleData = {
    title: "RGB 轉 YUV (BT.601)",
    desc: "YUV 是一種色彩編碼系統，常用于影像處理與影片壓縮。Y 代表亮度（Luminance），U 與 V 代表色度（Chrominance）。",
    math: `
        <p>$$ Y = 0.299R + 0.587G + 0.114B $$</p>
        <p>$$ U = -0.14713R - 0.28886G + 0.436B $$</p>
        <p>$$ V = 0.615R - 0.51499G - 0.10001B $$</p>
    `,
    renderUI: (container) => {
        container.innerHTML = `
            <div class="calc-card" style="display: flex; flex-direction: column; gap: 15px;">
                <div class="input-group">
                    <label style="width: 100px; display: inline-block;">Red (0-255):</label>
                    <input type="number" id="in_r" value="255" min="0" max="255">
                </div>
                <div class="input-group">
                    <label style="width: 100px; display: inline-block;">Green (0-255):</label>
                    <input type="number" id="in_g" value="255" min="0" max="255">
                </div>
                <div class="input-group">
                    <label style="width: 100px; display: inline-block;">Blue (0-255):</label>
                    <input type="number" id="in_b" value="255" min="0" max="255">
                </div>
                
                <button id="calc-btn" style="width: 120px;">執行轉換</button>

                <div id="yuv-results" style="background: #eef7ff; padding: 15px; border-radius: 8px; line-height: 1.8;">
                    <div><strong>轉換結果：</strong></div>
                    <div id="res_y">Y: -</div>
                    <div id="res_u">U: -</div>
                    <div id="res_v">V: -</div>
                </div>
            </div>
        `;

        // 綁定計算按鈕邏輯
        document.getElementById('calc-btn').onclick = () => {
            const r = parseFloat(document.getElementById('in_r').value) || 0;
            const g = parseFloat(document.getElementById('in_g').value) || 0;
            const b = parseFloat(document.getElementById('in_b').value) || 0;

            // BT.601 轉換公式
            const y = 0.299 * r + 0.587 * g + 0.114 * b;
            const u = -0.14713 * r - 0.28886 * g + 0.436 * b;
            const v = 0.615 * r - 0.51499 * g - 0.10001 * b;

            document.getElementById('res_y').innerText = `Y (亮度): ${y.toFixed(3)}`;
            document.getElementById('res_u').innerText = `U (色度): ${u.toFixed(3)}`;
            document.getElementById('res_v').innerText = `V (色度): ${v.toFixed(3)}`;
        };
    }
};