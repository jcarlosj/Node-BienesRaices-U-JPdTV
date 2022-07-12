import { DataTypes } from 'sequelize';
import { hashPassword, verifyPassword } from '../helpers/pass.helper.js';

import db from '../config/sequelize.js';


const User = db.define( 'users', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    }, 
    email: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,       // NOT-NULL
    },
    token: DataTypes.STRING,
    confirmed: DataTypes.BOOLEAN
}, {
    // ! Funciones que se llaman antes y después de que se ejecuten las llamadas en Sequelize
    hooks: {
        beforeCreate: async function( user ) {
            const { password } = user;

            user.password = await hashPassword( password );
        }
    },
    // ! Permite definir consultas de uso comun
    scopes: {
        // ? Excluimos campos cuando se hace una consulta al modelo
        noPasswordConfirmationToken: {    // ? Nombre que hemos dado a nuestro scope 
            attributes: {
                exclude: [ 'password', 'token', 'confirmed', 'createdAt', 'updatedAt' ]
            }
        }
    }
});

// * Personaliza modelo: Agregando metodo para encriptar contraseñas
User.prototype.hashPassword = async function ( pass ) {

    return await hashPassword( pass );
}

User.prototype.verifyPassword = function ( pass ) {

    return verifyPassword( pass, this.password );
}


export default User;