const defaultConfig = require("./node_modules/@wordpress/scripts/config/webpack.config");

module.exports = {
  ...defaultConfig,
	entry: {
        'admin-index': {import: './src/admin/js/index.js', filename: './admin/js/index.js'},
        'admin-block-editor': {import: './src/admin/js/block-editor/block-editor.js', filename: './admin/js/block-editor/block-editor.js'},
        'admin-media-uploader': {import: './src/admin/js/utils/media_uploader.js', filename: './admin/js/utils/media_uploader.js'},
        'admin-reset-taxonomy-fields': {import: './src/admin/js/taxonomies/reset-taxonomy-fields.js', filename: './admin/js/taxonomies/reset-taxonomy-fields.js'},
        'public-index': {import: './src/public/js/index.js', filename: './public/js/index.js'}
	}
};