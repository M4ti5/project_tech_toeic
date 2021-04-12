import React,  { Component } from 'react'

export default class ListToeicStudents extends Component {
    
    render(){
        return(           
            <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                    TOEIC n°{this.props.number}
                                </div>
                                <div class="text-sm text-gray-500">
                                    {this.props.official}
                                </div>
                            </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                        {this.props.note200} / 200
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                        {this.props.note20} / 20
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800">
                        {this.props.threshold}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {this.props.date}
                </td>
            </tr>
        ) 
    }  
}


