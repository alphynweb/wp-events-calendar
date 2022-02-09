<?php
wp_nonce_field(plugin_dir_path(__FILE__), '_venue_custom_fields_nonce');
?>  

<!-- Venue Image -->
<div class="form-field">
    <label for="_venue_image"><?php _e('Venue Image', 'alphynweb-events-calendar'); ?></label>
    <?php
    echo alphynweb_media_upload_field(
            '_venue_image',
            null,
            'Upload venue image',
            ['image'],
            'Upload venue image',
            'Use this image');
    ?>
    <p class="description"><?php _e('Upload an image for the venue', 'alphynweb-events-calendar'); ?></p>
</div>

<!-- Venue url -->
<div class="form-field">
    <label for="_venue_url"><?php _e('Venue URL', 'alphynweb-events-calendar') ?></label>
    <input type="url" name="_venue_url" id="" value="" />
    <p class="description"><?php _e('Enter a URL for the venue (leave blank if no URL required', 'alphynweb-events-calendar'); ?></p>
</div>