import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , c.idClasse , idProfesseur , c.nomClasse from eleves e join classes c on e.idClasse = c.idClasse where e.idEleve=${req.query.id}  `           
        res.json(eleveData)
    break
    }
    await prisma.$disconnect()
}