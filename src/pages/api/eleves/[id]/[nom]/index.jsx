import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , idClasse , idGroupe , idProfesseur from eleves where Nom=${req.query.nom} `           
        res.json(eleveData)
    break

    case 'POST':

            const eleveCreate = await prisma.eleves.create({
                data: {
                    nom: req.body.nom,
                    prenom: req.body.prenom,
                    idClasse: req.body.idClasse
                },
            })
            res.json(eleveCreate)
            break
    }

    await prisma.$disconnect()
}