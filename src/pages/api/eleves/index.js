
import sqlite from 'sqlite'

export default async function getAllEleves(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    
    if(req.method === 'PUT'){
        const newItem = await db.prepare("INSERT INTO `eleves` (`idEleve`, `idClasse`, `idGroupe`, `idProfesseur`, `Nom`, `Prenom`, `login`, `password`) VALUES (?,?,?,?,?,?,?,?);")
        const result = await newItem.run(req.body.id, req.body.idClasse, req.body.idGroupe, req.body.idProfesseur, req.body.nom, req.body.prenom, req.body.login, req.body.password )
        (await result).finalize()
       
    }
    
    const eleves = await db.all("SELECT idEleve ,Nom, Prenom ,idClasse ,idGroupe,idProfesseur from eleves")
    
    res.json(eleves)
    
}
