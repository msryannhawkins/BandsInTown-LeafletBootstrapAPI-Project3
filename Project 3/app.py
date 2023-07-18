from flask import Flask, render_template #, jsonify, request
app = Flask(__name__)

#database for now; using only Tswift as example
api = "https://rest.bandsintown.com/artists/Taylor%20Swift/events?app_id=23bc806cf4fe0991e7a90f97a8e63576&date=all"


@app.route("/")
def index():
    return api

@app.route("/page")
def page():
   return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True, port = 6679)
