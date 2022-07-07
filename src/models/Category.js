import { DataTypes } from 'sequelize';

import db from '../config/sequelize.js';


const Category = db.define( 'categories', {
    name: {
        type: DataTypes.STRING( 30 ),
        allowNull: false,       // NOT-NULL
    },
    description: DataTypes.STRING( 140 )
});


export default Category;