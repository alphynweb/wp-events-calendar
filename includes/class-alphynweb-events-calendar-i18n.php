<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://alphynweb.co.uk
 * @since      1.0.0
 *
 * @package    Alphynweb_Events_Calendar
 * @subpackage Alphynweb_Events_Calendar/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Alphynweb_Events_Calendar
 * @subpackage Alphynweb_Events_Calendar/includes
 * @author     Alphynweb <tom.m@alphynweb.co.uk>
 */
class Alphynweb_Events_Calendar_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'alphynweb-events-calendar',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
