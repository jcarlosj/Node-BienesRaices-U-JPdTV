import { DataTypes } from 'sequelize';

import db from '../config/sequelize';


const User = db.define( 'users', {
    name: {
        type: DataTypes.String,
        allowNull: false,       // NOT-NULL
    }, 
    email: {
        type: DataTypes.String,
        allowNull: false,       // NOT-NULL
    }
    ,
    password: {
        type: DataTypes.String,
        allowNull: false,       // NOT-NULL
    },
    token: DataTypes.String,
    confirmed: DataTypes.Boolean
});


export default User;