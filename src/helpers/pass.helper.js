import bcrypt from 'bcrypt';


const hashPassword = async ( pass ) => {
    const salt = await bcrypt.genSalt( 10 );

    return await bcrypt.hash( pass, salt );
}

export {
    hashPassword
}