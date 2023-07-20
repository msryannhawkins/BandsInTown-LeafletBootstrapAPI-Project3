from flask import Flask, render_template, jsonify, request
# Import dependencies
from pymongo import MongoClient
from pprint import pprint
import json

Mongo = MongoClient()
db = Mongo["Project3_BandsInTown"]

app = Flask(__name__)

#database for now; using only Tswift as example
api = "https://rest.bandsintown.com/artists/Taylor%20Swift/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date=all"


@app.route("/")
def page():
   return render_template("index.html")

@app.route("/data/TS")
def TSFunct():
    TS_data = list(db["TaylorSwift"].find())
    for t in TS_data:
        del t["_id"]
    return jsonify(TS_data)



if __name__ == "__main__":
    app.run(debug=True, port = 64576)
