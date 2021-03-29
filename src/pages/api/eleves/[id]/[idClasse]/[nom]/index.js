
import sqlite from 'sqlite'

export default async function getElevesByNom(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const eleves = await db.all("SELECT idEleve ,Nom, Prenom ,idClasse ,idGroupe,idProfesseur from eleves where Nom = ?", [req.query.nom])


    res.json(eleves)
}