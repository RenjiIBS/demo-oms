import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'react-bootstrap/Navbar';
import cartimg from "../images/Vector.png"
import './styles.css';
import { getTotalCartCount } from "../../../redux/features/cart/selector"
const Cart = ()=> {
  const cartCount = getTotalCartCount()
  const navigate = useNavigate();
  return (
    <Navbar>
      <Container  onClick={()=> navigate('/cart')}>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             <img className='imgDimension' src={cartimg} alt="" />
             <span><span className='total-cart'>{cartCount}</span></span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Cart;
