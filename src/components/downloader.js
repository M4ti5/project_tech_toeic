import { Component } from "react"
import XLSX from "xlsx"
import Image from 'next/image'

export default class  Downloader extends Component {
  
  constructor(props){
    super(props);
  }
   async handleClick(e){
    e.preventDefault();

    switch(this.props.type){
      case "eleve":

        var rawData = this.props.data
        const eleve = await fetch('http://localhost:3000/api/eleves/'+rawData[0].idEleve+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        
        var data =[]
        for (let i = 0; i < rawData.length; i++) {
            var temp = []
            //date
            const tempToeic =   await fetch('http://localhost:3000/api/toeics/'+rawData[i].numToeic+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
            temp["Date Toeic"] = tempToeic[0].date 
            //Note sur 20
            temp["/20"] = parseFloat(((rawData[i].scorePart1 + rawData[i].scorePart2 + rawData[i].scorePart3 + rawData[i].scorePart4 + rawData[i].scorePart5 + rawData[i].scorePart6 + rawData[i].scorePart7)*5/49.5).toFixed(2));
            //Note Toeic Totale
            temp["Total"] = (rawData[i].scorePart1 +rawData[i].scorePart2+rawData[i].scorePart3+rawData[i].scorePart4+rawData[i].scorePart5+rawData[i].scorePart6+rawData[i].scorePart7)*5

            //Note Toeic Orale
            temp["Note Orale"] = (rawData[i].scorePart1 +rawData[i].scorePart2+rawData[i].scorePart3+rawData[i].scorePart4)

            //Note Toeic Ecrit 
            temp["Note Ecrit"] = (rawData[i].scorePart5+rawData[i].scorePart6+rawData[i].scorePart7)
            
            
            data.push(temp)
        }

        /// Gestion du Fichier 
        var ws = XLSX.utils.json_to_sheet(data, {header:["Date Toeic","/20","Total","Note Orale","Note Ecrit"]})
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, eleve[0].nom + eleve[0].prenom)
        //Creation du Fichier
        XLSX.writeFile(wb, 'Feuille '+this.props.type+' '+eleve[0].nom +" "+ eleve[0].prenom+'.xlsx')

        break

      case "toeic":
        var rawData = this.props.data
         const toeic =   await fetch('http://localhost:3000/api/toeics/'+rawData[0].numToeic+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
        var data =[]
        for (let i = 0; i < rawData.length; i++) {
            var temp = []
            //Nom
            const tempEleve =  await fetch('http://localhost:3000/api/eleves/'+rawData[i].idEleve+'/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'GET'}).then(response => response.json())
            temp["Nom"] = tempEleve[0].nom
            //Prenom
            temp["Prenom"] =  tempEleve[0].prenom
            //Note sur 20
            
            temp["/20"] = parseFloat(((rawData[i].scorePart1 + rawData[i].scorePart2 + rawData[i].scorePart3 + rawData[i].scorePart4 + rawData[i].scorePart5 + rawData[i].scorePart6 + rawData[i].scorePart7)*5/49.5).toFixed(2));
            //Note Toeic Totale
            temp["Total"] = (rawData[i].scorePart1 +rawData[i].scorePart2+rawData[i].scorePart3+rawData[i].scorePart4+rawData[i].scorePart5+rawData[i].scorePart6+rawData[i].scorePart7)*5

            //Note Toeic Orale
            temp["Note Orale"] = (rawData[i].scorePart1 +rawData[i].scorePart2+rawData[i].scorePart3+rawData[i].scorePart4)

            //Note Toeic Ecrit 
            temp["Note Ecrit"] = (rawData[i].scorePart5+rawData[i].scorePart6+rawData[i].scorePart7)
            
            
            data.push(temp)
        }
        /// Gestion du Fichier 
        var ws = XLSX.utils.json_to_sheet(data, {header:["Nom","Prenom","/20","Total","Note Orale","Note Ecrit"]})
        var wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws,toeic[0].date )
        //Creation du Fichier
        XLSX.writeFile(wb, 'Feuille toeic du '+toeic[0].date+'.xlsx')
      break
      default:
        return "Erreur - type du composant est incompatible "
    }
    

  }
  render(){

    return(
      <a onClick={e => this.handleClick(e)}>
        
        <div className="h-10 w-36 py-2 flex justify-center space-x-2 transition duration-150 ease-in-out hover:bg-indigo-300 hover:text-white hover:border-black hover:border-10 bg-gray-300 rounded r-4">
            <div>
                <Image src="/down-arrow.png" alt="download icon" width={20} height={20}/>
            </div>
            <div>
                <span>Télécharger</span>
            </div>
        </div>
      </a>
  )
}
}