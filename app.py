from flask import Flask,render_template
app = Flask(__name__)

@app.route('/')
def home():
    data=open("data/cereal.csv","r")
    fields=data.readline().split(",")
    fields=fields[3:12]
    return render_template("home.html",fields=fields) 

if __name__ == '__main__':
    app.debug = True
    app.run()