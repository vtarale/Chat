from flask import Flask, jsonify, request, render_template, url_for, send_from_directory
from flask_socketio import SocketIO, join_room, leave_room, emit
from Enigma.enigma import encrpyt
from random import randint
from Chats.chat import Chat

app = Flask(__name__)
app.config["SECERT_KEY"] = "ghdgjdfhgdfj"
socketio = SocketIO(app)

chat_rooms  = dict()
chat_rooms_list = []

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sendfile/<path:path>")
def sendfile(path):
    return send_from_directory('static', path)

@app.route("/check")
def check():
    roomno = request.args.get("roomid")
    if str(roomno) in chat_rooms_list:
        return jsonify(1)
    return jsonify(0)

@app.route("/room")
def room():
    room = request.args.get("room")
    _, chat, _ = chat_rooms[str(room)]
    return render_template("room.html", messages=chat.chats)

@app.route("/room_password")
def room_password():
    return render_template("check_password.html")

@app.route("/check_password")
def check_password():
    password = request.args.get('password')
    roomid = request.args.get('roomid')
    realpassword, _ , _ = chat_rooms[str(roomid)]
    
    if realpassword == password:
        return jsonify(1)
    return jsonify(0)

@app.route('/get_name')
def get_name():
    return render_template("get_name.html")

@app.route("/create")
def create():
    return render_template("create.html")

@app.route("/create_room")
def create_room():
    chat_room = randint(1000, 5000000)
    
    while chat_room in chat_rooms_list:
        chat_room = randint(1000, 5000000)

    password = encrpyt('thanksforcreatingroom')
    chat_rooms[str(chat_room)] = [password, Chat(), []]
    chat_rooms_list.append(str(chat_room))

    return jsonify(f"Room:\n{chat_room}\nPassword:\n\t{password}")

@socketio.on("join")
def join(data):
    name = data["name"]
    room = data["roomid"]
    join_room(str(room))
    _, chat, _ = chat_rooms[str(room)]
    chat.add(f"{name} has joined")
    emit("person", {"r": f"{name} has joined"}, to=str(room))

@socketio.on("message")
def mesaage(data):
    room = data["id"]
    name = data["name"]
    message = data["message"]
    string = str(name) + str(message)
    _, chat, _ = chat_rooms[str(room)]
    chat.add(string)
    emit("new message", {"message": chat.chats}, to=str(room))