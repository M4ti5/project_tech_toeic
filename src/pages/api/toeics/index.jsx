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
                const data = await prisma.$queryRaw("Select * from toeics t join professeurs p on  t.idProfesseur = p.idProfesseur join classes c on t.idClasse = c.idClasse")           
                res.json(data)
            break

        case 'DELETE' :
            const deleteResultat = await prisma.resultats_toeic.deleteMany({
                where: {
                    numToeic: req.body.idToeic,
                  },
            }) 
            const deleteToeic = await prisma.toeics.deleteMany({
                where: {
                    idToeic: req.body.idToeic,
                  },
            })   
            res.json()
            break

        case 'PUT' :
                const modifi = await prisma.toeics.update({
                    where: {idToeic: req.body.idToeic},
                    data: {date: req.body.date},
                });
                res.json(modifi)
        break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}