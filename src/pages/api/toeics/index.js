import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'POST':
        
            var localDate = req.body.date
            
            const Existing = await prisma.$queryRaw`Select * from toeics where date=${localDate}`
            if(Existing.length == 0){ // on verifie que l'élèves est bien unique
                const savedToeic = await prisma.toeics.create({
                    data: {
                        date: localDate,
                    },
                })
                res.json(savedToeic)
            }else{
                res.json("Erreur - Toeic existant")
            }
            break

        
        case 'GET' :
                const toeicData = await prisma.$queryRaw("Select *  from toeics")           
                res.json(toeicData)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}