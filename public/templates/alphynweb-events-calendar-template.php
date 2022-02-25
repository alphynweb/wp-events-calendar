<?php

/**
 * Template Name: Alphynweb Events Calendar Page
 *
 */

wp_head();

// Array containing events ids and dates for quick reference to check whether there are any on certain days
$events = [];

// Display events posts
$args = array(
    'post_type' => 'aw_calendar_events',
    'posts_per_page' => -1,
);

$query = new WP_Query($args);

if ($query->have_posts()) { ?>
    <?php while ($query->have_posts()) : $query->the_post(); ?>
        <?php
        // POST META //

        // Start date and time
        $event_start_date = get_post_meta(get_the_ID(), '_event_start_date', true);

        // End date and time
        $event_end_date = get_post_meta(get_the_ID(), '_event_end_date', true);

        // Add event object to $events array
        $event_object = [
            'id' => get_the_id(),
            'start_date' => strtotime($event_start_date),
            'end_date' => strtotime($event_end_date)
        ];

        array_push($events, $event_object);
        ?>

        <!-- Todo - delete - just for reference to do with time string displays -->
        <h1 style="display: none;"><?php the_title(); ?></h1>
        <h2 style="display: none;">Event start date: <?php echo $event_start_date; ?></h2>
        <h2 style="display: none;">Event start date year: <?php echo date("Y", strtotime($event_start_date)); ?></h2>
        <h2 style="display: none;">Event start date month: <?php echo date("M", strtotime($event_start_date)); ?></h2>
        <h2 style="display: none;">Event start date day: <?php echo date("D", strtotime($event_start_date)); ?></h2>
        <h2 style="display: none;">Event end date: <?php echo $event_end_date; ?></h2>

    <?php endwhile; ?>
<?php } ?>

<ul class="alphynweb-events-calendar">

    <!-- Calendar block -->
    <?php
    $year = 2022;
    $month = 2;
    $days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
    ?>

    <?php
    // Cycle through days in month and display list item for each day
    for ($day = 1; $day < $days + 1; $day++) : ?>

        <li class="calendar-day">

            <?php
            // Create new date object unix timestamp for day
            $day_timestamp = mktime(0, 0, 0, $month, $day, $year);
            $next_day_timestamp = strtotime('+1 day', $day_timestamp);
            $day_date_format = date('D,M d,Y', $day_timestamp);

            echo "<h2>" . $day_date_format . "</h2>";


            // Check whether there are any events on this day
            // Search through $events array
            $min = $day_timestamp;
            $max = $next_day_timestamp;


            $events_on_day_ids = [];

            if (count($events)) {
                for ($i = 0; $i < count($events); $i++) {
                    $event_start_date = $events[$i]['start_date'];
                    $event_end_date = $events[$i]['end_date'];
                    if (
                        // Event start time between start and end of day
                        $event_start_date >= $min && $event_start_date <= $max ||
                        // Event start time before beginning of day and end time after beginning of day
                        $event_start_date <= $min && $event_end_date >= $min
                    ) {
                        array_push($events_on_day_ids, $events[$i]['id']);
                    }
                }
            }

            $args = array(
                'post_type' => 'aw-calendar-events',
                // post__in takes array(-1) to show no posts if $events_on_day_ids is empty
                'post__in' => count($events_on_day_ids) ? $events_on_day_ids : array(-1)
            );

            $events_on_current_day = get_posts($args);

            if ($events_on_current_day) {
                foreach ($events_on_current_day as $post) {
                    setup_postdata($post);
                    $venues = get_the_terms(get_the_ID(), 'aw_calendar_events_venues'); ?>

                    <h2><?php the_title(); ?></h2>

                    <?php if ($venues) :
                        foreach ($venues as $venue) :
                            // GET VENUE INFO //
                            // Id
                            $venue_id = $venue->term_id;
                            // Name
                            $venue_name = $venue->name;
                            // Description
                            $venue_description = $venue->description;
                            // Image id
                            $venue_image_id = get_term_meta($venue_id, '_venue_image', true);
                            // Image file
                            $venue_image_file = wp_get_attachment_image_url($venue_image_id, 'medium_large', false, null);
                    ?>
                            <h4>Venue: <?php echo $venue_name; ?></h4>

                    <?php
                        endforeach;
                    endif;
                    ?>
            <?php }
                wp_reset_postdata();
            }
            ?>

        </li>

    <?php endfor; ?>

</ul>

<?php wp_footer(); ?>