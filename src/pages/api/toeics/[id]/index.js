import sqlite from 'sqlite'

export default async function getToeicById(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const toeic = await db.all("SELECT numToeic, date, idEleve FROM resultats_toeic where numToeic = ? ORDER BY date", [req.query.numToeic])
    console.log(req)
    res.json(toeic)
}
