import React,  { Component } from 'react'

export default class ListToeicStudents extends Component {
    
    render(){
        return(           
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                            <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                    TOEIC n°{this.props.number}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {this.props.official}
                                </div>
                            </div>
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {this.props.note200} / 200
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                        {this.props.note20} / 20
                    </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-green-800">
                        {this.props.threshold}
                    </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {this.props.date}
                </td>
            </tr>
        ) 
    }  
}


