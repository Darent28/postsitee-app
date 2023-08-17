import { pool } from '../db.js'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const postPost = async (req, res) => { 
  const {tittle, text, id_user} = req.body

  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const imagePath = path.join(path.join(__dirname, '../uploads', req.file.filename))

  const imageBuffer = fs.readFileSync(imagePath);

  await pool.query('INSERT INTO tb_post (tittle, _text, id_user, image_data) VALUES (?,?,?,?)', [tittle, text, id_user, imageBuffer]) 

  res.status(200).json('Successfull'); 
}

export const getPost = async (req, res) => { 

    const [rows] = await pool.query('Select p.id_post, p.tittle, p._text, s.name, p._date, p.id_user, p.image_data from tb_post p inner join tb_user s on p.id_user = s.id ORDER BY p._date DESC') 

    if (rows.length >= 0) {

        res.status(200).json(rows); 

    } else {

        return res.status(401).json('undefined');

    }
}

export const deletePost = async (req, res) => { 

    const { id } = req.params;

    try {
      await pool.query('DELETE FROM tb_post WHERE id_post = ?', [id]);
      res.status(200).json('success');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json('error');
    } 

}

export const editPost = async (req, res) => {
  const { id } = req.params;
  const { title, text } = req.body;

  try {
    await pool.query('UPDATE tb_post SET tittle = ?, _text = ? WHERE id_post = ?', [title, text, id]);
    res.status(200).json('success');
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json('error');
  } 
}

export const geteditPost = async (req, res) => {
  const { id } = req.params;

  try {
   const [rows] = await pool.query('SELECT tittle, _text FROM tb_post WHERE id_post = ?', [id]);
    const post = rows[0]
    res.status(200).json(post);
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json('error');
  } 
}