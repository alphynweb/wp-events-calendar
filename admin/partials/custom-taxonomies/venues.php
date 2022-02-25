<?php

register_taxonomy('aw_calendar_events_venues', array('aw_calendar_events'), array(
    'hierarchical' => true,
    'labels' => array(
        'name' => _x('Venues', 'taxonomy general name'),
        'singular_name' => _x('Vanue', 'taxonomy singular name'),
        'search_items' => __('Search venues'),
        'all_items' => __('All venues'),
        'parent_item' => __('Parent Venue'),
        'parent_item_colon' => __('Parent Venue:'),
        'edit_item' => __('Edit Venue'),
        'update_item' => __('Update Venue'),
        'add_new_item' => __('Add New Venue'),
        'new_item_name' => __('New Venue'),
        'menu_name' => __('Venues'),
    ),
    'show_ui' => true,
    'show_admin_column' => true,
    'show_in_rest' => true, // Needed for it to appear in Block Editor
    'query_var' => true,
    'rewrite' => array(
        'slug' => 'venues',
        'with_front' => true
    ),
    'has_archive' => true
));