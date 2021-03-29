import sqlite from 'sqlite'

export default async function getToeicByIdEleve(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const toeic = await db.all("SELECT numToeic, date, idEleve FROM resultats_toeic where idEleve = ? ORDER BY date", [req.query.idEleve])

    res.json(toeic)
}
