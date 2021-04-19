import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'POST':
        
            
            const Existing = await prisma.$queryRaw`Select * from toeics where date=${req.body.date} and idProfesseur=${req.body.idProfesseur} and idClasse=${req.body.idClasse}`
            if(Existing.length == 0){ // on verifie que l'élèves est bien unique
                const savedToeic = await prisma.toeics.create({
                    data: {
                        date: req.body.date,
                        idProfesseur:req.body.idProfesseur,
                        idClasse: req.body.idClasse,
                        officiel:req.body.officiel,
                    },
                })
                res.json(savedToeic)
            }else{
                res.json("Erreur - Toeic existant")
            }
            break

        
        case 'GET' :
                const data = await prisma.$queryRaw("Select *  from toeics")           
                res.json(data)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}