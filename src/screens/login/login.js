import React, { useState, useEffect } from 'react'
import './login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../../components/message'
import Loader from '../../components/loader'
import FormContainer from '../../components/formcontainer'
import { userLogin } from '../../redux/features/auth/authActions'
import axios from 'axios';
import { setCredentials } from '../../redux/features/auth/authSlice';

const userDetails =[
{
  "userName" : "750508657771",
  "password" : "750508657771"
},
{
  "userName" : "999935418925",
  "password" : "999935418925"
},
{
  "userName" : "223404669654",
  "password" : "223404669654"
},
{
  "userName" : "718972674303",
  "password" : "718972674303"

},
{
  "userName" : "832971032131",
  "password" : "832971032131"

},

{
  "userName" : "999916906339",
  "password" : "999916906339"

},

{
  "userName" : "994251330978",
  "password" : "994251330978"

},

{
  "userName" : "647576051524",
  "password" : "647576051524"

},
{
  "userName" : "801746472459",
  "password" : "801746472459"

},

{
  "userName" : "264574017965",
  "password" : "264574017965"

},


{
  "userName" : "888109183363",
  "password" : "888109183363"

},

{
  "userName" : "518725542264",
  "password" : "518725542264"

},
{
  "userName" : "504196797888",
  "password" : "504196797888"

},

{
  "userName" : "201453448066",
  "password" : "201453448066"

}







]

const LoginScreen = ({ history }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [itemsOrder, setItemsOrder] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  let  userInfo  = null;
  const redirect = ((location.state && location.state?.from?.pathname !== '/login') ? location.state.from.pathname : "/");
  const [showLogin, setShowLogin] = useState(true);
  const getData = async(username) =>{
    setLoading(true)
    const result = await axios.post('https://ybhxg44xf1.execute-api.ap-south-1.amazonaws.com/default/get_recommendation_dxi', { "user_id":username  });
    console.log("Data ",result.data)
    setLoading(false)
    if( userDetails.some(item => item.userName === username && item.password == password)) {
    setItemsOrder(result.data);
    localStorage.setItem("userToken", userName);
    localStorage.setItem("orderItems", JSON.stringify(result.data));
    return  result;
    }else {
      setError("Invalid User Name /Password" );
      return { "Eorror" : "Inavlid user"}
    }
  }
  useEffect(() => {

    if (itemsOrder && itemsOrder.items) {
      

      localStorage.setItem('userToken', username)
      localStorage.setItem('dataItem', JSON.stringify(itemsOrder))
      let userData ={
        userName: username,
        email: username,
        phoneNumber: username,
        roles: username
      }
      dispatch(setCredentials(userData))
      navigate("/home")
    }
  }, [history, itemsOrder, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Values->", username, password)
    let data = { 'username' : username, 'password': password };
    getData(username)
  }

  const handleClose = () => {
    setShowLogin(false);
    navigate('/');
  };

  if (!showLogin) {
    return null;
  }

  return (
    <div className="Auth-form-container">
      
    <FormContainer>
    <div className="login-form-box">
      <div className="login-close" onClick={handleClose}>
        <i className="fas fa-times"></i>
      </div>
      <h1 className="Auth-form-title">Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password' className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="rember"
            label="Remember Me"
          />
        </Form.Group>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign In
          </button>
        </div>
      </Form>
      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
      </div>
    </FormContainer>
    </div>
  )
}

export default LoginScreen




