import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Cart from './Cart'
import './styles.css';
import Account from './Account';
import Flight from '../topsection/flight';
import Service from '../services/Hug'
import Displaycart from '../cartitems';
import TravelPlan from '../../../screens/travelplan/travelplan';
import {useLocation} from 'react-router-dom';

const Header = () => {

  let location = useLocation();


  return (
    <>
      <Navbar expand="lg" className='navBar navH'  >
        <Container fluid>
          <Navbar.Brand href="/" className='navBar p-size' id='airport' to='/'>Offer.com</Navbar.Brand>

          <Form className="searchBox searchRight">
            <Form.Control
              type="search"

              className="me-2 bg searchRight"
              aria-label="Search"
            />

          </Form>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className='rightNav'>
            <Nav
              className="my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/jurneyplan" className='navBar'>My Travel Plan</Nav.Link>
              {/* <Nav.Link href="/jurneyplan" className='navBar'>j</Nav.Link> */}
              <Nav.Link as={NavLink} to="/wishlist" className='navBar'>My Wishlist</Nav.Link>
              <Nav.Link href="#action1" className='navBar'>Offers</Nav.Link>
              <Nav.Link href="#action1" className='navBar'>Help</Nav.Link>

            </Nav>

          </Navbar.Collapse>
        </Container>
        <Cart />
        <Account />
      </Navbar>
      {(location.pathname !== '/login' && location.pathname !== '/cart'&& location.pathname !== '/paymentoptions'&& location.pathname !== '/paymentconfirmation') &&<Flight /> }
      {/* the below line was causing duplicate icon when impemented filter logic in service icon */}
      {/* {location.pathname !== '/login' && location.pathname !== '/travelplan' &&<Service /> } */} 
    </>
  );
}

export default Header;