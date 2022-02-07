<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://alphynweb.co.uk
 * @since      1.0.0
 *
 * @package    Alphynweb_Events_Calendar
 * @subpackage Alphynweb_Events_Calendar/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Alphynweb_Events_Calendar
 * @subpackage Alphynweb_Events_Calendar/admin
 * @author     Alphynweb <tom.m@alphynweb.co.uk>
 */
class Alphynweb_Events_Calendar_Admin {

    /**
     * The ID of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $plugin_name    The ID of this plugin.
     */
    private $plugin_name;

    /**
     * The version of this plugin.
     *
     * @since    1.0.0
     * @access   private
     * @var      string    $version    The current version of this plugin.
     */
    private $version;

    /**
     * Initialize the class and set its properties.
     *
     * @since    1.0.0
     * @param      string    $plugin_name       The name of this plugin.
     * @param      string    $version    The version of this plugin.
     */
    public function __construct($plugin_name, $version) {

        $this->plugin_name = $plugin_name;
        $this->version = $version;

        // Register custom post types
        add_action('init', array($this, 'register_custom_post_types'));

        // Add admin menu
        add_action('admin_menu', array($this, 'add_alphynweb_events_calendar_admin_menu'), 9);

        // Remove editor panels from sidebar
        add_action('init', function () {
            wp_enqueue_script('alphynweb-gutenberg-editor-panels', plugin_dir_url(__FILE__), 'js/alphynweb-gutenberg-editor-panels.js',
                    array('wp-blocks', 'wp-edit-post'), false, false);
        });

        // Fields for settings page
//        add_action('admin_init', array($this, 'register_and_build_settings_fields'));
        // Regiter post type custom meta fields
        add_action('init', array($this, 'register_post_type_custom_meta_fields'));

        add_action('enqueue_block_editor_assets', function () {
            wp_enqueue_script('alphynweb-gutenberg', plugin_dir_url(__FILE__) . 'js/alphynweb-gutenberg.build.js', array('wp-edit-post', 'wp-element', 'wp-components', 'wp-plugins', 'wp-data'), false, false);
//            wp_enqueue_script($handle, $src, $deps, $ver, $in_footer)
        });
    }

    public function register_custom_post_types() {
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
        register_post_type('aw-calendar-events', $args);
    }

    public function add_alphynweb_events_calendar_admin_menu() {
        // Main menu page
//            add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $icon_url, $position);
        add_menu_page($this->plugin_name, 'Alphynweb Events Calendar', 'administrator', $this->plugin_name, array($this, 'display_alphynweb_events_calendar_admin_dashboard'), 'dashicons-calendar-alt', 80);

        // Settings page
//        add_submenu_page($parent_slug, $page_title, $menu_title, $capability, $menu_slug, $function, $position);
        add_submenu_page($this->plugin_name, 'Alphynweb Events Calendar Settings', 'Settings', 'administrator', $this->plugin_name . '-settings', array($this, 'display_alphynweb_events_calendar_admin_settings'));
    }

    public function display_alphynweb_events_calendar_admin_dashboard() {
        require_once 'partials/' . $this->plugin_name . '-admin-display.php';
    }

    public function display_alphynweb_events_calendar_admin_settings() {
        // Set $active_tab var to be used in settings-display view file
        $active_tab = isset($_GET['tab']) ? $_GET['tab'] : 'general';

        if (isset($_GET['error_message'])) {
            add_action('admin_notices', array($this, 'alphynweb_events_calendar_settings_messages'));
            do_action('admin_notices', $_GET['error_message']);
        }
        require_once 'partials/' . $this->plugin_name . '-admin-settings-display.php';
    }

    public function alphynweb_events_calendar_settings_messages($error_message) {
        switch ($error_message) {
            case '1':
                $message = _('There was an error adding this setting. Please try again. If the problem persists, please email the plugin author.', 'alphynweb-events-calendar');
                $err_code = esc_attr('alphynweb_events_calendar_example_setting'); // Todo - change example_setting 
                $setting_field = 'alphynweb_events_calendar_example_setting'; // Todo - change example_setting
                break;
        }
        $type = 'error';
//        add_settings_error($type, $setting_field, $message, $type);
        add_settings_error($setting_field, $err_code, $message, $type);
    }

    public function register_and_build_settings_fields() {
        
    }

    public function register_post_type_custom_meta_fields() {
        register_post_meta('aw-calendar-events', '_event_start_date', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ]);
        
        register_post_meta('aw-calendar-events', '_event_end_date', [
            'show_in_rest' => true,
            'single' => true,
            'type' => 'string',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            }
        ]);
    }

    /**
     * Register the stylesheets for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_styles() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Alphynweb_Events_Calendar_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Alphynweb_Events_Calendar_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/alphynweb-events-calendar-admin.css', array(), $this->version, 'all');
    }

    /**
     * Register the JavaScript for the admin area.
     *
     * @since    1.0.0
     */
    public function enqueue_scripts() {

        /**
         * This function is provided for demonstration purposes only.
         *
         * An instance of this class should be passed to the run() function
         * defined in Alphynweb_Events_Calendar_Loader as all of the hooks are defined
         * in that particular class.
         *
         * The Alphynweb_Events_Calendar_Loader will then create the relationship
         * between the defined hooks and the functions defined in this
         * class.
         */
        wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/alphynweb-events-calendar-admin.js', array('jquery'), $this->version, false);
    }

}
