import React,  { Component } from 'react'
import Downloader from "./downloader"


export default class HeaderTab extends Component {
    constructor(props){
        super(props);   
        this.state= {
            dlButton:undefined,

        }
    }

     async showDownloader(){
        if(this.props.dl != null){
            switch(this.props.dl.type){
                case "eleve":
                    var temp = await fetch('http://localhost:3000/api/resultats/'+this.props.dl.id+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
                    this.setState({dlButton:<Downloader type="eleve" data={temp} />}) 
                break
                case "toeic":
                    var temp = await fetch('http://localhost:3000/api/resultats/idEleve/'+this.props.dl.id+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
                    this.setState({dlButton:<Downloader type="toeic" data={temp} />}) 
                break
               
            }
        }
    }

    render(){
        // on evite un appel asynchrone infinit
        if(this.props.dl != null && this.state.dlButton == undefined){
            this.showDownloader()
        }

        return(
            <header className=" grid grid-cols-6 bg-white shadow mb-6">
                <div className=" col-span-2 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold leading-tight text-gray-900"> {this.props.title} </h1>
                </div>
                <div className=" my-6 col-start-6">
                    {this.state.dlButton}
                </div>
            </header>
        )
    }
}