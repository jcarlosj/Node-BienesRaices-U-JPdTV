import path from 'path';


export default {
    mode: 'development',
    entry: {
        map: './src/assets/js/map.js',
        add_image: './src/assets/js/add-image.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve( 'public/js' )
    },
} 