import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            username: ''
        };
        this.addTask = this.addTask.bind(this);
    }

    addTask(e){
        console.log(this.state);
        e.preventDefault();
    }

    render() {
        return(
            <div>
                <nav className="blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">User Manager</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="name" onChange={this.handleChange} type="text" placeholder="Nombre completo" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="username" onChange={this.handleChange} type="text" placeholder="Usuario" />
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
                        <div className="col s7">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;