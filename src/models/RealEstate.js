import { DataTypes } from 'sequelize';

import db from '../config/sequelize.js';


const RealEstate = db.define( 'RealEstates', {
    id: {
        type: DataTypes.UUID,
        defaulValue: DataTypes.UUIDV4,
        allowNull: false,       // NOT-NULL
        primaryKey: true
    },
    ad_title: {
        type: DataTypes.STRING( 100 ),
        allowNull: false        // NOT-NULL
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false        // NOT-NULL 
    },
    bedrooms: {
        type: DataTypes.INTEGER,
        allowNull: false        // NOT-NULL 
    },
    parking_lot: {
        type: DataTypes.INTEGER,
        allowNull: false        // NOT-NULL 
    },
    wc: {
        type: DataTypes.INTEGER,
        allowNull: false        // NOT-NULL 
    },
    street_name: {
        type: DataTypes.STRING( 70 ),
        allowNull: false        // NOT-NULL 
    },
    lat: {
        type: DataTypes.STRING,
        allowNull: false        // NOT-NULL 
    },
    lng: {
        type: DataTypes.STRING,
        allowNull: false        // NOT-NULL 
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false        // NOT-NULL 
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,       // NOT-NULL 
        defaultValue: false
    }
});


export default RealEstate;