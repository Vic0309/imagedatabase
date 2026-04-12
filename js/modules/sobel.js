export const moduleData = {
    title: "Sobel 邊緣檢測 (Edge Detection)",
    desc: "Sobel 算子是一種常用的微分算子，透過計算影像亮度的空間梯度來尋找邊緣。",
    math: `
        <p>水平梯度 ($G_x$): $\\begin{bmatrix} -1 & 0 & 1 \\\\ -2 & 0 & 2 \\\\ -1 & 0 & 1 \\end{bmatrix}$ 
           垂直梯度 ($G_y$): $\\begin{bmatrix} -1 & -2 & -1 \\\\ 0 & 0 & 0 \\\\ 1 & 2 & 1 \\end{bmatrix}$</p>
        <p>最終梯度強度: $G = \\sqrt{G_x^2 + G_y^2}$</p>
    `,
    renderUI: (container) => {
        container.innerHTML = `
            <div class="calc-card">
                <p>請上傳圖片以進行邊緣檢測：</p>
                <input type="file" id="image-upload" accept="image/*" style="margin-bottom: 15px;">
                <br>
                <button id="process-btn" disabled>執行 Sobel 運算</button>
                <div style="margin-top: 20px; display: flex; flex-wrap: wrap; gap: 20px;">
                    <div>
                        <p>原始圖片：</p>
                        <canvas id="canvas-origin" style="max-width: 300px; border: 1px solid #ddd;"></canvas>
                    </div>
                    <div>
                        <p>Sobel 結果：</p>
                        <canvas id="canvas-sobel" style="max-width: 300px; border: 1px solid #ddd;"></canvas>
                    </div>
                </div>
            </div>
        `;

        const upload = document.getElementById('image-upload');
        const processBtn = document.getElementById('process-btn');
        const canvasOrigin = document.getElementById('canvas-origin');
        const canvasSobel = document.getElementById('canvas-sobel');
        const ctxO = canvasOrigin.getContext('2d');
        const ctxS = canvasSobel.getContext('2d');

        let imgData = null;

        // 圖片上傳處理
        upload.onchange = (e) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    canvasOrigin.width = canvasSobel.width = img.width;
                    canvasOrigin.height = canvasSobel.height = img.height;
                    ctxO.drawImage(img, 0, 0);
                    imgData = ctxO.getImageData(0, 0, img.width, img.height);
                    processBtn.disabled = false;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        };

        // Sobel 運算核心
        processBtn.onclick = () => {
            if (!imgData) return;
            const w = imgData.width;
            const h = imgData.height;
            const output = ctxS.createImageData(w, h);
            const input = imgData.data;
            const out = output.data;

            // 輔助函式：取得灰階值
            const getGray = (x, y) => {
                if (x < 0 || x >= w || y < 0 || y >= h) return 0;
                const idx = (y * w + x) * 4;
                return (input[idx] * 0.299 + input[idx + 1] * 0.587 + input[idx + 2] * 0.114);
            };

            for (let y = 0; y < h; y++) {
                for (let x = 0; x < w; x++) {
                    // 3x3 Sobel 卷積
                    const gx = 
                        (-1 * getGray(x - 1, y - 1)) + (1 * getGray(x + 1, y - 1)) +
                        (-2 * getGray(x - 1, y))     + (2 * getGray(x + 1, y)) +
                        (-1 * getGray(x - 1, y + 1)) + (1 * getGray(x + 1, y + 1));

                    const gy = 
                        (-1 * getGray(x - 1, y - 1)) + (-2 * getGray(x, y - 1)) + (-1 * getGray(x + 1, y - 1)) +
                        (1 * getGray(x - 1, y + 1))  + (2 * getGray(x, y + 1))  + (1 * getGray(x + 1, y + 1));

                    const g = Math.sqrt(gx * gx + gy * gy);
                    const idx = (y * w + x) * 4;
                    out[idx] = out[idx + 1] = out[idx + 2] = g; // 填入灰階
                    out[idx + 3] = 255; // Alpha
                }
            }
            ctxS.putImageData(output, 0, 0);
        };
    }
};