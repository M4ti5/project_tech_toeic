import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'GET' :
                const data = await prisma.$queryRaw("Select idProfesseur, nom , prenom  from professeurs order by nom")           
                res.json(data)
            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
        
        case 'DELETE' :
            //On reafecte tous les eleves un professeur pour pas perdre les eleves
            await prisma.$queryRaw`UPDATE eleves SET idProfesseur = null WHERE idProfesseur=${req.body.idProfesseur}`
            
            const idToiecToDelete= await prisma.$queryRaw`SELECT idToeic FROM toeics WHERE idProfesseur=${req.body.idProfesseur}`
            
            await idToiecToDelete.forEach( element => {
                fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE', body:JSON.stringify({idToeic:  element.idToeic})}).then(response => response.json())
            });

            const deleteProfesseur = await prisma.professeurs.deleteMany({
                where: {
                    idProfesseur: req.body.idProfesseur,
                  },
            }) 
            break
    }
    await prisma.$disconnect()
}