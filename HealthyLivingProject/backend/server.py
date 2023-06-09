from flask import Flask, request, jsonify
import json
from data import test
app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    #city = request.form["city"]
    #goal = request.form["goal"]
    #return jsonify(test())
    return test()
    #return jsonify(test(city,goal))


if __name__ == "__main__":
    app.run(host='0.0.0.0')
