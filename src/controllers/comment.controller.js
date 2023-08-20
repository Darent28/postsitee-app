import { pool } from '../db.js'


export const postComment = async (req, res) => {
    const { comment, id_post, id_user } = req.body

    await pool.query('INSERT INTO tb_comment (_comment, id_post, id_user) VALUES (?,?,?)', [comment, id_post, id_user])

    res.status(200).json('Successfull');
}

export const getComment = async (req, res) => {
    const [rows] = await pool.query('Select  c.id_comment, c._comment, c.c_date, u.name, c.id_post, c.id_user From tb_comment c inner join tb_user u on  c.id_user = u.id ORDER BY c.c_date DESC') 

    if (rows.length >= 0) {

        res.status(200).json(rows); 

    } else {

        return res.status(401).json('undefined');

    }
}

export const editComment = async (req, res) => {
    const { id } = req.params;
    const { _comment } = req.body;
  
    try {
      const [row] = await pool.query('UPDATE tb_comment SET _comment = ? WHERE id_comment = ?', [_comment, id]);

      res.status(200).json(row[0]);

    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json('error');
    } 
}

export const deleteComment = async (req, res) => { 

    const { id } = req.params;

    try {
      await pool.query('DELETE FROM tb_comment WHERE id_comment = ?', [id]);
      res.status(200).json('success');
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json('error');
    } 

}