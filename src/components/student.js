import React from 'react'
import { Component } from 'react'
import PieChart from './pieChart.js'

//<button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.sendToeic}>SEND</button>



export default class Student extends React.Component {   

    edit() {
        {this.props.data[0] = 'NewName'}
    }
    
    delete() {
        
    }

    render() {
        return (
            <div>
                <div class="flex flex-col">
                        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">

                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Student's Number
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Edit
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Delete
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {this.props.data[0]}
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {this.props.data[3]}
                                                    </div>
                                                </td>
                                                
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {this.props.data[1]} / 100
                                                </td>

                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.edit}>EDIT</button>
                                                </td>

                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.delete}>DELETE</button>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
