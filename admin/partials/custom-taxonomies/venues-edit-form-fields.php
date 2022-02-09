<?php
wp_nonce_field(plugin_dir_path(__FILE__), '_venue_custom_fields_nonce');
// Check for existing term meta 
$term_id = $term->term_id; // Get the ID of the term you're editing  
$image = get_term_meta($term_id, '_venue_image', true) ? get_term_meta($term_id, '_venue_image', true) : null;
$url = get_term_meta($term_id, '_venue_url', true) ? get_term_meta($term_id, '_venue_url', true) : null;
?>  

<!-- Venue Image -->
<tr class="form-field">
    <th scope="row" valign="top">
        <label for="_venue_image"><?php _e('Venue Image', 'alphynweb-events-calendar'); ?></label>
    </th>
    <td>
        <?php
        echo alphynweb_media_upload_field(
                '_venue_image',
                $image,
                'Upload venue image',
                ['image'],
                'Upload venue image',
                'Use this image');
        ?>
        <p class="description"><?php _e('Upload an image for the venue', 'alphynweb-events-calendar'); ?></p>
    </td>
</tr>

<!-- Venue url -->
<tr class="form-field">
    <th scope="row" valign="top">
        <label for="_venue_url"><?php _e('Venue URL', 'alphynweb-events-calendar') ?></label>
    </th>
    <td>
        <input type="url" name="_venue_url" id="" value="<?php echo $url; ?>" />
        <p class="description"><?php _e('Enter a URL for the venue (leave blank if no URL required', 'alphynweb-events-calendar'); ?></p>
    </td>
</tr>