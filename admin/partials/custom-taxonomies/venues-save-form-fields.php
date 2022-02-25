<?php

if (!isset($_POST['_venue_custom_fields_nonce']) || !wp_verify_nonce($_POST['_venue_custom_fields_nonce'], plugin_dir_path(__FILE__))) {
    wp_die("Error in nonce");
}

$venue_meta = [];

// Check for meta data values
// Venue image
$venue_meta['_venue_image'] = isset($_POST['_venue_image']) ? $_POST['_venue_image'] : null;
// Venue url
$venue_meta['_venue_url'] = isset($_POST['_venue_url']) ? sanitize_url($_POST['_venue_url']) : null;

// Work out venue image url (for adding to meta for rest api)
$venue_meta['_venue_image_url'] = isset($_POST['_venue_image']) ? wp_get_attachment_url($_POST['_venue_image']) : null;

// Loop through the meta keys and save
$meta_keys = array_keys($venue_meta);

foreach ($meta_keys as $meta_key) {
    update_term_meta($term_id, $meta_key, $venue_meta[$meta_key]);
}