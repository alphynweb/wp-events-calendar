<?php

// Register alphynweb-calendar-event post type
$args = array(
    'label' => 'Alphynweb Calendar Events',
    'labels' =>
    array(
        'name' => 'Alphynweb Calendar Events',
        'singular_name' => 'Alphynweb Calendar Event',
        'add_new' => 'Add event',
        'add_new_item' => 'Add new event',
        'edit_item' => 'Edit event',
        'new_item' => 'New event',
        'view_item' => 'View event',
        'search_items' => 'Search events',
        'not_found' => 'No events found',
        'not_found_in_trash' => 'No events found in trash',
        'menu_name' => 'Alphynweb Calendar Events',
        'name_admin_bar' => 'Alphynweb Calendar Events',
    ),
    'public' => true,
    'description' => 'Alphynweb Calendar Events',
    'exclude_from_search' => false,
    'show_ui' => true,
//            'show_in_menu' => $this->plugin_name, // Use if it's to be a sub menu item below settings in the main one
    'menu_position' => 26, // Use if it's to be a seperate menu item from the main one
    'menu_icon' => 'dashicons-calendar-alt',
//            'supports' => array('title', 'thumbnail', 'custom_fields'),
    'show_in_rest' => true, // enable Gutenberg editor
    'supports' => ['editor', 'title', 'custom-fields'], // Need custom-fields for custom fields to save
    'taxonomies' => ['category', 'post_tag']
);

// Post type, $args - the Post Type string can be MAX 20 characters
register_post_type('aw_calendar_events', $args);
