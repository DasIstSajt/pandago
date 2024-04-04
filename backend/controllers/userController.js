const {PrismaClient} = require('@prisma/client');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');

const prisma = new PrismaClient();

const checkUppercase = (str) => {
    return /[A-Z]/.test(str);
}

const checkNumber = (str) => {
    return /\d/.test(str);
}

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1d'});
}

const register = async (req, res) => {
    try {
        const {email, jelszo, telszam, nev} = req.body;

        if(!email || !jelszo || !nev || !telszam){
            res.json({message: "Hiányos adatok!"});
            return;
        }

        const user = await prisma.felhasznalo.findUnique({
            where: {
                email: email
            }
        });
        
        const tellszam = await prisma.felhasznalo.findUnique({
            where: {
                telszam: telszam
            }
        })

        if(user){
            res.json({message: "A megadott email cím már foglalt!"});
            return;
        }

        if(tellszam){
            res.json({message: "A megadott telefonszám már foglalt!"});
            return;
        }

        if(email.includes('@') == false || email.includes('.') == false){
            res.json({message: "A megadott email cím formátuma nem megfelelő!"});
            return
        }

        if(telszam.length != 11 || (telszam[0] != 0 && telszam[1] != 6)){
            res.json({message: "A megadott telefonszám formátuma nem megfelelő!"});
            return;
        }

        if(jelszo.length < 8 || checkUppercase(jelszo) == false || checkNumber(jelszo) == false){
            res.json({message: "Nem megfelelő formátumú a jelszó!"});
            return;
        }

        const hasheltJelszo = await argon2.hash(jelszo);
        const ujUser = await prisma.felhasznalo.create({
            data: {
                email: email,
                nev: nev,
                telszam: telszam,
                jelszo: hasheltJelszo
            }
        })

        const token = generateToken(ujUser.id);
        res.status(200).json({
            message: "Sikeres regisztráció!",
            token: token
        });
    }
    catch (error) {
        res.json({message: error.message});
    }
}

const login = async (req, res) => {
    try {
        const {email, jelszo} = req.body;

        if(!email || !jelszo){
            res.json({message: "Hiányzó adatok!"});
            return;
        }

        const user = await prisma.felhasznalo.findUnique({
            where:{
                email: email
            }
        });

        if(!user){
            res.json({message: "A felhasználó nem található!"});
            return;
        }

        if(!(await argon2.verify(user.jelszo, jelszo))){
            res.json({message: "Helytelen jelszó!"});
            return;
        }

        const token = generateToken(user.id);
        res.status(200).json({
            message: "Sikeres bejelentkezés!",
            token: token
        });
    }
    catch(error){
        res.json({message: error.message});
    }
};

const getMyJourneys = async (req, res) => {
    try {
        const utak = await prisma.utazas.findMany({
            where: {
                floId: req.user.id
            },
            select: {
                ut:{
                    select: {
                        id: true,
                        indulas: true,
                        indulasiHely: true,
                        veg: true,
                        uticel: true,
                        ar: true,
                        jarmu: true,
                    }
                }
            }
        })
        res.json(utak);
    } catch (error) {
        res.json({message: error.message});
    }
};

const getUsers = (req, res) => {
    res.json(req.user);
}

module.exports =  {
    register,
    login,
    getMyJourneys,
    getUsers
}