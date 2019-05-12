from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS
from Camera import VideoCamera
from DatabaseCommunication import DatabaseCommunication

app = Flask(__name__)
CORS(app)

video_camera = None
global_frame = None

database_communication = DatabaseCommunication()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def any_root_path(path):
    return render_template('index.html')


@app.route('/train/gaindata/newPerson', methods=['POST'])
def add_person_to_list():
    json_result = request.get_json()
    database_communication.add_to_collection('users', json_result)
    return Response(status=201, mimetype='application/json')


@app.route('/auditTrial', methods=['POST'])
def add_audit_trial_to_list():
    json_result = request.get_json()
    print(json_result)
    database_communication.add_to_collection('auditTrials', json_result)
    return Response(status=201, mimetype='application/json')


@app.route('/auditTrial1', methods=['GET'])
def get_audit_trials():
    audit_trials = database_communication.get_all_from_collection('auditTrials')

    result = []

    for field in audit_trials:
        result.append({'fullName': str(field['fullName']), 'dateAndTime': field['dateAndTime'], 'accuracy': field['accuracy']})
    return jsonify(result)


def handle_database_response(response_from_db):
    return 201 if response_from_db is not None else 400


def video_stream():
    global video_camera
    global global_frame

    if video_camera == None:

        video_camera = VideoCamera()

    while True:
        frame = video_camera.get_frame()

        if frame != None:
            global_frame = frame
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        else:
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + global_frame + b'\r\n\r\n')


@app.route('/video_viewer')
def video_viewer():
    return Response(video_stream(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == '__main__':
    app.run(host='0.0.0.0', threaded=True)
