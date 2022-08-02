import { DataTypes } from 'sequelize';

import db from '../config/sequelize.js';


const Message = db.define( 'messages', {
    message: {
        type: DataTypes.STRING( 260 ),
        allowNull: false,       // NOT-NULL
    }
});


export default Message;