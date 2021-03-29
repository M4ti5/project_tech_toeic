import React,  { Component } from 'react'
import Link from 'next/link'

export default class Tab extends Component {
    
    render(){
        return(
             <div class=" w-60 h-44 pt-0.5 rounded-md shadow-lg bg-white">
                <h2 class="mt-3 mx-10 text-3xl ">{this.props.title}</h2>
                <Link as = {this.props.href} href={this.props.href}>
                    <button class="w-20 h-9 ml-36 mt-10 rounded-sm text-white bg-gray-800 hover:text-gray-800 hover:bg-gray-200 duration-500">{this.props.textButton}</button>
                </Link>
            </div>
        ) 
    }
        
}
