import sqlite from 'sqlite'

export default async function getElevesByIdClasse(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const eleves = await db.all("SELECT idEleve ,Nom, Prenom ,idClasse ,idGroupe,idProfesseur from eleves where idClasse = ?", [req.query.idClasse])

    res.json(eleves)
}