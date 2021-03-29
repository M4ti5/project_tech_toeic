
import sqlite from 'sqlite'

export default async function getAllToeic(req, res ){
    const db = await sqlite.open('./mydb.sqlite')

    if(req.method === 'PUT'){
        const newItem = await db.prepare("INSERT INTO `resultats_toeic` (`idResultatToeic`, `idEleve`, `numToeic`, `scorePart1`, `scorePart2`, `scorePart3`, `scorePart4`, `scorePart5`, `scorePart6`, `scorePart7`) VALUES (?,?,?,?,?,?,?,?,?,?);")
        const result = await newItem.run(req.body.id, req.body.idEleve, req.body.numToeic, req.body.scorePart1, req.body.scorePart2, req.body.scorePart3, req.body.scorePart4, req.body.scorePart5, req.body.scorePart6, req.body.scorePart7 )
        (await result).finalize()

    }

    const toeic = await db.all("SELECT * FROM resultats_toeic r join toeic t on r.numToeic=t.idToeic")
    /*const resultat = await db.all("select sum(scorePart1)/count(scorePart1), sum(scorePart2)/count(scorePart2), sum(scorePart3)/count(scorePart3), sum(scorePart4)/count(scorePart4), sum(scorePart5)/count(scorePart5), sum(scorePart6)/count(scorePart6), sum(scorePart7)/count(scorePart7) into from resulats_toeic")*/

    res.json(toeic)

}
