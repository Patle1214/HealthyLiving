from flask import Flask, request
import json
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    return 'TEMP DATA STR'


if __name__ == "__main__":
    app.run(host='0.0.0.0')
