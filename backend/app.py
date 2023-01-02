from flask import Flask, jsonify, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, Users, Projects

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)

with app.app_context():
    db.create_all()

ma = Marshmallow(app)

class ProjectSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'body', 'userid', 'name', 'date')

project_schema = ProjectSchema()
projects_schema = ProjectSchema(many=True)

@app.route("/@me")
def get_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = Users.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "email": user.email,
        "role": user.role
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    name = request.json["name"]
    surname = request.json["surname"]
    email = request.json["email"]
    password = request.json["password"]
    role = request.json["role"]

    user_exists = Users.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    newUser = Users(name=name, surname=surname, email=email, password=hashed_password, role=role)
    db.session.add(newUser)
    db.session.commit()
    
    session["user_id"] = newUser.id

    return jsonify({
        "id": newUser.id,
        "name": newUser.name,
        "surname": newUser.surname,
        "email": newUser.email,
        "role": newUser.role
    })

@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]

    user = Users.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Please Fill Form"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Wrong Password"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "name": user.name,
        "surname": user.surname,
        "email": user.email,
        "role": user.role
    })

@app.route("/logout", methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"

@app.route('/add', methods= ['POST'])
def create_project():
    title = request.json['title']
    body = request.json['body']
    userid = request.json['userid']
    name = request.json["name"]

    if not all([title, body, userid, name]):
        return jsonify({"error": "Missing required fields"}), 400

    user = Users.query.get(userid)

    projects = Projects(title=title, body=body, name=name, users=user)
    db.session.add(projects)
    db.session.commit()
    return project_schema.jsonify(projects)

@app.route('/get', methods = ['GET'])
def get_projects():
    projects = Projects.query.all()
    all_projects = projects_schema.dump(projects)
    return jsonify(all_projects)

@app.route('/get/<id>', methods = ['GET'])
def get_project(id):
    project = Projects.query.get(id)
    return project_schema.jsonify(project)

@app.route('/update/<id>/', methods = ['PUT'])
def update_project(id):
    project = Projects.query.get(id)

    if project is None:
        return jsonify({"error": "Product not found"}), 404

    title = request.json['title']
    body = request.json['body']

    if title is not None:
        project.title = title
    if body is not None:
        project.body = body

    db.session.commit()
    return project_schema.jsonify(project)

@app.route('/delete/<id>/', methods = ['DELETE'])
def project_delete(id):
    project = Projects.query.get(id)
    db.session.delete(project)
    db.session.commit()
    return project_schema.jsonify(project)

if __name__ == "__main__":
    app.run(debug=True)