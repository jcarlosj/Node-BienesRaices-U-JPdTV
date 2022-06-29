import { DataTypes } from 'sequelize';
import { hashPassword } from '../helpers/pass.helper.js';

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

            user.password = await hashPassword( password );
        }
    }
});

// * Personaliza modelo: Agregando metodo para encriptar contraseñas
User.prototype.hashPassword = async function ( pass ) {

    return await hashPassword( pass );
}


export default User;