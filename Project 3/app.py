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

@app.route("/data/adele")
def adeleFunct():
    adele_data = list(db["Adele"].find())
    for a in adele_data:
        del a["_id"]
    return jsonify(adele_data)

@app.route("/data/ariana")
def arianaFunct():
    ariana_data = list(db["ArianaGrande"].find())
    for a in ariana_data:
        del a["_id"]
    return jsonify(ariana_data)

@app.route("/data/bts")
def btsFunct():
    bts_data = list(db["BTS"].find())
    for b in bts_data:
        del b["_id"]
    return jsonify(bts_data)

@app.route("/data/beyonce")
def beyonceFunct():
    beyonce_data = list(db["Beyonce"].find())
    for a in beyonce_data:
        del a["_id"]
    return jsonify(beyonce_data)

@app.route("/data/billie")
def billieFunct():
    billie_data = list(db["BillieEilish"].find())
    for a in billie_data:
        del a["_id"]
    return jsonify(billie_data)

@app.route("/data/bruno")
def brunoFunct():
    bruno_data = list(db["BrunoMars"].find())
    for a in bruno_data:
        del a["_id"]
    return jsonify(bruno_data)

@app.route("/data/coldplay")
def coldplayFunct():
    coldplay_data = list(db["Coldplay"].find())
    for a in coldplay_data:
        del a["_id"]
    return jsonify(coldplay_data)

@app.route("/data/dualipa")
def dualipaFunct():
    dualipa_data = list(db["DuaLipa"].find())
    for a in dualipa_data:
        del a["_id"]
    return jsonify(dualipa_data)

@app.route("/data/edsheeran")
def edsheeranFunct():
    edsheeran_data = list(db["EdSheeran"].find())
    for a in edsheeran_data:
        del a["_id"]
    return jsonify(edsheeran_data)

@app.route("/data/eminem")
def eminemFunct():
    eminem_data = list(db["Eminem"].find())
    for a in eminem_data:
        del a["_id"]
    return jsonify(eminem_data)

@app.route("/data/glassanimals")
def glassanimalsFunct():
    glassanimals_data = list(db["GlassAnimals"].find())
    for a in glassanimals_data:
        del a["_id"]
    return jsonify(glassanimals_data)

@app.route("/data/harrystyles")
def harrystylesFunct():
    harrystyles_data = list(db["HarryStyles"].find())
    for a in harrystyles_data:
        del a["_id"]
    return jsonify(harrystyles_data)

@app.route("/data/imaginedragons")
def imaginedragonsFunct():
    imaginedragons_data = list(db["ImagineDragons"].find())
    for a in imaginedragons_data:
        del a["_id"]
    return jsonify(imaginedragons_data)

@app.route("/data/justinbieber")
def justinbieberFunct():
    justinbieber_data = list(db["JustinBieber"].find())
    for a in justinbieber_data:
        del a["_id"]
    return jsonify(justinbieber_data)

@app.route("/data/maroon5")
def maroon5Funct():
    maroon5_data = list(db["Maroon5"].find())
    for a in maroon5_data:
        del a["_id"]
    return jsonify(maroon5_data)

@app.route("/data/onedirection")
def onedirectionFunct():
    onedirection_data = list(db["OneDirection"].find())
    for a in onedirection_data:
        del a["_id"]
    return jsonify(onedirection_data)

@app.route("/data/postmalone")
def postmaloneFunct():
    postmalone_data = list(db["PostMalone"].find())
    for a in postmalone_data:
        del a["_id"]
    return jsonify(postmalone_data)

@app.route("/data/rihanna")
def rihannaFunct():
    rihanna_data = list(db["Rihanna"].find())
    for a in rihanna_data:
        del a["_id"]
    return jsonify(rihanna_data)

@app.route("/data/weekend")
def weekendFunct():
    weekend_data = list(db["Weekend"].find())
    for a in weekend_data:
        del a["_id"]
    return jsonify(weekend_data)

if __name__ == "__main__":
    app.run(debug=True, port = 64576)
