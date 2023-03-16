import React from 'react'
import edit from '../../../assets/params/images/icon/edit.png'
import prddelete from '../../../assets/params/images/icon/delete.png'
const Actions = ({onEditClick, onDeleteClick}) => {
  return (
    <>
      <div onClick={onEditClick}>
        <img className="action_box" src={edit} alt="" />
      </div>
      <div onClick={onDeleteClick}>
        <img className="action_box" src={prddelete} alt="" />
      </div>
    </>
  )
}

export default Actions
