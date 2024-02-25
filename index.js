import express from 'express';
import qr from 'qr-image';
import path from 'path';

const app = express();
const port = 3000;


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'index.html'));
});

// QR code endpoint
app.post('/generate', (req, res) => {
    const url = req.body.url;

    const qrImage = qr.imageSync(url, { type: 'png' });
    const qrImageBase64 = qrImage.toString('base64');

    const qrHtml = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>QR Code</title>
            <!-- Bootstrap CSS -->
            <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
            <style>
                body {
                    background-color: #f8f9fa; 
                }
                .content-wrapper {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }
                .qr-wrapper {
                    max-width: 400px;
                    width: 100%;
                    padding: 20px;
                    background-color: #ffffff; 
                    border-radius: 10px;
                    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1); 
                }
            </style>
        </head>
        <body>
            <div class="content-wrapper">
                <div class="qr-wrapper">
                    <h1 class="text-center mb-4">QR Code</h1>
                    <img src="data:image/png;base64,${qrImageBase64}" alt="QR Code" class="img-fluid mx-auto d-block">
                </div>
            </div>
        </body>
        </html>
    `;

   
    res.send(qrHtml);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
