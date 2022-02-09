// Method 1

////wp.data.dispatch('core/edit-post').removeEditorPanel('taxonomy-panel-category'); // categories
//wp.data.dispatch('core/edit-post').removeEditorPanel('taxonomy-panel-TAXONOMY-NAME'); // custom taxonomy
wp.data.dispatch('core/edit-post').removeEditorPanel('taxonomy-panel-post_tag'); // tags
//wp.data.dispatch('core/edit-post').removeEditorPanel('featured-image'); // featured image
//wp.data.dispatch('core/edit-post').removeEditorPanel('post-link'); // permalink
//wp.data.dispatch('core/edit-post').removeEditorPanel('page-attributes'); // page attributes
//wp.data.dispatch('core/edit-post').removeEditorPanel('post-excerpt'); // Excerpt
//wp.data.dispatch('core/edit-post').removeEditorPanel('discussion-panel'); // Discussion


// Method 2
wp.domReady(() => {
   const {removeEditorPanel} = wp.data.dispatch('core/edit-post');

   removeEditorPanel('taxonomy-panel-category');
});


