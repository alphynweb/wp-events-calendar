<?php
wp_nonce_field(plugin_dir_path(__FILE__), '_venue_custom_fields_nonce');
// Check for existing term meta 
$term_id = $term->term_id; // Get the ID of the term you're editing  
$image = get_term_meta($term_id, '_venue_image', true) ? get_term_meta($term_id, '_venue_image', true) : null;
?>  

<div class="form-field">
    <label for="course_category_image">Category Image</label>
    <?php
    echo alphynweb_media_upload_field(
            '_venue_image',
            $image,
            'Upload Category Image',
            ['image'],
            'Upload Category Image',
            'Use this image');
    ?>
</div>
