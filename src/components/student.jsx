import React from 'react'
import { Component } from 'react'
import PieChart from './pieChart'

//<button className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={this.sendToeic}>SEND</button>



export default class Student extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        nom: this.props.data.nom,
        tempNom: this.props.data.nom,
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
      for(var i=0;i<8;i++){
        var temp = document.getElementById("input_S"+this.props.keys+"_"+i)
        temp.disabled=false;
      }
      document.getElementById('buttonEdit'+this.props.keys).classList.replace("visible","hidden")
      document.getElementById('buttonRegister'+this.props.keys).classList.replace("hidden","visible")
    }
    
    static getDerivedStateFromProps(newProps, oldState) {
        if (newProps.data.nom !== oldState.nom) {

          return {
            nom: newProps.data.nom,
            tempNom: newProps.data.nom,
            partie1: newProps.data.Partie1,
            partie2: newProps.data.Partie2,
            partie3: newProps.data.Partie3,
            partie4: newProps.data.Partie4,
            partie5: newProps.data.Partie5,
            partie6: newProps.data.Partie6,
            partie7: newProps.data.Partie7,
            oral:newProps.data.ScoreOral,
            ecrit:newProps.data.ScoreEcrit,
    
          }
        }
    
        return null;
      }

  
 
    enregistrer(e) {
      e.preventDefault();
      this.state.nom = this.state.tempNom
      this.props.data.nom = this.state.nom
      this.props.data.Partie1 = this.state.partie1
      this.props.data.Partie2 = this.state.partie2
      this.props.data.Partie3 = this.state.partie3
      this.props.data.Partie4 = this.state.partie4
      this.props.data.Partie5 = this.state.partie5
      this.props.data.Partie6 = this.state.partie6
      this.props.data.Partie7 = this.state.partie7
      this.setState({oral: parseInt(this.state.partie1) + parseInt(this.state.partie2) + parseInt(this.state.partie3) + parseInt(this.state.partie4)})
      this.setState({ecrit: parseInt(this.state.partie5) + parseInt(this.state.partie6) + parseInt(this.state.partie7)})

      for(var i=0;i<8;i++){
        var temp = document.getElementById("input_S"+this.props.keys+"_"+i)
        temp.disabled=true;
      }

      document.getElementById('buttonRegister'+this.props.keys).classList.replace("visible","hidden")
      document.getElementById('buttonEdit'+this.props.keys).classList.replace("hidden","visible")
    }

    render() {
        return (
            <div>
                <div className=" mx-2 flex flex-col">
                        <div className="overflow-x-hidden mx-1">
                            <div className=" py-2 align-middle inline-block w-full ">
                                <div className="shadow overflow-hidden border-b border-gray-200  w-full sm:rounded-lg">
                                    <table className="divide-y divide-gray-200   w-full">
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
                                                <th scope="col" className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className="p-1 bg-white divide-y divide-gray-200">
                                            <tr id="donnees">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center   ">
                                                            <div className="ml-4">
                                                                <div className=" text-sm text-gray-900">
                                                                <form name="nom" >    
                                                                    <input id={"input_S"+this.props.keys+"_0"} type="text" value={this.state.tempNom} className="w-auto form-control text-sm  font-medium " onChange={e => this.setState({tempNom: e.target.value})} disabled="true" />
                                                                </form>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">
                                                        {this.state.oral}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                    <div className="text-sm text-gray-900">
                                                        {this.state.ecrit}
                                                    </div>
                                                </td>

                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">

                                                <form name="part1" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_1"} type="number" value={(this.state.partie1== undefined ? "" :this.state.partie1) } className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie1: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part2" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_2"} type="number" value={(this.state.partie2== undefined ? "" :this.state.partie2)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie2: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part3" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_3"} type="number" value={(this.state.partie3== undefined ? "" :this.state.partie3)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie3: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part4" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_4"} type="number" value={(this.state.partie4== undefined ? "" :this.state.partie4)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie4: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part5" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_5"} type="number" value={(this.state.partie5== undefined ? "" :this.state.partie5)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie5: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part6" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_6"} type="number" value={(this.state.partie6== undefined ? "" :this.state.partie6)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie6: e.target.value})} disabled="true" />
                                                </form>
                                                </td>
                                                <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-500">
                                                <form name="part7" className="w-13">
                                                  <input id={"input_S"+this.props.keys+"_7"} type="number" value={(this.state.partie7== undefined ? "" :this.state.partie7)} className="w-16 form-control text-sm text-gray-900" onChange={e => this.setState({partie7: e.target.value})} disabled="true" />
                                                </form>
                                                </td>

                                                <td className="whitespace-nowrap text-sm  text-gray-500">
                                                    <form name="button">
                                                      <input id ={"buttonEdit"+this.props.keys} className="bg-gray-700 hover:bg-blue-700 text-white font-bold mx-auto py-2 px-4 rounded-full visible" type="button" value="Modifier" onClick={(e) => this.edit(e)} /><br />
                                                      <input id ={"buttonRegister"+this.props.keys} className="bg-gray-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full hidden" type="button" value="Enregistrer" onClick={(e) => this.enregistrer(e)}/>
                                                    </form>
                                                    <button className="bg-red-700 hover:bg-red-500 text-white font-bold mt-2 py-2 px-4 rounded r-1" onClick={e=> this.props.function.delete(e,this.props.keys)}>Supprimer</button>
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
