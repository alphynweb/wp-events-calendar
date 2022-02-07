( function( wp ) {

	const { registerPlugin } = wp.plugins;
	const { PluginSidebar } = wp.editPost;

	registerPlugin( 'misha-seo', {
		render: function(){
			return (
				<PluginSidebar name="misha-seo" title="SEO">
					hello world
				</PluginSidebar>
			)
		}
	} );

} )( window.wp );