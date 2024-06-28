import React from 'react'
import './ExploreMenu.css'
import{ menu_list} from '../../assets/assets.js'


const ExploreMenu = ({ category ,setCategory}) => {

  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our Menu</h1>
        <p className='explore-menu-text'>Choose from a diverse menu featuring a delecrable array of dishes.Our mission is to satisfy your cravings and elevate your dining experience,one delicious meal at a time.</p>
        <div className='explore-menu-list'>
            {menu_list.map((item,index) => {
                return(
                    <div onClick={() => setCategory(prev=>prev===item.menu_name ? "All" : item.menu_name)} key={index} className='explore-menu-list-item'>
                        <img className = {category === item.menu_name ? "active" : ""} src={item.menu_image} alt="menu_image" />
                        <p>{item.menu_name}</p>
                    </div>
                )
            })}

        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu