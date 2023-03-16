import React from 'react'
import cartimg from '../../../assets/params/images/productimage/prdt1.png'
import wishlst from '../../../assets/params/images/icon/wishlist.png'
import addcart from '../../../assets/params/images/icon/addcart.png'
import './styles.css'
const Recommendeditem = () => {
	return (
		<>
		   
			<div className='d-flex recommend-box'>
				<div >
					<img src={cartimg} alt="" className="recommend-img"  />
				</div>
				<div>
					<span className='recomm-title'>Product Title</span>
				</div>
				<div>
					<img className="" src={wishlst} alt="" />
				</div>
				<div >
					<img className="" src={addcart} alt="" />
				</div>
			</div>
		</>
	)
}

export default Recommendeditem
