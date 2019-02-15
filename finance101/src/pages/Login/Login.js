import React, { Component } from "react";
import { Button, Form } from "react-bootstrap"
import API from "../../utils/API"
import { Redirect } from "react-router-dom"
class Login extends Component {

    state = {
        email: "",
        pasword: "",
        isAuthenticated: false
    };



    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    login = event => {
        event.preventDefault();
        API.loginUser({ email: this.state.email, password: this.state.password })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({ isAuthenticated: true })
                }


            }).catch(err => console.log(err));
    };
    renderRedirect = () => {
        if (this.state.isAuthenticated) {
            return <Redirect to='/tool' />
        }
    }

    render() {

        return (
            <div>
                {this.renderRedirect()}
                <form class="form-signin">
                    <h1 class="h3 mb-3 font-weight-normal">User Login</h1>
                    <Form.Group controlID="RegisterUser">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name={"email"} value={this.state.email} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={this.handleInputChange} name={"password"} value={this.state.password} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button onClick={this.login} variant="primary" type="submit">
                        Register
                </Button>
                </form>


            </div>

        )
    }

}

export default Login;