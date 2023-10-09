import { pool } from '../db.js'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const postReaction = async (req, res) => {
    const { id_post, id_user } = req.body

    // const [existingRow] = await pool.query('SELECT * FROM tb_reaction WHERE id_post = ? AND id_user = ?', [id_post, id_user]) 

    const row = await prisma.reaction.findMany({
        where:{ id_post: id_post, id_user: id_user },
    })


    if (row.length > 0) { 
        res.status(200).json({ exists: true });
    } else { 
        // await pool.query('INSERT INTO tb_reaction (id_post, id_user) VALUES (?,?)', [id_post, id_user]) 
        await prisma.reaction.create({
            data:{ id_post: id_post, id_user: id_user },
        })
        res.status(200).json({ exists: false });
    } 
}

export const updateReaction = async (req, res) => {
    const { id_post, id_user } = req.body;
        
    // const [existingRow] = await pool.query('SELECT * FROM tb_reaction WHERE id_post = ? AND id_user = ?', [id_post, id_user]) 

    try {
        const row = await prisma.reaction.findMany({
            where:{ 
                id_post: id_post, 
                id_user: id_user
            },
        })

        if (row.length > 0) {
 
            let react = row.reaction === 1 ? 0 : 0;

            await prisma.reaction.update({
                where: {
                    id_post: id_post,
                    id_user: id_user,
                },
                data: {
                    reaction: react,
                },
            });

            res.status(200).json(react);
        } else {
            // Handle the case where no matching record was found.
            // You might want to return an error response or take some other action.
            res.status(404).json('No matching record found');
        }

    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json('error');
    } 

}

