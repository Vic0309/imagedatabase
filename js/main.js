import { toolsConfig } from './config.js';

async function init() {
    const menuContainer = document.getElementById('menu-container');

    toolsConfig.forEach(group => {
        const details = document.createElement('details');
        details.innerHTML = `<summary>${group.category}</summary>`;
        
        group.items.forEach(item => {
            const a = document.createElement('a');
            a.className = 'menu-item';
            a.textContent = item.title;
            a.onclick = () => loadModule(item.fileName);
            details.appendChild(a);
        });
        menuContainer.appendChild(details);
    });
}

async function loadModule(fileName) {
    // 動態匯入對應的 JS 模組
    const { moduleData } = await import(`./modules/${fileName}`);
    
    document.getElementById('view-title').textContent = moduleData.title;
    document.getElementById('view-desc').textContent = moduleData.desc;
    document.getElementById('view-math').innerHTML = moduleData.math;
    
    const uiContainer = document.getElementById('view-ui');
    uiContainer.innerHTML = ''; // 清空舊 UI
    moduleData.renderUI(uiContainer);

    // 重新渲染數學公式
    if (window.MathJax) MathJax.typeset();
}

window.onload = init;