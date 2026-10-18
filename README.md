# PetDetect AI

**Live demo:** https://pet-detection-app-frontend.vercel.app

A full-stack web app that finds cats and dogs in your photos. Sign up, upload an image, and PetDetect tells you whether it contains a pet, then returns a segmentation mask that highlights exactly where the cat or dog is.

## How it works

```
React frontend ──> Node.js / Express API (auth, uploads) ──> Python AI server (Flask)
                                                              ├─ YOLOv5: is there a cat or dog?
                                                              └─ DeepLabV3: pixel-level pet mask
```

1. The user logs in. The Express API issues a **JWT** and stores passwords hashed with **bcrypt**.
2. The image goes to the protected `/upload` endpoint, which forwards it to the AI server.
3. **YOLOv5** checks the image for cats and dogs (COCO classes).
4. If a pet is found, **DeepLabV3 (ResNet-50)** segments it, and the masked image is sent back to the user.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | React 19, React Router |
| Backend | Node.js, Express, JWT, bcrypt, SQLite |
| AI server | Python, Flask, PyTorch, Ultralytics YOLOv5, torchvision DeepLabV3, OpenCV |

## Project structure

```
src/         React frontend
backend/     Express API (auth + upload proxy)
ai-server/   Flask inference server (detection + segmentation)
```

## Run locally

```bash
# AI server
cd ai-server
pip install flask torch torchvision ultralytics opencv-python pillow
python app.py

# Backend: copy .env.example to .env and set SECRET_KEY
cd backend
npm install
node index.js

# Frontend
npm install
npm start
```

## Author

**Zeiad Emad**: [LinkedIn](https://www.linkedin.com/in/zeiad-emad/) · [GitHub](https://github.com/zeiad-E)
