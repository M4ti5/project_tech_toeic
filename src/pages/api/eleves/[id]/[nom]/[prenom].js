import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    switch(req.method){
    case 'GET' :
        if(req.query.nom != "nom"){
            const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , idClasse , idGroupe , idProfesseur from eleves where Prenom=${req.query.prenom} AND Nom=${req.query.nom} `           
            res.json(eleveData)
        }else{
            const eleveData = await prisma.$queryRaw` Select idEleve , Nom , Prenom , idClasse , idGroupe , idProfesseur from eleves where Prenom=${req.query.prenom}`           
            res.json(eleveData)
        }
    break
    default:
         res.status(405).json({message:' Methode non allouée'})
    break
    }
    await prisma.$disconnect()
}