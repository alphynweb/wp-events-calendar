module.exports = {
    devtool: 'source-map',
    entry: {
        block_editor: {import: './src/admin/js/block-editor/block-editor.js', filename: './admin/js/block-editor/block-editor.js'},
        reset_taxonomy_fields: {import: './src/admin/js/taxonomies/reset-taxonomy-fields.js', filename: './admin/js/taxonomies/reset-taxonomy-fields.js'}
    },
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
