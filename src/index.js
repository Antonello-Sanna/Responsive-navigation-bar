import React from 'react'
import { NavLink } from 'react-router-dom'
import Responsive from 'react-responsive';
import Burger 		from './Burger'
import PropTypes from 'prop-types';
import './navbar.css'
import Style from 'style-it';
import DropDown from './DropDown'
import './dropdown.css'
import './index.css'

const Desktop 	  = props => <Responsive {...props } minWidth = { 600} />;
const Mobile  	  = props => <Responsive {...props } minWidth = { 0 } maxWidth={600}  />;

export default class NavBarNPM extends React.Component{
	constructor(){
		super()
		this.state = {display:'none', scale:'scale(0)', transform:'', height:'0px'}
		this.createNavBar =this.createNavBar.bind(this)
	}
	toogler  = () => {
		var that = this
		var scaleIt = ( key, val, time, key2, val2 ) => {
			setTimeout(()=>{
				that.setState({[key]:val,[key2]:val2})
			},time)
		}
		if (this.state.display === 'none')  {
			that.setState({display:'block', transform:'rotate(80deg)'},scaleIt('scale', 'scaley(1)',50, 'height', '35vh'))
		} else {
			that.setState({height:'0px', transform:'', scale:'scale(0)'}, scaleIt('display','none',500))
		}
	}

	createNavBar(main){
		var content;
		var linkTo;
		return this.props.pages.map((ele, i)=>{
			var pageComp;
			if(ele === '/'){
				linkTo = ''
				content = <img
              				style={{
              					maxHeight:this.props.logoheight,
              					borderRadius:this.props.borderRadius
							  }}
							  alt = {this.props.imgLogoAlt}
              				  src = {this.props.logo}
              				/>
			}else{
				var dropdownArray;
				typeof ele === 'object' ? dropdownArray = ele[Object.keys(ele)[0]].dropdown : null
				typeof ele === 'object' ?  content = Object.keys(ele)[0] : content = ele;

				typeof ele === 'object' ?  linkTo = Object.keys(ele)[0] : linkTo = ele;
			}
				pageComp = 				<div
					className='dropdown'
					style={main.element}
              				key = {i}>
						{ dropdownArray ?
						  <li 
						  	style={{color:this.props.color}}
						  	to={`/${linkTo}`}>
							{content}

									<DropDown 
										dropdown_color     		=   {this.props.dropdown_color}
										dropdownItems 	   		=   {dropdownArray}
										dropdown_minWidth  		=   {this.props.dropdown_minWidth}
										dropdown_marginTop 		=   {this.props.dropdown_marginTop}
										dropItem_margin_bottom  =   {this.props.dropItem_margin_bottom}
									/>

              			</li>
						:
						<NavLink 
							style={{color:this.props.color}}
							to={`/${linkTo}`} 
							exact className="inactive"
							activeClassName="active">
					  {content}


					</NavLink>}
              	</div>
			return pageComp
		})
	}


	render(){


		let main = {
			desktop:{
				display:'grid',
				minHeight:'60px',
				alignItems:'center',
				gridTemplateColumns:`repeat(${this.props.pages.length}, 1fr)`,
				backgroundColor: this.props.background,
				position:'fixed',
				top:0,
				width:'100%'
			},
			mobile:{
				display:'grid',
				height:this.state.height,
				alignItems:'center',
				gridTemplateColumns:'1fr',
				transition:'.5s ease all'
			},
			element:{
				padding:'10px',
				textDecoration:'none'
			},
			burger:{
				display:this.state.display,
				transform:this.state.scale,
				transition:'.5s ease all'
			},
			minNav:{
				backgroundColor: this.props.background,
				marginBottom:'100px'
			}
		}
		return ( 
			<Style>
				{`
					.active::after {
						width: 100%;
						transition: width .3s;
						background: ${this.props.color};
					}
				`}
			<div style={main.minNav}>
			<Desktop>
			<ul style={main.desktop}>
				{this.createNavBar(main)}
			</ul>
			</Desktop>
			<Mobile>
			<Burger 
				color     = "black"
				toggler   = {this.toogler} 
				transform = {this.state.transform}
			/>
			<div style={main.burger}>
				<ul 
				style={main.mobile}>
				{this.createNavBar(main, 'smallNav')}
			</ul></div>
			</Mobile>
			</div>
		</Style>
		)
	}
}

NavBarNPM.defaultProps = {
	background:'rgba(1,0,0,.9)',
	pages:['/','gallery','contact','about'],
	logo:'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png',
	logoheight:'50px',
	color:'white',
	borderRadius:'30px',
	imgLogoAlt:'github',
    dropdown_color:'rgba(1,0,0,.9)',
    dropdown_minWidth:'200px',
    dropdown_marginTop:'10px',
    dropItem_margin_bottom:'10px'
}
NavBarNPM.propTypes = {
	background      		: PropTypes.string,
	pages 	        		: PropTypes.array.isRequired,
	logo 	        		: PropTypes.string,
	logoheight      		: PropTypes.string,
	color 	        		: PropTypes.string,
	borderRadius    		: PropTypes.string,
	imgLogoAlt      		: PropTypes.string,
	dropdown_color 			: PropTypes.string,
	dropdown_minWidth       : PropTypes.string,
    dropdownItems           : PropTypes.array,
    dropdown_marginTop      : PropTypes.string,
    dropItem_margin_bottom  : PropTypes.string,
}