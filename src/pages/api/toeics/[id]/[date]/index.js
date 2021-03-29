import sqlite from 'sqlite'

export default async function getToeicByDate(req, res ){
    const db = await sqlite.open('./mydb.sqlite')
    const toeic = await db.all("SELECT numToeic, date, idEleve FROM resultats_toeic where date = ? ORDER BY date", [req.query.date])

    res.json(toeic)
}
