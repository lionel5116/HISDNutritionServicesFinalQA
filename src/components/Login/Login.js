import React from 'react';
import { connect } from "react-redux";
import Nav from 'react-bootstrap/Nav';
import {Navbar} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import {Form,FormControl,NavDropdown,Container,ListGroup} from 'react-bootstrap';


class Login extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        userName: '',
        password: '',
        role: 'Special',
        environment: '--select--'
      };
    };
    
    proceedToTeacher() {

    if (this.state.environment !== "--select--") {
      if (this.state.userName !== "" &&
        this.state.password !== "" &&
        this.state.environment == "local" | this.state.environment == "prod") {

        if (this.state.userName !== "lioneljones5116@gmail.com") {
          alert("You are not authorized to use this system..unless you have permission.")
          return;
        }
      }
      else {
        alert("You need a username , password. environment selected")
        return;
      }
    }
    else {
      alert("You must select an enviroment.. either - local or prod")
      return;
    }

    this.props.redLogin({userName: this.state.userName,
      password: this.state.password,
      role: this.state.role,
      environment: this.state.environment})


      this.props.history.push("/Teacher");

  }

  proceedStudentInfo() {
    this.props.history.push("/StudentInformation");
  }

  handleTextChange(e) {
      let fieldName = e.target.name;
      let fleldVal = e.target.value;
      this.setState({[fieldName]: fleldVal})
    }

    render() {
        return (
            <div id="MasterContainer">
                <Container>
                <Form>
                    
                <Form.Group controlId="environment">
                    <h2>Login Screen</h2>
               </Form.Group> 

                    
                   <Form.Group controlId="environment">
                        <Form.Label>Select Environment</Form.Label>
                            <Form.Control as="select" 
                            type='select'
                            name='environment' 
                            value={this.state.environment}
                            onChange={(e) => {this.handleTextChange(e)}}
                            >
                            <option value="--select--">--select--</option>
                            <option value="local">local</option>
                            <option value="prod">prod</option>
                        </Form.Control>
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" 
                          type='text'
                          name='userName' 
                          value={this.state.text}
                          onChange={(e) => {this.handleTextChange(e)}}
                        />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" 
                         type='text'
                         name='password' 
                         value={this.state.text}
                         onChange={(e) => {this.handleTextChange(e)}}
                        
                        />
                    </Form.Group>
                    <Button variant="primary" type="button"
                      onClick={() => this.proceedToTeacher()}>
                        Submit
                    </Button>
                    <Button variant="warning" type="button"
                      onClick={() => this.proceedStudentInfo()}>
                        Student Information Report
                    </Button>
                    </Form>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    
    userName: state.redLogin.userName,
    password: state.redLogin.password,
    environment: state.redLogin.environment,

  };
};

const mapDispatchToProps = dispatch => {
  return {
      redLogin: (payload) => {
          dispatch({type: 'LOGIN_DATA',
                  userName: payload.userName,
                  password: payload.password,
                  role: payload.role,
                  environment: payload.environment
              });           
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

