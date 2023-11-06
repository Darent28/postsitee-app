import { pool } from '../db.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PrismaClient } from '@prisma/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

export const postPost = async (req, res) => { 
  const {tittle, text, id_user} = req.body

  const userId = parseInt(id_user, 10);
  let imageBuffer = null;

  if (req.file) {
    const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
    imageBuffer = fs.readFileSync(imagePath);
  }

  await prisma.post.create({
    data:{
      tittle:tittle,
      text:text,
      id_user:userId,
      image_data:imageBuffer,
    },
  })

  // await pool.query('INSERT INTO tb_post (tittle, _text, id_user, image_data) VALUES (?,?,?,?)', [tittle, text, id_user, imageBuffer]) 


  res.status(200).json('Successfull'); 
}

export const getPost = async (req, res) => { 

    // const [rows] = await pool.query('Select p.id_post, p.tittle, p.text, s.name, p.createdPo, p.id_user, p.image_data from tb_post p inner join tb_user s on p.id_user = s.id ORDER BY p.createdPo DESC') 
    try {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdPo: 'desc', 
      },
      select: {
        id_post: true,
        tittle: true,
        text: true,
        createdPo: true,
        id_user: true,
        image_data: true,
        user: {
          select: {
            name: true,
            imgPhoto: true
          },
        },
      },
    });
      
      res.status(200).json(posts); 
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
 
    // if (!posts) {
  
    //   res.status(200).json(posts); 
    // } else {

    //     return res.status(401).json('post is undefined');

    // }
}

export const deletePost = async (req, res) => { 

   const { id } = req.params;
   
   const idpost = parseInt(id)

    try {
      // await pool.query('DELETE FROM tb_post WHERE id_post = ?', [id]);
      await prisma.post.delete({
          where: { id_post: idpost },       
      })
      res.status(200).json('success');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json('error');
    } 

}

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { tittle, text } = req.body;
  const idpost = parseInt(id)

  let imageBuffer = null;

  if (req.file) {
    const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename));
    imageBuffer = fs.readFileSync(imagePath);
  }

  try {
    // await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
    await prisma.post.update({
      where: { id_post: idpost },
      data: {
        tittle:tittle,
        text:text,
        image_data: imageBuffer,
      },
    })
    res.status(200).json('success');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json('error');
  } 
}

export const geteditPost = async (req, res) => {
  const { id } = req.params;
  const idpost = parseInt(id)
  try {
  //  const [rows] = await pool.query('SELECT tittle, _text FROM tb_post WHERE id_post = ?', [id]);
   const post = await prisma.post.findUnique({
    where: { id_post: idpost },
    select: {
      tittle:true, 
      text:true,
      
    },
   })

    res.status(200).json(post);
  } catch (error) {
    console.error('Error getting post:', error);
    res.status(500).json('error');
  } 
}

export const getPostProfile = async (req, res) => { 
  const { id } = req.params;
  const id_user = parseInt(id)
  
  try {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdPo: 'desc', 
    },
    where: {
      id_user: id_user
    },
    select: {
      id_post: true,
      tittle: true,
      text: true,
      createdPo: true,
      id_user: true,
      image_data: true,
      user: {
        select: {
          name: true,
          imgPhoto: true
        },
      },
    },
  });
    
    res.status(200).json(posts); 
    
  } catch (error) {
    console.error('Error fetching posts:', error);
  }

}