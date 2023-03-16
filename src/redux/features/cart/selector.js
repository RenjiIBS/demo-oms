import { useSelector } from "react-redux";


const getTotalCartCount = () => {
  let count = 0;
  const { cart } = useSelector(state => state.cart);
  Object.keys(cart).forEach(cartKey => {
    Object.keys(cart[cartKey]).forEach(key => {
      count += cart[cartKey][key].length;
    })
  })

  return count;
}

export {
  getTotalCartCount
}