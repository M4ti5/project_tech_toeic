import React ,{ Component } from 'react'
import Pie  from 'react-chartjs-2'


export default class PieChart extends Component {
    render() {
        return (
            <div>
                <Pie
                    data={{
                        labels: ["Bonnes Réponses", "Mauvaises Réponses"],
                        datasets: [{
                            data: [this.props.data1, this.props.data2],
                            backgroundColor: ['#00cb8b', '#de2f45'],
                            hoverBackgroundColor: ['#00cb8b', '#de2f45'],
                        }]
                    }}
                />

                <h2>{this.props.title}</h2>

            </div>
        )
    }
}