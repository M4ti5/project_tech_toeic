import React,  { Component } from 'react'

export default class ListStudents extends Component {
    
    render(){
        return(           
            <div>                      
                <td class="w-80 px-6 py-4 whitespace-nowrap">
                    <span class="text-center ml-2 font-semibold">{this.props.nom} {this.props.prenom}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                    <span>19001234</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                    <span>{/*this.props.classes*/} ING1</span>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">
                    <span>Groupe n°{this.props.groupes}</span>
                    </div>
                </td>     
            </div> 
        ) 
    }  
}


