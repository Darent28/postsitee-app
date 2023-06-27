import { pool } from '../../postsitee-app/src/db.js'
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs';



export const getUser = async (req, res) => { 
    const [rows] = await pool.query('SELEXT * FROM tb_user') 
    res.json(rows)
}


export const postUserlogin = async (req, res) => { 

    const {name, password} = req.body

    const [rows] = await pool.query('SELECT * FROM tb_user WHERE name = ?', [name])

    if (rows.length <= 0){
        return res.status(401).json('Usuario o contraseña incorrectos');
    }

    const user = rows[0];
    
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

    const {name, email, password, password_confirm} = req.body
    let passwordHaash = await  bcryptjs.hash(password, 8)
    if(password === password_confirm) { 
        
        await pool.query('INSERT INTO tb_user (name, email, password) VALUES (?,?,?)', [name, email, passwordHaash])
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
