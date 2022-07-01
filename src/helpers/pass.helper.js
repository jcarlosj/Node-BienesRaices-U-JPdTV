import bcrypt from 'bcrypt';


const hashPassword = async ( pass ) => {
    const salt = await bcrypt.genSalt( 10 );

    return await bcrypt.hash( pass, salt );
}

const verifyPassword = ( pass, current_pass ) => {
    
    return bcrypt.compareSync( pass, current_pass );
}

export {
    hashPassword,
    verifyPassword
}