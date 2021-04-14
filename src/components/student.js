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
                                                    Score Orale
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score Ecrit
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 1
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 2
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 3
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 4
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 5
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 6
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 7
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                  
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="flex items-center">
                                                            <div class="ml-4">
                                                                <div class="text-sm font-medium text-gray-900">
                                                                    {this.props.data.Nom}
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <div class="text-sm text-gray-900">
                                                        {this.props.data.ScoreOral}
                                                    </div>
                                                </td>
                                                
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.ScoreEcrit}
                                                    </div>
                                                </td>

                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie1}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie2}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie3}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie4}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie5}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie6}
                                                    </div>
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div class="text-sm text-gray-900">
                                                        {this.props.data.Partie7}
                                                    </div>
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
