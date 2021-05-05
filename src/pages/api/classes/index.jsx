import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
    
    switch(req.method){
        
        case 'GET' :
                const data = await prisma.$queryRaw("Select idClasse, nomClasse , idAnnee  from  classes")           
                res.json(data)
            break

        case 'POST':
            const Existing = await prisma.$queryRaw`Select * from classes where nomClasse=${req.body.nom}`
            
            if(Existing.length == 0){ // on verifie que l'élèves est bien unique & que c'est pas un chiffre

                await prisma.classes.create({
                    data: {
                        nomClasse: req.body.nom,
                        idAnnee: req.body.idAnnee,
                    },
                })
                
            }
        break
        case 'DELETE' :
            
            
            const idToiecToDelete= await prisma.$queryRaw`SELECT idToeic FROM toeics WHERE idClasse=${req.body.idClasse}`
            console.log(idToiecToDelete)
            await idToiecToDelete.forEach( element => {
                fetch( "http://localhost:3000"+'/api/toeics/', {headers: { "Content-Type": "application/json; charset=utf-8" },method: 'DELETE', body:JSON.stringify({idToeic:  element.idToeic})}).then(response => response.json())
            });

            await prisma.eleves.deleteMany({
                where: {
                    idClasse: req.body.idClasse,
                  },
            }) 

            await prisma.classes.delete({
                where: {
                    idClasse: req.body.idClasse,
                  },
            }) 

            break

        default:
            res.status(405).json({message:' Methode non allouée'})
        break
    }
    await prisma.$disconnect()
}