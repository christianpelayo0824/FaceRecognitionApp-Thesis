import cv2
import os
import sys
import lib.face_corrector as op
import numpy as np
import json

from lib.camera import Camera
from lib.face_detector import FaceDetector

# DATABASE_DIR = './engine/database/faces/'
# FACE_CASCADES = './engine/cascades/data/haarcascade_frontalface_alt.xml'


# For Testing
DATABASE_DIR = '../engine/database/faces/'
FACE_CASCADES = 'cascades/data/haarcascade_frontalface_alt.xml'


def get_images(frame, faces_coord, shape):
    if shape == "rectangle":
        faces_img = op.cut_face_rectangle(frame, faces_coord)
        frame = op.draw_face_rectangle(frame, faces_coord)
    faces_img = op.normalize_intensity(faces_img)
    faces_img = op.resize(faces_img)
    return frame, faces_img


def start_recognize():
    shape = 'rectangle'
    try:
        faces = [employee for employee in os.listdir(DATABASE_DIR)]
    except Exception as ex:
        print(json.dumps({
            "message": "Have you added at least one person to the system?" + ex
        }))
        sys.exit()
    print(json.dumps({
        "message": "This are the people in the Recognition System:"
    }))
    for employee in faces:
        print(json.dumps({
            "-": employee
        }))

    choice = 3

    detector = FaceDetector(FACE_CASCADES)
    if choice == 1:
        recognizer = cv2.face.EigenFaceRecognizer_create()
        threshold = 4000
    elif choice == 2:
        recognizer = cv2.face.FisherFaceRecognizer_create()
        threshold = 300
    elif choice == 3:
        recognizer = cv2.face.LBPHFaceRecognizer_create()
        threshold = 105
    images = []
    labels = []
    labels_faces = {}
    for i, image_person in enumerate(faces):
        labels_faces[i] = image_person
        for image in os.listdir(DATABASE_DIR + image_person):
            images.append(cv2.imread(DATABASE_DIR + image_person + '/' + image, 0))
            labels.append(i)
    try:
        recognizer.train(images, np.array(labels))
    except:
        print("\nOpenCV Error: Do you have at least two people in the database?\n")
        sys.exit()

    video = Camera()
    while True:
        stroke = 1
        color = (99, 30, 233)

        frame = video.get_frame()
        faces_coord = detector.detect(frame, False)
        if len(faces_coord):
            frame, faces_img = get_images(frame, faces_coord, shape)
            for i, face_img in enumerate(faces_img):
                # if __version__ == "3.1.0":
                #     collector = cv2.face.MinDistancePredictCollector()
                #     recognizer.predict(face_img, collector)
                #     conf = collector.getDist()
                #     pred = collector.getLabel()
                # else:
                pred, conf = recognizer.predict(face_img)
                # print("Prediction: " + str(pred))
                # print('Confidence: ' + str(round(conf)))
                # print('Threshold: ' + str(threshold))

                print(json.dumps({
                    'prediction': pred,
                    'Confidence': conf,
                    'Threshold': threshold
                }))

                if conf < threshold:
                    cv2.putText(frame, labels_faces[pred].capitalize() + ' | ' + str(round(conf)),
                                (faces_coord[i][0], faces_coord[i][1] - 2),
                                cv2.FONT_HERSHEY_PLAIN, 1.7, color, stroke,
                                cv2.LINE_AA)
                else:
                    cv2.putText(frame, "Unknown",
                                (faces_coord[i][0], faces_coord[i][1]),
                                cv2.FONT_HERSHEY_PLAIN, 1.7, color, stroke,
                                cv2.LINE_AA)

        cv2.putText(frame, "ESC to exit", (5, frame.shape[0] - 5),
                    cv2.FONT_HERSHEY_PLAIN, 1.2, color, 1, cv2.LINE_AA)
        cv2.imshow('Video', frame)
        if cv2.waitKey(100) & 0xFF == 27:
            sys.exit()


if __name__ == '__main__':
    start_recognize()