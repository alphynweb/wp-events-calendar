module.exports = {
    entry: './admin/js/alphynweb-gutenberg.js',
    output: {
        path: __dirname,
        filename: 'admin/js/alphynweb-gutenberg.build.js',
    },
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
};
