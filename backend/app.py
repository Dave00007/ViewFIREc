from flask import Flask, render_template, Response, request, jsonify
from flask_cors import CORS
from Camera import VideoCamera
from flask_socketio import SocketIO, send, emit
from DatabaseCommunication import DatabaseCommunication
from RpiRemoteControl import RpiRemoteControl

app = Flask(__name__)
socketio = SocketIO(app)
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
        result.append(
            {'fullName': str(field['fullName']), 'dateAndTime': field['dateAndTime'], 'accuracy': field['accuracy']})
    return jsonify(result)


@app.route('/train/gaindata/newPerson1', methods=['GET'])
def get_users():
    users = database_communication.get_all_from_collection('users')

    result = []

    for field in users:
        result.append({'company': str(field['company']), 'phone': field['prefix'] + ' ' + field['phone'],
                       'notes': field['notes'], 'department': field['department'], 'fullName': field['fullName'],
                       'email': field['email']})
    return jsonify(result)


@app.route('/train/gaindata/udpatePerson1/<full_name>', methods=['PUT'])
def update_user(full_name):
    users = database_communication.get_collection('users')
    fullName = request.get_json()['fullName']
    email = request.get_json()['email']
    prefix = request.get_json()['prefix']
    company = request.get_json()['company']
    phone = request.get_json()['phone']
    notes = request.get_json()['notes']
    department = request.get_json()['department']

    users.update_one({'fullName': full_name}, {"$set": {"fullName": fullName,
                                                       "email": email,
                                                       "prefix": prefix,
                                                       "company": company,
                                                       "phone": phone,
                                                       "notes": notes,
                                                       "department": department
                                                       }
                                               }, upsert=False)

    return Response(status=204, mimetype='application/json')


@app.route('/train/gaindata/udpatePerson1/<full_name>', methods=['DELETE'])
def delete_user(full_name):
    users = database_communication.get_collection('users')
    response = users.delete_one({'fullName': full_name})

    if response.deleted_count == 1:
        return Response(status=204, mimetype='application/json')
    else:
        return Response(status=404, mimetype='application/json')


@app.route('/start_streaming')
def start_streaming():
    rpi_remote_control = RpiRemoteControl()
    rpi_remote_control.start_stream()
    return Response(status=200, mimetype='application/json')

@app.route('/stop_streaming')
def stop_streaming():
    rpi_remote_control = RpiRemoteControl()
    rpi_remote_control.stop_stream()
    return Response(status=200, mimetype='application/json')

@socketio.on('client_connected')
def handle_client_connect_event(json):
    print('received json: {0}'.format(str(json)))


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
    socketio.run(app)
