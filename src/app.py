from flask import Flask, jsonify, request, render_template, redirect, url_for, send_from_directory
from flask_socketio import SocketIO

app = Flask(__name__)
app.secret_key = "ghdgjdfhgdfj"
server = SocketIO(app)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/sendfile/<path:path>")
def sendfile(path):
    return send_from_directory('static', path)