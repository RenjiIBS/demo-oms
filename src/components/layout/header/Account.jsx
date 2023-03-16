import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import userIcon from '../images/user.png';
import './styles.css';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { useGetDetailsQuery } from '../../../redux/services/auth/authService'
import { logout, setCredentials, updateProfile } from '../../../redux/features/auth/authSlice'
import loggedInIcon from '../images/logged-in.PNG';
import { Modal, Button } from 'react-bootstrap';

const Account = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  //for showing diff image after logged in
  const accountIcon = userInfo ? loggedInIcon : userIcon;

  // automatically authenticate user if token is found
  const { data, isFetching } = useGetDetailsQuery('userDetails', {
    pollingInterval: 900000, // 15mins
  });

  useEffect(() => {
    if (data) dispatch(updateProfile(data));
  }, [data, dispatch]); 

  const handleLogout = () => {
    dispatch(logout());
    setShowModal(false); // Add this line to close the popup
    navigate("/")
  };

   return (
    <Navbar>
      <Container>
        <Navbar.Collapse className="justify-content-end">
          {userInfo ? (
            <button
              className="btn btn-link"
              onClick={() => setShowModal(true)}
            >
              <img
                className="imgDimension"
                src={accountIcon}
                alt="account"
              />
            </button>
          ) : (
            <NavLink className="nav-link" to="/login">
              <img
                className="imgDimension"
                src={accountIcon}
                alt="login"
              />
            </NavLink>
          )}

          <Modal show={showModal} onHide={() => setShowModal(false)} className="logout_popup">
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
              <p>Do you want to logout?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleLogout}>
                Logout
              </Button>
            </Modal.Footer>
          </Modal>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Account;