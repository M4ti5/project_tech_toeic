import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'GET' :
                const data = await prisma.$queryRaw("Select idClasse, nomClasse , idAnnee  from  classes")           
                res.json(data)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}