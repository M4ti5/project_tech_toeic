import React from 'react'
import { Component } from 'react'
import PieChart from './pieChart.js'

//<button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.sendToeic}>SEND</button>



export default class Student extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        nom: this.props.data.Nom,
        partie1: this.props.data.Partie1,
        partie2: this.props.data.Partie2,
        partie3: this.props.data.Partie3,
        partie4: this.props.data.Partie4,
        partie5: this.props.data.Partie5,
        partie6: this.props.data.Partie6,
        partie7: this.props.data.Partie7,
        oral:this.props.data.ScoreOral,
        ecrit:this.props.data.ScoreEcrit,

      }
    }




    edit(e) {
      e.preventDefault();
      console.log("test")
      for(var i=1;i<8;i++){
        var temp = document.getElementById("input_S"+this.props.keys+"_"+i)
        temp.disabled=false;
      }
      document.getElementById('buttonEdit'+this.props.keys).classList.replace("visible","hidden")
      document.getElementById('buttonRegister'+this.props.keys).classList.replace("hidden","visible")
    }

    enregistrer(e) {
      e.preventDefault();
      console.log(this.state)
      this.props.data.Nom = this.state.nom
      this.props.data.Partie1 = this.state.partie1
      this.props.data.Partie2 = this.state.partie2
      this.props.data.Partie3 = this.state.partie3
      this.props.data.Partie4 = this.state.partie4
      this.props.data.Partie5 = this.state.partie5
      this.props.data.Partie6 = this.state.partie6
      this.props.data.Partie7 = this.state.partie7
      this.setState({oral: parseInt(this.state.partie1) + parseInt(this.state.partie2) + parseInt(this.state.partie3) + parseInt(this.state.partie4)})
      this.setState({ecrit: parseInt(this.state.partie5) + parseInt(this.state.partie6) + parseInt(this.state.partie7)})

      for(var i=1;i<8;i++){
        var temp = document.getElementById("input_S"+this.props.keys+"_"+i)
        temp.disabled=true;
      }

      document.getElementById('buttonRegister'+this.props.keys).classList.replace("visible","hidden")
      document.getElementById('buttonEdit'+this.props.keys).classList.replace("hidden","visible")
    }

    render() {
      /*console.log(this.props.data.notes)*/
        return (
            <div>
                <div id="resultat" className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">

                                            <tr id="tableau">
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Nom
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score Orale
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Score Ecrit
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 1
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 2
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 3
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 4
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 5
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 6
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Partie 7
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr id="donnees">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                            <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                    {this.props.data.Nom}
                                                            </div>
                                                            <form NAME="nom" >
                                                                <input id={"input_S"+this.props.keys+"_0"} TYPE="text" value={this.state.nom} className="w-auto form-control text-sm  font-medium " onChange={e => this.setState({nom: e.target.value})} disabled="true" />
                                                                {/*<span className="" >{this.props.data.nom}</span>*/}
                                                            </form>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {this.state.oral}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="text-sm text-gray-900">
                                                        {this.state.ecrit}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">

                                                <form NAME="part1" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_1"} TYPE="number" value={this.state.partie1} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie1: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part2" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_2"} TYPE="number" value={this.state.partie2} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie2: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part3" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_3"} TYPE="number" value={this.state.partie3} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie3: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part4" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_4"} TYPE="number" value={this.state.partie4} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie4: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part5" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_5"} TYPE="number" value={this.state.partie5} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie5: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part6" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_6"} TYPE="number" value={this.state.partie6} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie6: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <form NAME="part7" className="w-16">
                                                  <input id={"input_S"+this.props.keys+"_7"} TYPE="number" value={this.state.partie7} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie7: e.target.value})} disabled="true" />
                                                </form>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <form NAME="button">
                                                      <input id ={"buttonEdit"+this.props.keys} className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full visible" type="button" VALUE="Modifier" onClick={(e) => this.edit(e)} /><br />
                                                      <input id ={"buttonRegister"+this.props.keys} className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hidden" TYPE="button" VALUE="Enregistrer" onClick={(e) => this.enregistrer(e)}/>
                                                    </form>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded r-1" onClick={e=> this.props.function.delete(e,this.props.keys)}>Supprimer</button>
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
