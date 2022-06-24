import { DataTypes } from 'sequelize';

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
});


export default User;