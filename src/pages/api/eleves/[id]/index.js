import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , idClasse , idProfesseur from eleves where idEleve=${req.query.id} `           
        res.json(eleveData)
    break
    }
    await prisma.$disconnect()
}