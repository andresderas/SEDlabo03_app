import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            users: [],
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        if(this.state._id) {
            fetch(`/api/tasks/${this.state._id}`,{
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({name: '', username: '', _id: ''});
                this.fetchTasks();
            });
        } else {
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    this.setState({name: '', username: ''});
                    this.fetchTasks();
                })
                .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.setState({users: data});
            });
    }

    deleteTask(id) {
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.fetchTasks();
        });
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({
                    name: data.name,
                    username: data.username,
                    _id: data._id
                })
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]:value
        });
    }

    render() {
        return(
            <div>
                <nav className="blue darken-4">
                    <div className="container center">
                        <a className="brand-logo center " href="/">User Manager</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Nombre completo" value={this.state.name} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="username" onChange={this.handleChange} type="text" placeholder="Usuario" value={this.state.username} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <button type="submit" className="btn blue darken-4 btn-large col s12">
                                                Crear
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre Completo</th>
                                        <th>Usuario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map(task => {
                                            return (
                                                <tr key={task._id}>
                                                    <td>{task.name}</td>
                                                    <td>{task.username}</td>
                                                    <td>
                                                        <button className="blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editTask(task._id)} className="blue darken-4" style={{margin: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;