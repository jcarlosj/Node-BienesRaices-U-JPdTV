import bcrypt from 'bcrypt';

const PASS_DEFAULT = 'pokecito';

const users = [
    { 
        name: 'Juan',
        email: 'jcjimenez29@misena.edu.co',
        confirmed: 1,
        password: bcrypt.hashSync( PASS_DEFAULT, 10 )
    }
];


export default users;