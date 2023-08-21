import {createPool} from 'mysql2/promise'

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'todo',
    namedPlaceholders: true,
    decimalNumbers: true,
});
