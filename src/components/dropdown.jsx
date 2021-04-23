import React,  { Component } from 'react'
import Link from "next/link"


export default class DropDown extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.onMouseLeave = this.onMouseLeave.bind(this)
    }
    
    handleClick(e) {
        e.preventDefault();
        document.getElementById("dropmenu").classList.replace("hidden","visible")
    }

    onMouseLeave(e) {
        document.getElementById("dropmenu").classList.replace("visible","hidden")
    }

    dropButtons(){

        return(

            this.props.sub_title.map(e => (
                    <Link as ={`${e.href}`} href={`${e.href}` } >
                        <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">{e.title} </a>
                    </Link>
                
            
            ))
        )
        
    }
          

    posX(){
        return parseInt(document.getElementById("dropdownButton").getBoundingClientRect()["x"])
    }

    
    render(){
        return(
            <div>

                <div className="static inline-block text-left">
                    <div>                            
                        <button id="dropdownButton" type="button" className="inline-flex justify-center w-full rounded-md  px-4 py-2  text-sm font-medium text-gray-300 hover:bg-gray-700"  onClick={this.handleClick} >
                            {this.props.title}
                            <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="white" >
                                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"  />
                            </svg>
                        </button>
                    </div>
                </div>

                <div id="dropmenu" className={"fixed top-14 left-"+this.posX +" hidden w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"} onMouseLeave={this.onMouseLeave}>
                    <div className="py-1">
                        {this.dropButtons()} 
                    </div>
                </div>

            </div>
        ) 
    }  
}

