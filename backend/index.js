const express = require('express');
const axios = require('axios');
const FormData = require('form-data');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();

// Middleware
app.use(cors());
app.use(fileUpload()); // Enable file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoint to handle image uploads
app.post('/upload', async (req, res) => {
    if (!req.files || !req.files.image) {
        return res.status(400).json({ error: 'No image uploaded' });
    }

    const image = req.files.image;
    const form = new FormData();
    form.append('image', image.data, image.name);

    try {
        // Forward the image to the AI server
        const aiResponse = await axios.post('http://localhost:5000/process_image', form, {
            headers: form.getHeaders()
        });
        res.json(aiResponse.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

app.listen(3000, () => console.log('Backend running on port 3000'));