from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()
DB_NAME = "todo.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret'
    app.config['SQLALCHEMY_DATABASE_URI'] =f'sqlite:///{DB_NAME}'
    db.init_app(app)

    from .routes import routes

    app.register_blueprint(routes, url_prefix='/')

    from .models import Todo

    create_database(app=app)

    return app

def create_database(app):
    with app.app_context():
        db.create_all()


