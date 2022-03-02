from flask import Flask, jsonify, request, render_template, url_for, send_from_directory
from flask_socketio import SocketIO, join_room, leave_room
from Enigma.enigma import encrpyt
from random import randint
from Chats.chat import Chat

app = Flask(__name__)
app.config["SECERT_KEY"] = "ghdgjdfhgdfj"
server = SocketIO(app)

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
    return "Todo"

@app.route("/room_password")
def room_password():
    return render_template("check_password.html")

@app.route("/check_password")
def check_password():
    password = request.args.get('password')

@app.route("/create")
def create():
    return render_template("create.html")

@app.route("/create_room")
def create_room():
    chat_room = randint(1000, 5000000)
    
    while chat_room in chat_rooms_list:
        chat_room = randint(1000, 5000000)

    password = encrpyt('thanksforcreatingroom')
    chat_rooms[chat_room] = [password, Chat()]
    chat_rooms_list.append(str(chat_room))

    return jsonify(f"Room:\n{chat_room}\nPassword:\n\t{password}")