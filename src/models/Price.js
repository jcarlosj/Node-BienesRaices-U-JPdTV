import { DataTypes } from 'sequelize';

import db from '../config/sequelize.js';


const Price = db.define( 'prices', {
    name: {
        type: DataTypes.STRING( 30 ),
        allowNull: false,       // NOT-NULL
    }
});


export default Price;