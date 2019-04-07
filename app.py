from flask import Flask,render_template
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)

@app.route('/')
def home():
    data=open("data/cereal.csv","r")
    fields=data.readline().split(",")
    fields=fields[3:12]
    return render_template("home.html",fields=fields) 

@app.route('/cereal')
def cereal():
    data=open("data/cereal.csv", "r")
    fields=data.readline().split(",")
    fields=fields[3:12]
    return render_template("cereal.html")

@app.route('/histo')
def histo():
	data=open("data/cereal.csv", "r")
	fields=data.readline().split(",")
	# print(fields);
	fields=fields[3:12]
	# print(fields);
	return render_template("histo.html",fields=fields)
	
if __name__ == '__main__':
    app.debug = True
    app.run()