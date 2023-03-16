import React from 'react'
import cartimg from '../../../assets/params/images/productimage/prdt1.png'
const  Itemimage= ({data, onCheckBoxClick, isChecked})=> {
  return (
    <>
    <div>
      <input type="checkbox" name="cartCheckBox" id={"chk-"+data.id}  aria-label={data.id + "-" + data.name} onClick={onCheckBoxClick} checked={isChecked || data.selected}/>
      </div>
    <div className="image_box">
        <img className='prd-img-size' src={data.images[0]} alt="" />
    </div></>
  )
}

export default Itemimage
