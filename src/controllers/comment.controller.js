import { pool } from '../db.js'


export const postComment = async (req, res) => {
    const { comment, id_post, id_user } = req.body

    await pool.query('INSERT INTO tb_comment (_comment, id_post, id_user) VALUES (?,?,?)', [comment, id_post, id_user])

    res.status(200).json('Successfull');
}

export const getComment = async (req, res) => {
    const [rows] = await pool.query('Select c._comment, c.c_date, u.name, c.id_post From tb_comment c inner join tb_user u on  c.id_user = u.id ORDER BY c.c_date DESC') 

    if (rows.length >= 0) {

        res.status(200).json(rows); 

    } else {

        return res.status(401).json('undefined');

    }
}