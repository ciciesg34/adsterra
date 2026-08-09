const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const code = req.url.replace(/^\/|\/$/g, '').split('?')[0]; 

    try {
        const htmlPath = path.join(process.cwd(), 'index.html');
        const dataPath = path.join(process.cwd(), 'data.json');
        
        let html = fs.readFileSync(htmlPath, 'utf8');
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        if (data[code]) {
            const decodedUrl = Buffer.from(data[code], 'base64').toString('utf8');
            const ytMatch = decodedUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
            const ytId = ytMatch ? ytMatch[1] : '';

            if (ytId) {
                const ogImage = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                const ogTitle = `Tonton Video Penuh - Vidnesia`;
                
                html = html.replace('https://placehold.co/1200x630/0a0a0a/e50914?text=Vidnesia', ogImage);
                html = html.replace('content="Vidnesia"', `content="${ogTitle}"`);
            }
        }
        
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(html);

    } catch (error) {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(fs.readFileSync(path.join(process.cwd(), 'index.html'), 'utf8'));
    }
};
