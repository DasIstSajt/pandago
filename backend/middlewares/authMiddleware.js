const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const protect = async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const idFromToken = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await prisma.felhasznalo.findUnique({
                where: {
                    id: idFromToken.id
                },
                select: {
                    id: true,
                    email: true,
                    telszam: true,
                    nev: true
                }
            })
            next();
        } catch (error) {
            res.status(401).json({message: "Nincs bejelentkezve!"});
            return;
        }
    }
    if(!token){
        res.json({message: "Nincs bejelentkezve!"});
        return;
    }
}

module.exports = { protect }