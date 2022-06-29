import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

import db from '../config/sequelize.js';


const User = db.define( 'Users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    }
    ,
    password: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
}, {
    hooks: {
        beforeCreate: async function( user ) {
            const { password } = user;

            user.password = this.hashPassword( password );
        }
    }
});

// * Personaliza modelo: Agregando metodo para encriptar contraseñas
User.prototype.hashPassword = async function ( pass ) {
    const salt = await bcrypt.genSalt( 10 );

    return await bcrypt.hash( pass, salt );
}


export default User;