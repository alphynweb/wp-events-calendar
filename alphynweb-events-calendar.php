<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://alphynweb.co.uk
 * @since             1.0.0
 * @package           Alphynweb_Events_Calendar
 *
 * @wordpress-plugin
 * Plugin Name:       Alphynweb Events Calendar
 * Plugin URI:        https://github.com/alphynweb/wp-events-calendar.git
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Alphynweb
 * Author URI:        https://alphynweb.co.uk
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       alphynweb-events-calendar
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'ALPHYNWEB_EVENTS_CALENDAR_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-alphynweb-events-calendar-activator.php
 */
function activate_alphynweb_events_calendar() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-alphynweb-events-calendar-activator.php';
	Alphynweb_Events_Calendar_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-alphynweb-events-calendar-deactivator.php
 */
function deactivate_alphynweb_events_calendar() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-alphynweb-events-calendar-deactivator.php';
	Alphynweb_Events_Calendar_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_alphynweb_events_calendar' );
register_deactivation_hook( __FILE__, 'deactivate_alphynweb_events_calendar' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-alphynweb-events-calendar.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_alphynweb_events_calendar() {

	$plugin = new Alphynweb_Events_Calendar();
	$plugin->run();

}
run_alphynweb_events_calendar();
