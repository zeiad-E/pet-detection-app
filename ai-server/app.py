from flask import Flask, request, jsonify
import torch
import torchvision.transforms as T
from torchvision.models import resnet50
from torchvision.models.segmentation import deeplabv3_resnet50
from PIL import Image
import requests
from io import BytesIO
import numpy as np
from ultralytics import YOLO
import base64
import cv2

app = Flask(__name__)

# Load models
cls_model = resnet50(weights="IMAGENET1K_V1")
cls_model.eval()

yolo_model = YOLO("yolov5s.pt")  # COCO-trained model

seg_model = deeplabv3_resnet50(weights="DEFAULT")
seg_model.eval()

# Load ImageNet labels for classification
imagenet_labels = requests.get("https://raw.githubusercontent.com/pytorch/hub/master/imagenet_classes.txt").text.splitlines()

# VOC-style labels for segmentation
segmentation_labels = [
    'background', 'aeroplane', 'bicycle', 'bird', 'boat', 'bottle', 'bus', 'car', 'cat',
    'chair', 'cow', 'diningtable', 'dog', 'horse', 'motorbike', 'person', 'pottedplant',
    'sheep', 'sofa', 'train', 'tvmonitor'
]

# Preprocess the uploaded image for classification
def preprocess_image(image_file):
    image = Image.open(image_file).convert("RGB")
    input_cls = T.Compose([T.Resize((224, 224)), T.ToTensor()])(image).unsqueeze(0)
    return image, input_cls

# Encode image to base64 for sending back to the client
def encode_image(image):
    _, buffer = cv2.imencode('.png', image)
    return base64.b64encode(buffer).decode('utf-8')

@app.route('/process_image', methods=['POST'])
def process_image():
    # Get the uploaded image file
    image_file = request.files['image']
    image, input_cls = preprocess_image(image_file)

    # Classification
    with torch.no_grad():
        out_cls = cls_model(input_cls)
        cls_id = out_cls.argmax(dim=1).item()
        cls_name = imagenet_labels[cls_id]

    # Detection
    yolo_results = yolo_model.predict(image, conf=0.5)[0]
    yolo_boxes = yolo_results.boxes

    # Segmentation
    input_seg = T.ToTensor()(image).unsqueeze(0)
    with torch.no_grad():
        seg_output = seg_model(input_seg)["out"]
        seg_mask = torch.argmax(seg_output.squeeze(), dim=0).cpu().numpy()

    # Visualize Detection
    detection_img = np.array(image)
    for box in yolo_boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        conf = box.conf[0].item()
        cls = int(box.cls[0].item())
        label = yolo_model.model.names[cls]
        cv2.rectangle(detection_img, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(detection_img, f"{label} ({conf:.2f})", (int(x1), int(y1) - 5), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Visualize Segmentation (highlighting 'cat' class, ID 8, as an example)
    seg_mask_img = seg_mask.copy()
    seg_mask_img[seg_mask_img != 8] = 0  # Assuming class 8 is 'cat'
    seg_mask_img = (seg_mask_img * 255 / seg_mask_img.max()).astype(np.uint8)
    seg_mask_img = cv2.applyColorMap(seg_mask_img, cv2.COLORMAP_JET)

    # Encode images to base64
    detection_base64 = encode_image(detection_img)
    segmentation_base64 = encode_image(seg_mask_img)

    # Return results as JSON
    return jsonify({
        'classification': cls_name,
        'detection_image': detection_base64,
        'segmentation_image': segmentation_base64
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)