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
            const salt = await bcrypt.genSalt( 10 );

            user.password = await bcrypt.hash( user.password, salt );
        }
    }
});


export default User;