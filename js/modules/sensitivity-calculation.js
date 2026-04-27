export const moduleData = {
    title: "相機最大感光度計算 (Sensitivity / Minimum Illumination)",
    desc: "輸入燈源的Luminance(cd/m2)，ND filter的減光量(Reduction = 1/透光率 transmisson)，計算出相機最大感光度 (Sensitivity / Minimum Illumination)",
    math: `        
        <p>$$Sensitivity = Minimum Illumination = \\frac{Luminance \\times PI}{ Reduction \\times Scene Reflection }$$</p>
        `,
    renderUI: (container) => {
        container.innerHTML = `

            <div class="calc-group">
                <label>Lightbox - Luminace (cd/m2): </label>
                <input type="number" id="luminance" value="200">
            </div>
            <div class="calc-group">
                <label>ND Filter - Reduction: </label>
                <input type="number" id="reduction" value="13210">
            </div>
            <button id="run-btn">Calculation</button>
            <div id="illuminance" style="margin-top:20px; font-weight:bold; color:#3498db;"></div>
            </div>
            
            
            <div class="info-card" style="line-height: 1.8;">
                <h3 style="color: #2c3e50; margin-bottom: 10px;">Illuminance (照度，符號 $$E$$)</h3>
                <ul style="list-style-type: none; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">
                        <strong>定義：</strong>單位面積上接收到的光通量（Luminous flux）。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>單位：</strong>Lux ($$lx = lm/m^2$$)。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>物理意義：</strong>這描述的是「環境光源」的強度，或是光線「擊中」目標表面的量。它不包含物體反射後的資訊。
                    </li>
                </ul>
            </div>
        
            <div class="info-card" style="line-height: 1.8;">
                <h3 style="color: #2c3e50; margin-bottom: 10px;">Luminance (輝度，符號 $$L$$)</h3>
                <ul style="list-style-type: none; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">
                        <strong>定義：</strong>從某個方向觀察時，單位投影面積所發出的光強度。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>單位：</strong>$$cd/m^2$$ (尼特, Nits)。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>物理意義：</strong>這描述的是「被觀察對象」本身看起來有多亮。這不僅取決於光源，還取決於物體的表面性質（如顏色、材質、光澤）。
                    </li>
                </ul>
            </div>

            <div class="info-card" style="line-height: 1.8;">
                <h3 style="color: #2c3e50; margin-bottom: 10px;">Luminance和Illuminance之間存在物理上的「反射關係」。若要進行轉換，我們必須假設一個朗伯表面 (Lambertian Surface，即理想的漫反射表面)，其轉換公式為：</h3>
                <ul style="list-style-type: none; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">
                        <strong>公式：</strong>$$L = \\frac{E \\cdot \\rho}{\\pi}$$
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>$$L$$：Luminance ($$cd/m^2$$)
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>$$E$$：Illuminance ($$lx$$)
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>$$\rho$$ (rho)：表面的反射率 (Reflectance)，範圍 0 到 1. ND Filter為0.89
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>$$\pi$$ (pi)：「$$\pi$$」就是對朗伯表面進行半球空間積分得來的
                    </li>
                </ul>
                
            </div>
            
             <div class="info-card" style="line-height: 1.8;">
                <h3 style="color: #2c3e50; margin-bottom: 10px;">「朗伯表面」是一個非常核心的理想化模型。它描述了一種完全均勻的漫反射現象。</h3>
                <ul style="list-style-type: none; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">
                        <strong>定義：</strong>**朗伯表面（Lambertian Surface）**是指一個表面在接收光線後，會將光線向四面八方均勻地散射。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>$$L$$：物理特性是：無論你從哪一個角度觀察這個表面，你所看到的輝度（Luminance, $$cd/m^2$$）都是完全一樣的。
                    </li>
                    
                </ul>
            </div>

            <div class="info-card" style="line-height: 1.8;">
                <h3 style="color: #2c3e50; margin-bottom: 10px;">感測器接收到的總光量（曝光量）與光源亮度和曝光時間成正比：</h3>
                <ul style="list-style-type: none; padding-left: 20px;">
                    <li style="margin-bottom: 8px;">
                        <strong>$$\\text{曝光能量} \\propto \\text{光源亮度} (L) \\times \\text{曝光時間} (T)$$。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>如果以 40ms 作為基準（代表 100% 的光量表現），當您將時間縮短為 10ms 時，對於感測器來說，這就像是看到了一個「變暗」的光源。。
                    </li>
                    <li style="margin-bottom: 8px;">
                        <strong>計算公式：</strong>。$$\\text{模擬亮度} (L_{sim}) = \\text{實際亮度} (L_{actual}) \\times \\frac{T_{current}}{T_{40ms}}$$
                    </li>
                    
                </ul>
            </div>    
                
            

            
        `;

        // 綁定計算邏輯
        document.getElementById('run-btn').onclick = () => {
            const lumiance = parseFloat(document.getElementById('luminance').value);
            const reduction = parseFloat(document.getElementById('reduction').value);
            const scene_reflection = 0.89;
            const PI = 3.14159265359;
            const illumination = lumiance *PI / (reduction * scene_reflection);
            
            document.getElementById('illuminance').innerText = `Sensitivity: ${illumination.toFixed(5)} Lux`;
        };
    }
};
