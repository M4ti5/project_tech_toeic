import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , idClasse , idGroupe , idProfesseur from eleves where Nom=${req.query.nom} `           
        res.json(eleveData)
    break
    }
    await prisma.$disconnect()
}