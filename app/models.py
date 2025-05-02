from . import db
from datetime import datetime

class Todo(db.Model) :
    id = db.Column(db.Integer,primary_key=True)
    task = db.Column(db.String(50))
    note = db.Column(db.String(200))
    priority = db.Column(db.String(20))
    time = db.Column(db.DateTime, default=datetime.now)
    complete = db.Column(db.Boolean)

    def __repr__(self):
        return self.task , self.note , self.priority , self.time
