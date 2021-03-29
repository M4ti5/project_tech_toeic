
import sqlite from 'sqlite'

export default async function getElevesById(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const eleves = await db.all("SELECT idEleve ,Nom, Prenom ,idClasse ,idGroupe,idProfesseur from eleves where idEleve = ?", [req.query.id])
    console.log(req)
    res.json(eleves)
}