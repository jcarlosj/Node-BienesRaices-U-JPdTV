import path from 'path';


export default {
    mode: 'development',
    entry: {
        map: './src/assets/js/map.js',
        show_map: './src/assets/js/show-map.js',
        add_image: './src/assets/js/add-image.js',
        home_page_map: './src/assets/js/home-page-map.js',
        change_state: './src/assets/js/change-state.js',
    },
    output: {
        filename: '[name].js',
        path: path.resolve( 'public/js' )
    },
} 