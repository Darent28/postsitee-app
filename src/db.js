import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: 3306,
    database: 'postsite'
})

// export const pool = createPool({
//     host: 'blciovhybuctaljudum4-mysql.services.clever-cloud.com',
//     user: 'u0fg5grryv2iefp0',
//     password: 'OWALdExK0yX80m7xfxhz',
//     port: 3306,
//     database: 'blciovhybuctaljudum4'
// })
