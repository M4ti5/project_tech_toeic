import React,  { Component } from 'react'

export default class WarningBox extends Component {

    render(){
        return(
        <div class="bg-yellow-100 px-24 mb-6 py-2 h-auto w-auto rounded border-2 border-yellow-300 text-yellow-500">
            <span class="text-xl mr-5">Warning : </span>
            <span>{this.props.message}</span>
        </div>
        )
    }

}