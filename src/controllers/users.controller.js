import { PrismaClient } from '@prisma/client';
import { pool } from '../db.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';


const prisma = new PrismaClient();

export const getUser = async (req, res) => { 
    // const [rows] = await pool.query('SELECT * FROM tb_user') 
    const [rows] = await prisma.user.findMany()
    res.json(rows)
}


export const postUserlogin = async (req, res) => { 

    const {name, password } = req.body

    // const [rows] = await pool.query('SELECT * FROM tb_user WHERE name = ?', [name])

    const [user] = await prisma.user.findMany({
        where: {
            name: name,
        },
    });

    if (user.length <= 0){
        return res.status(401).json('Usuario o contraseña no existe');
    }
   

    
    if (!user || !(await bcryptjs.compare(password, user.password))){
        return res.status(401).json('Usuario o contraseña incorrectos');
    } else {
        const token = jwt.sign({ user }, 'my_secret_key')
        res.status(200).json({ token });

    }
}


export const protectedLogin = async (req, res) => {
       res.json({
            text: 'protected'
       }) 
}

export const createUser = async (req, res) => {

    const {name, email, password } = req.body

    const password_confirm = password;

    let passwordHaash = await  bcryptjs.hash(password, 8)
    
    if(password === password_confirm) { 
        
        // await pool.query('INSERT INTO tb_user (name, email, password) VALUES (?,?,?)', [name, email, passwordHaash])

        await prisma.user.create({
            data: {
              name: name,
              email: email,
              password: passwordHaash,
            },
        });
          
          // Cerrar la conexión a Prisma cuando hayas terminado
        await prisma.$disconnect();
        res.status(200).json('Successfull'); 
  
    } else {
        return res.status(401).json('Error')
    }

  
}


export const getCurrentUser = (req, res) => {
     jwt.verify(req.token, 'my_secret_key', (err, data) => {
        if(err) {
            res.status(403).json({ error: 'Token inválido' });
        } else {
            res.json ({ data });
        }
     })
}
