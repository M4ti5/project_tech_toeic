import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'GET' :
                const data = await prisma.$queryRaw("Select * from resultats_toeic r join eleves e on e.idEleve = r.idEleve join classes c on e.idClasse = c.idClasse join annee_classes a on c.idAnnee = a.idAnnee join toeics t on r.numToeic = t.idToeic where t.officiel=true and c.nomClasse!='Ancien' order by e.idEleve ")           
                res.json(data)
            break

        case 'PUT' :
                const modif = await prisma.$queryRaw`UPDATE eleves set idClasse=${req.body.idClasse} where idEleve=${req.body.idEleve}`      
                
                /*const modif =await prisma.eleves.update({
                    where: {idEleve: req.body.idEleve},
                    data: {idClasse: req.body.nouvelIdClasse},
                });*/
                res.json(modif)
            break
            
        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}