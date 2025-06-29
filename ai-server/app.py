from flask import Flask, request, jsonify
import torch
import torchvision.transforms as T
from torchvision.models.segmentation import deeplabv3_resnet50
from PIL import Image
import numpy as np
from ultralytics import YOLO
import base64
import cv2

app = Flask(__name__)

# Load models
yolo_model = YOLO("yolov5s.pt")  # COCO-trained model for classification and detection
seg_model = deeplabv3_resnet50(weights="DEFAULT")
seg_model.eval()

# COCO class names (YOLOv5 uses COCO dataset)
coco_labels = yolo_model.model.names
pet_classes = [15, 16]  # Class IDs for 'cat' and 'dog' in COCO

# VOC-style labels for segmentation (DeepLabV3 uses Pascal VOC)
segmentation_labels = [
    'background', 'aeroplane', 'bicycle', 'bird', 'boat', 'bottle', 'bus', 'car', 'cat',
    'chair', 'cow', 'diningtable', 'dog', 'horse', 'motorbike', 'person', 'pottedplant',
    'sheep', 'sofa', 'train', 'tvmonitor'
]

# Preprocess the uploaded image
def preprocess_image(image_file):
    image = Image.open(image_file).convert("RGB")
    input_tensor = T.ToTensor()(image).unsqueeze(0)  # For segmentation
    return image, input_tensor

# Encode image to base64 for sending back to the client
def encode_image(image):
    _, buffer = cv2.imencode('.png', image)
    return base64.b64encode(buffer).decode('utf-8')

@app.route('/process_image', methods=['POST'])
def process_image():
    # Step 1: Get the uploaded image
    image_file = request.files['image']
    image, input_tensor = preprocess_image(image_file)

    # Step 2: Classification using YOLOv5 to check for pets
    yolo_results = yolo_model.predict(image, conf=0.5)[0]
    yolo_boxes = yolo_results.boxes
    pets_detected = any(int(box.cls[0].item()) in pet_classes for box in yolo_boxes)

    if not pets_detected:
        # Step 4: If no pets detected, return message
        return jsonify({'classification': 'No pets found in the image'})

    # Step 3: If pets are detected, proceed with detection and segmentation
    # Detection visualization
    detection_img = np.array(image)
    for box in yolo_boxes:
        x1, y1, x2, y2 = box.xyxy[0]
        conf = box.conf[0].item()
        cls_id = int(box.cls[0].item())
        label = coco_labels[cls_id]
        cv2.rectangle(detection_img, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
        cv2.putText(detection_img, f"{label} ({conf:.2f})", (int(x1), int(y1) - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)

    # Segmentation
    with torch.no_grad():
        seg_output = seg_model(input_tensor)["out"]
        seg_mask = torch.argmax(seg_output.squeeze(), dim=0).cpu().numpy()

    # Visualize Segmentation (highlight 'cat' or 'dog', IDs 8 and 12 in VOC)
    seg_mask_img = seg_mask.copy()
    seg_mask_img[~np.isin(seg_mask_img, [8, 12])] = 0  # Keep only cat (8) and dog (12)
    seg_mask_img = (seg_mask_img * 255 / seg_mask_img.max() if seg_mask_img.max() > 0 else seg_mask_img).astype(np.uint8)
    seg_mask_img = cv2.applyColorMap(seg_mask_img, cv2.COLORMAP_JET)

    # Encode images to base64
    detection_base64 = encode_image(detection_img)
    segmentation_base64 = encode_image(seg_mask_img)

    # Step 3: Return results with visualizations
    return jsonify({
        'classification': 'Pets detected',
        'detection_image': detection_base64,
        'segmentation_image': segmentation_base64
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)