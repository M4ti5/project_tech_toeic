import React from 'react'
import { Component } from 'react'
import PieChart from './pieChart.js'

export default class QuickResumeStudent extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <div class="w-full mx-auto rounded-lg bg-white border border-gray-200 p-5 text-gray-800 font-light mb-6">
                        <div class="w-full flex mb-4 items-center">
                            <div class="flex-grow pl-3">
                                <h6 class="font-bold text-sm uppercase text-gray-600">{this.props.data[0]} ( N°{this.props.data[3]} ).</h6>
                            </div>
                        </div>
                        <div class="w-full">
                            <p class="text-sm leading-tight">
                                <span class="px-8">Score : {this.props.data[2]}</span>
                                <PieChart title="Score" label1="Right Answers" label2="Wrong Answers" data1={this.props.data[1]} data2={100 - this.props.data[1]} />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
