import cv2
import numpy as np
import urllib.request as ur

BASE_URL = 'http://192.168.254.102:8080/shot.jpg'


class Camera(object):

    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def ip_camera(self, grayscale=False):
        image_response = ur.urlopen(BASE_URL)
        image_num_array = np.array(bytearray(image_response.read()), dtype=np.uint8)
        frame = cv2.imdecode(image_num_array, -1)
        if grayscale:
            cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        return frame

    def get_frame(self, grayscale=False):

        _, frame = self.video.read()

        if grayscale:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        return frame

    def show_frame(self, seconds, grayscale=False):

        _, frame = self.video.read()
        if grayscale:
            frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        cv2.imshow('SnapShot', frame)
        key_pressed = cv2.waitKey(seconds * 1000)

        return key_pressed & 0xFF


if __name__ == '__main__':
    VC = VideoCamera()
    while True:
        KEY = VC.show_frame(1, True)
        if KEY == 27:
            break
    VC.show_frame(1)
