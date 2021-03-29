const sqlite = require('sqlite');

const db_name = './mydb.sqlite'

async function setup() {
    const db = await sqlite.open(db_name);
    await db.all("DROP TABLE `annee_classes`;");
    await db.all("DROP TABLE `barres_de_passage`;");
    await db.all("DROP TABLE `classes`;");
    await db.all("DROP TABLE `eleves`;");
    await db.all("DROP TABLE `groupes`;");
    await db.all("DROP TABLE `professeurs`;");
    await db.all("DROP TABLE `resultats_toeic`;");
    await db.migrate({force: 'last'});

}

async function query(q){
    const db = await sqlite.open(db_name);

    const result = await db.all(q)
    console.log(result)
}

setup() //permiere ouverture


/*query("SELECT idToeic, date, idEleve, sum(scorePart1)/count(scorePart1) from resultats_toeic where idToeic='1' ")*/
