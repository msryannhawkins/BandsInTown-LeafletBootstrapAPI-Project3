from flask import Flask, render_template, jsonify, request
# Import dependencies
import pymongo
from pprint import pprint
import json

app = Flask(__name__)

# Create connection variable
conn = 'mongodb://localhost:27017'

# Pass connection to the pymongo instance.
client = pymongo.MongoClient(conn)

db = client.Project3_BandsInTown


#database for now; using only Tswift as example
api = "https://rest.bandsintown.com/artists/Taylor%20Swift/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date=all"
apiDrake = "https://rest.bandsintown.com/artists/Drake/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date=all"
apiGaga = "https://rest.bandsintown.com/artists/Lady%20Gaga/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date=all"

@app.route("/")
def page():
   return render_template("index.html")

@app.route("/data/TS")
def TSFunct():
    TS_data = list(db["TaylorSwift"].find())
    for t in TS_data:
        del t["_id"]
    return jsonify(TS_data)

@app.route("/data/drake")
def drakeFunct():
    drake_data = list(db["Drake"].find())
    for d in drake_data:
        del d["_id"]
    return jsonify(drake_data)

@app.route("/data/gaga")
def gagaFunct():
    gaga_data = list(db["LadyGaga"].find())
    for g in gaga_data:
        del g["_id"]
    return jsonify(gaga_data)


if __name__ == "__main__":
    app.run(debug=True, port = 64576)
