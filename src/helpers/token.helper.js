import jwt from 'jsonwebtoken';


const generateRandomString = () => Math.random().toString( 32 ).substring( 2 ) + Date.now().toString( 32 );

const generateJWT = ({ id, name, email }) => jwt.sign({ 
        id,
        name,
        email
    }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: '1d'
    });


export {
    generateRandomString,
    generateJWT
}