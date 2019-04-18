import cv2


class VideoCamera(object):

    def __init__(self):
        # Open a camera
        self.cap = cv2.VideoCapture(
            'udpsrc port=9000 caps = "application/x-rtp, media=(string)video, clock-rate=(int)90000, encoding-name=('
            'string)H264, payload=(int)96" ! rtph264depay ! decodebin ! videoconvert ! appsink',
            cv2.CAP_GSTREAMER)

        # Initialize video recording environment
        self.is_record = False
        self.out = None

        # Thread for recording
        self.recordingThread = None

    def __del__(self):
        self.cap.release()

    def get_frame(self):
        ret, frame = self.cap.read()
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        if ret:
            ret, jpeg = cv2.imencode('.jpg', frame)
            return jpeg.tobytes()

        else:
            return None


