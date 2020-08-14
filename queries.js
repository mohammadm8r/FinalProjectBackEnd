export function connect_to_db(){
    const client = new Client({
        user: 'Mohammad',
        host: '127.0.0.1',
        database: 'Attendance',
        port: 5432,
        password: '123'
    });
    client.connect(err => {
        if (err) {
            console.error('DB connection error', err.stack)
        } else {
            console.log('connected to DB')
        }
    })
    return client;
}

let client = connect_to_db();

export async function request_student_info(client ,username) {
    const query = {
        text: 'SELECT * FROM student WHERE student_username = $1',
        values: [username],
    }

    try {
        const res = await client.query(query)
        console.log(res.rows[0])
        return res.rows[0];
    } catch (err) {
        console.log(err.stack)
        return 'user not found';
    }
}