import React from 'react'
import './dropdown.css'
import Style from 'style-it'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import './navbar.css'
const DropDown =  props => {
    var changePage = page => {
        props.history.push({pathname:page})
    }
        return <Style>
        {`
            .drop_Content {
                display: none;
                margin-top:${props.dropdown_marginTop};
                position: absolute;
                background-color: ${props.dropdown_color};
                min-width: ${props.dropdown_minWidth};
                padding: 12px 16px;
                z-index: 1;
            }
            .item{
                margin-bottom:${props.dropItem_margin_bottom};
            }
        `}
            <ul className="dropdown-content">
                {    
                    props.dropdownItems.map((ele, i)=>{
                        return  <li className ='item' key ={i} ><NavLink 
                                        className ='item'
                                        to = {`/${ele}`}
                                        exact className="inactive"
                                        activeClassName="active">
                                    {ele}
                                </NavLink></li>
                })            
                }
            </ul>
        </Style>
}
DropDown.propTypes = {
    dropdown_color          : PropTypes.string,
    dropdown_minWidth       : PropTypes.string,
    dropdownItems           : PropTypes.array.isRequired,
    dropdown_marginTop      : PropTypes.string,
    dropItem_margin_bottom  : PropTypes.string,
}

export default DropDown;