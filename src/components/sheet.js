/*documentation SheetJS -- http://sheetjs.com */

import React from "react";
import XLSX from "xlsx";

import QuickResumeStudent from './quickResumeStudent'
import Student from './student'



export default class Sheet extends React.Component {
  constructor(props) {
    super(props);
    this.name;
    this.date;
    this.state = {
      data: []
    };
    this.handleFile = this.handleFile.bind(this);

  }



  handleFile(file /*:File*/) {
      /* Boilerplate to set up FileReader */
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;


 
      
      reader.onload = e => {

      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" })

      /* Get first worksheet */
      const wsname = wb.SheetNames[0] // Probably the name of file is here
      this.name = wsname
      this.date = wsname.substring(wsname.length - 8, wsname.length)
      const ws = wb.Sheets[wsname]

      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 0 })

      /* Sclicing of data */
      var temp = [];
      for(let i=0 ; i < data.length; i++){
        temp.push(Object.values(data[i]).slice(0,7))
      }
      
      /* find the date in name's file */
      var pos = file.name.lastIndexOf(".");
      this.date = file.name.substring(pos-8, pos)

      /* Update state */
      this.setState({ data: temp })

      /* return the file's date to the Parent component */
      this.props.data.date = this.date
      this.props.data.changeDate(this.props.type, this.date)

    };
    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  }


  render() {
    return (
      <div>
        <DataInput title={this.props.type} handleFile={this.handleFile}/>

        <DragDropFile handleFile = {this.handleFile}>

          <OutTable data = {this.state.data} />

        </DragDropFile>
      </div>

    );
  }
}


/* -------------------------------------------------------------------------- */

/*Drag and Drop area*/
class DragDropFile extends React.Component {
  constructor(props) {
    super(props);
    this.onDrop = this.onDrop.bind(this);
  }
  suppress(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  }
  onDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    const files = evt.dataTransfer.files;
    if (files && files[0]) this.props.handleFile(files[0]);
  }
  render() {
    return (
      <div onDrop={this.onDrop} onDragEnter={this.suppress} onDragOver={this.suppress}>
        {this.props.children}
      </div>
    );
  }
}

// HTML inputs for reading
// only one file
class DataInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    const files = e.target.files;
    if (files && files[0]) this.props.handleFile(files[0]);// First file witch
  }
  render() {
    return (
      <form className="form-inline">
        <div className="form-group" className="flex-row flex-wrap">
          <label className="flex1 mx-6 text-lg" htmlFor="file">Fichier {this.props.title}</label>
          <input
            className="flex1"
            type="file"
            className="form-control"
            id="file"
            accept={SheetJSFT} //Type of document which is accepted
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}

// Give the data in HTML table
class OutTable extends React.Component {
  render() {
    return (
      <div className="transition duration-200 container my-6 mx-auto rounded-md bg-gray-700 text-white p-7 ">
        <table className="table table-striped">
          <tbody>
          {console.log(this.props.data)}
          {/*Remarque Matis:
            Je pensesais a un composant qui a une forme de ligne qui comprend :
              -Nom 
              -Prenom 
              -Note 
              -Tous les Parties 
              -Un bouton pour modifier les valeurs( Nom et prenom Compris)
              -Un bouton pour suprimmer la ligne

              A Noté: Ne supprime pas ton composant Actuelle student mais renome le quickResumeEleve par exemple
              
          */}
          {this.props.data.map((student) => <Student data={student}/>)}
          
          </tbody>
        </table>
      </div>
    );
  }
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm"
]
