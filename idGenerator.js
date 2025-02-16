const { createCanvas, loadImage } = require('canvas');
const fs = require('fs').promises;

async function createKenyanID(name, idNumber, dob, photoPath) {
    const width = 400;
    const height = 250;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Load and draw photo
    const photo = await loadImage(`file://${photoPath}`);
    ctx.drawImage(photo, 20, 20, 100, 120);

    // Text
    ctx.fillStyle = '#000000';
    ctx.font = '20px Arial';
    ctx.fillText('Republic of Kenya', 150, 40);
    ctx.fillText('National ID', 150, 70);
    ctx.fillText(`Name: ${name}`, 150, 110);
    ctx.fillText(`ID No: ${idNumber}`, 150, 140);
    ctx.fillText(`DOB: ${dob}`, 150, 170);

    // Watermark
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.font = '30px Arial';
    ctx.rotate(-Math.PI / 4);
    ctx.fillText('Kenyan ID', -150, 300);
    ctx.rotate(Math.PI / 4);

    // Clean up the uploaded file
    await fs.unlink(photoPath);

    return canvas.toBuffer();
}

module.exports = { createKenyanID };
