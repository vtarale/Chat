from flask import Flask, jsonify, request, render_template, redirect, url_for, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__)
app.secret_key = "ghdgjdfhgdfj"
server = SocketIO(app)

chat_rooms  = dict()
chat_rooms_list = ["1234"]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sendfile/<path:path>")
def sendfile(path):
    return send_from_directory('static', path)

@app.route("/check")
def check():
    roomno = request.args.get("roomid")
    if roomno in chat_rooms_list:
        return jsonify(1)
    return jsonify(0)

@app.route("/room")
def room():
    return "Todo"

@app.route("/create")
def create():
    return render_template("create.html")