import React,  { Component } from 'react'


export default class Header extends Component {
    
    render(){
        return(
            <header className="bg-white shadow mb-6">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900"> {this.props.title} </h1>
                </div>
            </header>
        )
    }
}