<?php

// Display media upload button - name=option name, value=option value, button text=text to display on button, file_types = array of allowed file types 
// title=title that appears in pop up media window, use_text = text that appears on button in pop up media window
function alphynweb_media_upload_field($name, $value = null, $button_text = '', $file_types = array(), $title = 'Upload file', $use_text = 'Use this file') {
    $image_size = 'full'; // it would be better to use thumbnail size here (150x150 or so)
//    $display = 'none'; // display state ot the "Remove image" button
    // Check for filetypes
    $data_image = in_array('image', $file_types) ? "yes" : "no";
    $data_document = in_array('document', $file_types) ? "yes" : "no";
    $display_document = null;
    $remove_button_display = 'none';
    $remove_button_text = 'Remove image';
    $upload_button_html = ' button">' . $button_text;

    $attachment_data = get_post($value);

    if ($data_document === 'yes') {
        $remove_button_text = 'Remove file';

        if (!empty($value)) {
            $display_document = get_the_title($value);
            $display_document_filename = basename(get_post_meta($value, '_wp_attached_file', true));
            ;
            $remove_button_display = 'inline-block;';
            $upload_button_html = '"><span>' . $display_document_filename . '</span>';
        }
    }

    if ($image_attributes = wp_get_attachment_image_src($value, $image_size)) {
        // $image_attributes[0] - image URL
        // $image_attributes[1] - image width
        // $image_attributes[2] - image height
        $remove_button_display = 'inline-block;';
        $upload_button_html = '"><img src="' . $image_attributes[0] . '" style="max-width:95%;display:block;" />';
        $display = 'inline-block';
    }

    return '
		<a href="#" data-document="' . $data_document . '" data-image="' . $data_image . '" data-title="' . $title . '" data-usetext="' . $use_text . '" class="misha_upload_image_button' . $upload_button_html . '</a>
		<input type="hidden" name="' . $name . '" id="' . $name . '" value="' . esc_attr($value) . '" />
            <a href="#" class="misha_remove_image_button button" style="display:' . $remove_button_display . '" data-remove-text="' . $remove_button_text . '" data-add-text="' . $button_text . '">' . $remove_button_text . '</a>
        ';
}
