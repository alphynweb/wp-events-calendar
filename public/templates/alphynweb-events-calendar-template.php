<?php

/**
 * Template Name: Alphynweb Events Calendar Page
 *
 */

// Array containing events ids and dates for quick reference to check whether there are any on certain days
$events = [];

// Display events posts
$args = array(
    'post_type' => 'aw-calendar-events',
    'posts_per_page' => -1,
);

$query = new WP_Query($args);

if ($query->have_posts()) { ?>

    <ul>

        <?php while ($query->have_posts()) : $query->the_post(); ?>

            <li>

                <?php
                // POST META //

                // Start date and time
                $event_start_date = get_post_meta(get_the_ID(), '_event_start_date', true);

                // End date and time
                $event_end_date = get_post_meta(get_the_ID(), '_event_end_date', true);

                // Venues
                $venues = get_the_terms(get_the_ID(), 'aw-calendar-events-venues');

                // Add event object to $events array
                $event_object = [
                    'id' => get_the_id(),
                    'start_date' => strtotime($event_start_date),
                    'end_date' => strtotime($event_end_date)
                ];

                array_push($events, $event_object);
                ?>

                <h1><?php the_title(); ?></h1>
                <h2>Event start date: <?php echo $event_start_date; ?></h2>
                <h2>Event start date year: <?php echo date("Y", strtotime($event_start_date)); ?></h2>
                <h2>Event start date month: <?php echo date("M", strtotime($event_start_date)); ?></h2>
                <h2>Event start date day: <?php echo date("D", strtotime($event_start_date)); ?></h2>
                <h2>Event end date: <?php echo $event_end_date; ?></h2>

                <?php if ($venues) : ?>
                    <h2>Venues:</h2>
                    <?php foreach ($venues as $venue) :
                        var_dump($venue);
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
                        <h3>ID: <?php echo $venue_id; ?></h3>
                        <h3>Name: <?php echo $venue_name; ?></h3>
                        <h3>Description: <?php echo $venue_description; ?></h3>
                        <h3>Image id: <?php echo $venue_image_id; ?></h3>
                        <h3>Image file: <?php echo $venue_image_file; ?></h3>
                        <img src="<?php echo $venue_image_file; ?>" alt="<?php echo $venue_name; ?>" />

                    <?php endforeach; ?>
                <?php endif; ?>

            </li>

        <?php endwhile; ?>

    </ul>

<?php } ?>

<!-- Calendar block -->
<?php
$year = 2022;
$month = 2;
$days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
// var_dump($days); ?>

<?php

// Cycle through days in month and display list item for each day
for ($day = 1; $day < $days + 1; $day++) {
    // echo "<h2>Day: " . $day . " - " . $day . " " . $month . " " . $year . "</h2>";

    // Create new date object unix timestamp for day
    $day_timestamp = mktime(0, 0, 0, $month, $day, $year);
    $next_day_timestamp = strtotime('+1 day', $day_timestamp);
    $day_date_format = date('D,M d,Y', $day_timestamp);
    // $next_day_format = date('D,M d,Y', $next_day_timestamp);

    // var_dump($day_date_format);
    // var_dump($next_day_format);
    echo "<h2>" . $day_date_format . "</h2>";

    // Check whether there are any events on this day
    echo "<h3>Events:</h3>";

    // Check whether any events happening during this day
    // Search through $events array
    $min = $day_timestamp;
    $max = $next_day_timestamp;

    echo "<h4>Min timestamp: " . $min . "</h4>";
    echo "<h4>Max timestamp: " . $max . "</h4>";

    $events_on_day = [];

    $events_on_day = array_filter(
        $events,
        function ($value) use ($min, $max) {
            return (
                // Event start time between start and end of day
                ($value['start_date'] >= $min && $value['start_date'] <= $max) ||

                // Event start time before beginning of day and end time after beginning of day
                ($value['start_date'] <= $min && $value['end_date'] >= $min)

                // Event start time between beginning of day and end of day and end time after end of day
                // ($value['start_date'] >= $min && $value['start_date'] <= $max && $value['end_date'] >= $max)
            );
        }
    );

    // var_dump($events_on_day);

    if ($events_on_day) {
        foreach ($events_on_day as $event_on_day) {
            $event_post = get_post($event_on_day['id']);
            // var_dump($event_post);
            echo "<h3>" . $event_post->post_title . "</h3>";
        }
    } else {
        echo "<h3>NO EVENTS</h3>";
    }
}

// var_dump($events);
?>