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
        case 'POST':

            var localNom = req.body.nom.toUpperCase()
            var localPrenom = req.body.prenom.toLowerCase()
            localPrenom = localPrenom.replace(localPrenom.charAt(0),localPrenom.charAt(0).toUpperCase())

            const Existing = await prisma.$queryRaw`Select * from professeurs where Nom=${localNom} AND Prenom=${localPrenom}`
            
            if(Existing.length == 0 && isNaN(parseInt(req.body.prenom))){ // on verifie que l'élèves est bien unique & que c'est pas un chiffre

                await prisma.professeurs.create({
                    data: {
                        nom: localNom,
                        prenom: localPrenom,
                    },
                })
                
            }
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