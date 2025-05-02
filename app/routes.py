from flask import Blueprint,render_template,url_for,request,redirect
from datetime import datetime
from .models import *
from . import db

routes = Blueprint('routes', __name__)


@routes.route('/')
def index():
    incomplete = Todo.query.filter_by(complete=False).all()
    complete = Todo.query.filter_by(complete=True).all()

    return render_template('index.html',incomplete=incomplete, complete=complete)

@routes.route('/add',methods =['GET','POST'])
def add():
    if request.method =="POST":
        task = request.form['task']
        note = request.form['note']
        priority=request.form['priority']
        time = datetime.now()
        new_todo = Todo(task=task,note=note,priority=priority,time=time,complete=False)
        db.session.add(new_todo)
        db.session.commit()
    
    return redirect(url_for('routes.index'))

@routes.route('/complete/<id>')
def complete(id):
    todo = Todo.query.filter_by(id=int(id)).first() 
    todo.complete = True
    db.session.commit() 
  
    return redirect(url_for('routes.index')) 