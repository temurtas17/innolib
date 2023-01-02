from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
import datetime

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    name = db.Column(db.String(80))
    surname = db.Column(db.String(80))
    email = db.Column(db.String(80), unique=True)
    password = db.Column(db.Text, nullable=False)
    role = db.Column(db.String(32), default="member")

class Projects(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    body = db.Column(db.Text())
    date = db.Column(db.DateTime, default = datetime.datetime.now)
    userid = db.Column(db.String(32), db.ForeignKey('users.id'))
    name = db.Column(db.String(80))
    users = db.relationship('Users', backref=db.backref('projects', lazy=True))