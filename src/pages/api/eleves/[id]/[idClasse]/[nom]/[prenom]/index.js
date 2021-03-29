
import sqlite from 'sqlite'

export default async function getElevesByPrenom(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const eleves = await db.all("SELECT idEleve ,Nom, Prenom ,idClasse ,idGroupe,idProfesseur from eleves where Prenom = ?", [req.query.prenom])
    
    res.json(eleves)
}