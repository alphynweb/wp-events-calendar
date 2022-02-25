import deparam from 'jquery-deparam';

(function ($) {
    $(document).ajaxSuccess(function (e, request, settings) {
        const object = deparam(settings.data);
        if (object.action === 'add-tag' && object.screen === 'edit-aw_calendar_events_venues' && object.taxonomy === 'aw_calendar_events_venues') {
            // Reset form
            const venueForm = document.getElementById('addtag');
            venueForm.reset();

            // Reset venue image and hidden input - remove nodes from DOM
            const venueImage = document.querySelector('.true_pre_image');

            // Remove the image from DOM if exists
            if (venueImage) {
                venueImage.remove();
            }

            // Reset button
            const venueImageInput = document.querySelector('.misha_remove_image_button');
            var buttonText = $(venueImageInput).data('add-text');
            $(venueImageInput).hide().prev().val('').prev().addClass('button').html(buttonText);
        }
    });
})(jQuery);

