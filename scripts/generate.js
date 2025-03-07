const fs = require("fs");
const path = require("path");

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"));
const outputDir = "./public";

// 确保输出目录存在
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// 生成首页
const indexContent = `
<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>影视大全</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>🎬 影视大全</h1>
    <div class="movies">
        ${movies.map(movie => `
            <div class="movie-card">
                <a href="${movie.id}.html">
                    <img src="${movie.cover}" alt="${movie.title}">
                    <h2>${movie.title}</h2>
                </a>
            </div>
        `).join('')}
    </div>
</body>
</html>
`;
fs.writeFileSync(path.join(outputDir, "index.html"), indexContent);

// 生成详情页
movies.forEach(movie => {
    const movieContent = `
    <!DOCTYPE html>
    <html lang="zh">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${movie.title}</title>
        <link rel="stylesheet" href="style.css">
    </head>
    <body>
        <a href="index.html" class="back-button">← 返回首页</a>
        <h1>${movie.title}</h1>
        <img src="${movie.cover}" class="cover" alt="${movie.title}">
        <p>${movie.description}</p>
        <h2>📺 剧集列表</h2>
        <ul class="episode-list">
            ${movie.episodes.map(episode => `
                <li>
                    <span>${episode.name}</span>
                    <a href="${episode.url}" target="_blank" class="play-button">▶️ 播放</a>
                </li>
            `).join('')}
        </ul>
    </body>
    </html>
    `;
    fs.writeFileSync(path.join(outputDir, `${movie.id}.html`), movieContent);
});

console.log("✨ 网页生成完成！");
