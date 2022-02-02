<?php
/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://alphynweb.co.uk
 * @since      1.0.0
 *
 * @package    Alphynweb_Events_Calendar
 * @subpackage Alphynweb_Events_Calendar/admin/partials
 */
?>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->

<div class="wrap">
    <?php settings_errors(); ?>

    <form method="POST" action="options.php">
        <?php
        settings_fields('alphynweb_events_calendar_general_settings');
        do_settings_sections('alphynweb_events_calendar_general_settings');
        ?>
        <?php submit_button(); ?>
    </form>
</div>
