import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

export const getUser = async (req, res) => { 
    // const [rows] = await pool.query('SELECT * FROM tb_user') 
    const rows = await prisma.user.findMany({
        select:{
            id:true, 
            name:true
        }
    })
    res.json(rows)
}

export const getProfile = async (req, res) => {
    const { id } = req.params;

    const id_user = parseInt(id)

    try {
        const user = await prisma.user.findUnique({
            where:{ id: id_user},
            select:{
                name:true,
                email:true,
                imgPhoto:true,
                imgCover:true
            }
        })
        res.status(200).json(user)
    } catch (error) {
        console.error('Error getting user:', error);
        res.status(500).json('error');
    }
}


export const postUserlogin = async (req, res) => { 

    const {name, password } = req.body

    // const [rows] = await pool.query('SELECT * FROM tb_user WHERE name = ?', [name])

    const [user] = await prisma.user.findMany({
        where: { name: name },
        select: {
            id: true,
            name: true, 
            password: true
        }
    });

    if (user <= 0){
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

    let imagePhoto = null;
    let imageCover = null;

    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imagePhoto = fs.readFileSync(imagePath);
        imageCover = fs.readFileSync(imagePath);
    }
    else{
        const defaultImagePath = path.join(__dirname, '../uploads/default', 'default-image.jpg');
        imagePhoto = fs.readFileSync(defaultImagePath);
        const CoverImagePath = path.join(__dirname, '../uploads/default', 'default-cover.jpg');
        imageCover = fs.readFileSync(CoverImagePath);
    }
    
    if(password === password_confirm) { 
        
        // await pool.query('INSERT INTO tb_user (name, email, password) VALUES (?,?,?)', [name, email, passwordHaash])

        await prisma.user.create({
            data: {
              name: name,
              email: email,
              password: passwordHaash,
              imgPhoto: imagePhoto,
              imgCover: imageCover
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

export const edituserPhoto = async (req, res) => {
    const { id } = req.params;
    const id_user = parseInt(id)
    
    let imageBuffer = null;
    
    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imageBuffer = fs.readFileSync(imagePath);
    }

    try {
      // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
      await prisma.user.update({
        where: { id: id_user },
        data: {
          imgPhoto:imageBuffer
        },
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error Editing user:', error);
      res.status(500).json('error');
    } 
}

export const edituserCover = async (req, res) => {
    const { id } = req.params;
    const id_user = parseInt(id)
    
    let imageBuffer = null;
    
    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imageBuffer = fs.readFileSync(imagePath);
    }

    try {
      // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
      await prisma.user.update({
        where: { id: id_user },
        data: {
          imgCover:imageBuffer
        },
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error Editing user:', error);
      res.status(500).json('error');
    } 
}

export const edituser = async (req, res) => {
    const { id } = req.params;
    const {name, email} = req.body;
    const id_user = parseInt(id)
    
    let imageBuffer = null;
    
    if (req.file) {
        const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
        imageBuffer = fs.readFileSync(imagePath);
    }

    try {
      // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
      await prisma.user.update({
        where: { id: id_user },
        data: {
          name:name,
          email:email,  
          imgCover:imageBuffer
        },
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error Editing user:', error);
      res.status(500).json('error');
    } 
}

export const edituserPassword = async (req, res) => {
    const { id } = req.params;
    const {password} = req.body;
    const id_user = parseInt(id)
    


    try {
      // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
      await prisma.user.update({
        where: { id: id_user },
        data: {
          password:password
        },
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error Editing user:', error);
      res.status(500).json('error');
    } 
}

export const deleteuser = async (req, res) => {
    const { id } = req.params;
    const id_user = parseInt(id)

    try {
      // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
      await prisma.user.delete({
        where: { id: id_user },
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json('error');
    } 
}