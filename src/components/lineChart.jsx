import React from 'react'
import { Line } from 'react-chartjs-2'
import { Component } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel'

// npm install --save react-chartjs-2 chart.js

export default class PieChart extends React.Component {

    render() {
        return (
            
            <Carousel>
                <div>
                    <Line
                        data={{
                            labels: this.props.labelList,
                            datasets: [
                                {
                                        label: '',
                                        data: [0, 990],
                                        borderWidth: 1,
                                        fill: false,
                                        borderColor: 'rgb(243,244,246)'
                                    },
                                    {
                                        label: 'Scores Totaux',
                                        data: this.props.dataListTotal,
                                        borderWidth: 1,
                                        fill: false,
                                        borderColor: 'green'
                                    },
                                        
                            ]
                        }}
                    />
                </div>
                <div>
                    <Line
                            data={{
                                labels: this.props.labelList,
                                datasets: [
                                    {
                                            label: '',
                                            data: [0, 495],
                                            borderWidth: 1,
                                            fill: false,
                                            borderColor: 'rgb(243,244,246)'
                                        },
                                        {
                                            label: 'Scores Oraux',
                                            data: this.props.dataListOral,
                                            borderWidth: 1,
                                            fill: false,
                                            borderColor: 'green'
                                        }
                                            
                                ]
                            }}
                        />
                </div>
                <div>
                    <Line
                            data={{
                                labels: this.props.labelList,
                                datasets: [
                                    {
                                            label: '',
                                            data: [0, 495],
                                            borderWidth: 1,
                                            fill: false,
                                            borderColor: 'rgb(243,244,246)'
                                        },
                                        {
                                            label: 'Scores Ecrits',
                                            data: this.props.dataListEcrit,
                                            borderWidth: 1,
                                            fill: false,
                                            borderColor: 'green'
                                        }
                                            
                                ]
                            }}
                        />
                </div>
            </Carousel>
            
            
        )
    }
}
