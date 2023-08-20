import { pool } from '../db.js'

export const postReaction = async (req, res) => {
    const { id_post, id_user } = req.body

    const [existingRow] = await pool.query('SELECT * FROM tb_reaction WHERE id_post = ? AND id_user = ?', [id_post, id_user]) 

  


    if (existingRow.length > 0) { 
        res.status(200).json({ exists: true });
    } else { 
        await pool.query('INSERT INTO tb_reaction (id_post, id_user) VALUES (?,?)', [id_post, id_user]) 
        res.status(200).json({ exists: false });
    } 
}

export const updateReaction = async (req, res) => {
    const { id_post, id_user } = req.body;
        
    const [existingRow] = await pool.query('SELECT * FROM tb_reaction WHERE id_post = ? AND id_user = ?', [id_post, id_user]) 
    
    let reaction = existingRow[0];

    try {
        if (reaction.reaction === 1){
            let react = 0;
            await pool.query('UPDATE tb_reaction SET reaction = ? WHERE id_post = ? AND id_user = ?', [react, id_post, id_user]);
            res.status(200).json(react); 
        }else if(reaction.reaction === 0) {
            let react = 1;

            await pool.query('UPDATE tb_reaction SET reaction = ? WHERE id_post = ? AND id_user = ?', [react, id_post, id_user]);
            res.status(200).json(react); 
        }

       
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json('error');
    } 

}

