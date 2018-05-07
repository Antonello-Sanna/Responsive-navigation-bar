import React from 'react'
import './dropdown.css'
import Style from 'style-it'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

const DropDown =  props => (
        <Style>
        {`
            .dropdown-content {
                display: none;
                margin-top:${props.dropdown_marginTop};
                position: absolute;
                background-color: ${props.dropdown_color};
                min-width: ${props.dropdown_minWidth};
                box-shadow: ${props.shadows ? '0px 8px 16px 0px rgba(0,0,0,0.2)' : null};
                padding: 12px 16px;
                z-index: 1;
            }
            .item{
                margin-bottom:${props.dropItem_margin_bottom};
            }
        `}
            <ul className="dropdown-content">
                {    
                    props.dropdownItems.map((ele, i)=>(
                        <li className="item">
                        <NavLink 
                            to={ele} 
                            exact className="inactive"
                            activeClassName="active">
                            {ele}
                        </NavLink>
                    </li>
                    ))            
                }
            </ul>
        </Style>
)
DropDown.propTypes = {
    dropdown_color          : PropTypes.string,
    dropdown_minWidth       : PropTypes.string,
    shadows                 : PropTypes.bool,
    dropdownItems           : PropTypes.array.isRequired,
    dropdown_marginTop      : PropTypes.string,
    dropItem_margin_bottom  : PropTypes.string,
}

export default DropDown;