import React, { useState, useEffect } from 'react'
import './productcard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {WishListIcon, ShoppingCartIcon, FavouritesIcon, HamburgerIcon, WishListFilledIcon, ShoppingCartFilledIcon, FavouritesFilledIcon} from '../../assets/params/icons/icons';
import {TfiMore} from 'react-icons/tfi'; 
import PopupComponent from '../popupcomponent/popupcomponent'; // import the PopupComponent
import { useSelector, useDispatch } from 'react-redux';
import {addToCart, cartError} from '../../redux/features/cart/cartslice';
import { fetchFav } from '../../redux/features/fav/favAction';

const ProductCard = ({product, width, height, isfav}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false); // add state for showing the popup
  const [wishicon, setWishIcon] = useState(<WishListIcon />);
  const [carticon, setCartIcon] = useState(<ShoppingCartIcon />);
  const [favicon, setFavIcon] = useState(<FavouritesIcon />);

  // selectors
  const { userInfo } = useSelector((state) => state.auth);
  const selectedFlights  = useSelector((state) => state.flight.flightList.filter(item => item.selected));
  const selectedInspirations  = useSelector((state) => state.inspiration.inspirationList.filter(item => item.selected));
  const {inspirationList}  = useSelector((state) => state.inspiration);
  const {flightList}  = useSelector((state) => state.flight);
  const optionType = useSelector(state => state.common.option)
  const dispatch = useDispatch();

  function handleAddToWishList() {
    setWishIcon(wishicon.type === WishListIcon ? <WishListFilledIcon /> : <WishListIcon />);
  }
  
  function handleAddToFavourites(favproduct) {
    setIsAdded(!isAdded);
    setFavIcon(favicon.type === FavouritesIcon ? <FavouritesFilledIcon /> : <FavouritesIcon />);
    console.log("fav values : ", favproduct.id)
    let data = { 'service_id': favproduct.id };
    // let data = { 'service_id': favproduct.id };
    if (!isAdded){
        dispatch(fetchFav(data));
    }
    
  }
  // const handleMouseOver = () => {
  //   setCartIcon(<ShoppingCartFilledIcon />);
  // };

  // const handleMouseOut = () => {
  //   setCartIcon(<ShoppingCartIcon />);
  // };
//onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} 
  function handlePopupOpen() { // function to open the popup
    console.log("Popup opened");
    setShowPopup(true);
  }

 
  function handlePopupClose() { // function to close the popup
    // adding add to cart action here, we need to look back once api is ready  cartError
    // const { type, data, flightNumber } = action.payload;
    const isInspriration = inspirationList.length > 0 && optionType == "inspiration";
    const isFlight = flightList.length > 0 && optionType != "inspiration";
    if (isInspriration || isFlight) {
      const cartData = {
        name: product.name,
        description: product.description[0],
        id: product.id,
        unitPrice: product.unitPrice,
        offerPrice: product.offerPrice,
        currency: product.currency,
        unitAdded: 1,
        images: product.images,
        selected: false
      }
      if (optionType != "inspiration") {
        selectedFlights.forEach((item) => {
          dispatch(addToCart({type: optionType, data: cartData, flightNumber: item.flightNo }))
        })
      } else {
        selectedInspirations.forEach((item) => {
          dispatch(addToCart({type: optionType, data: cartData, flightNumber: item.location }))
        })
      }
      
    } else {
      dispatch(cartError({error: {
        type: "pin-flight",
        msg: "Please add flights"
      }}))
    }
    setShowPopup(false);
    
  }

  const getProductCartDesc = () => {
    try {
      return imageIndex >= product?.description?.length
            ? product?.description[0].slice(0, 48)
            : product?.description[imageIndex].length > 48 
            ? product?.description[imageIndex].slice(0, 48)
            : product?.description[imageIndex]
    } catch (error) {
      console.log("CODE    ", error)
    }
  }

  return (
    <div className="product-card" style={{ width: `${width}px`, height: `${height}px`}}>
      <div className='product-card-container'>
        <div className='title-container'>
          <h5 className="product-card-title">{product.name}</h5>
          {(!product.offer && userInfo) && <div className="card-favourites" aria-label={product.id} name="FavouritesIconDiv" id={product.id} onClick={() => handleAddToFavourites(product)}>{favicon}</div>}
        </div>
        <div className= {product.offer ? "offer-image-container": "image-container"}>
          <div className="image-carousel" onClick={handlePopupOpen} style={{"marginTop":"15px"}}>
            <img src={product.images[imageIndex]} className="card-image" alt=""  />
            {product.images.length > 1 && (
              <div className="image-dots">
                {product.images.map((item, ind) => (
                  <span
                    key={ind}
                    className={`image-dot ${imageIndex === ind ? "active" : ""}`}
                    onClick={() => setImageIndex(ind)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className= {product.offer ? "product-card-offer-body": "product-card-service-body"}>
          <div className="product-card-description">
            {getProductCartDesc()
            }
          <TfiMore className='description-more' onClick={handlePopupOpen} />
          </div>
          {
          product.offerPrice? 
            <div className='product-card-cost'>
              <div className='product-card-cost' style={{ color:'grey', fontSize: '15px'}}>
                <strike>{product.currency}{product.unitPrice}</strike>
              </div>
              <div className='product-card-cost'>
                &nbsp;{product.currency}{product.offerPrice}
                { product.offerType==="percent"?
                (<span style={{ color: "red", marginLeft: "5px", fontSize: '15px' }}>
                  ({Math.round(((product.unitPrice - product.offerPrice) / product.unitPrice) * 100)}% off)
                </span>)
                :
                product.offerType==="flat"?
                (<span style={{ color: "red", marginLeft: "5px", fontSize: '15px' }}>
                  (flat {product.offervalue} off)
                </span>)
                : null
                }
              </div>
            </div>
          : 
          <div className='product-card-cost'>{product.currency}{product.unitPrice}</div>
          }
          {product.offerText && !product.offer && <div className='product-card-offer'>{product.offerText}</div>}
        </div>
        
        <div className= {product.offer ? "product-card-offer-icons": "product-card-icons"}>
          <div className="card-cart" onClick={handlePopupOpen} >{carticon}</div>
          <div className='card-wishlist' onClick={() => handleAddToWishList()} >{wishicon}</div> 
          <HamburgerIcon className="card-more"/>
        </div>
      </div>
      {showPopup && <PopupComponent selectedCard={product} onClose={handlePopupClose} />}
    </div>
  )
}


export default ProductCard