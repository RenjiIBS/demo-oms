import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userLogin } from '../../../redux/features/auth/authActions'

const PrivateRoute = ({ children, history }) => {

    const { loading, userInfo, error } = useSelector((state) => state.auth)
    let location = useLocation();

    if (!userInfo) {
        // not logged in so redirect to login page with the return url
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    // authorized so return child components
    return children;

}


export default PrivateRoute;