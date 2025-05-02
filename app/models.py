from . import db

class Todo(db.Model) :
    id = db.Column(db.Integer,primary_key=True)
    task = db.Column(db.String(50))
    note = db.Column(db.String(200))
    priority = db.Column(db.String(20))
    complete = db.Column(db.Boolean)

    def __repr__(self):
        return self.task , self.note , self.priority
