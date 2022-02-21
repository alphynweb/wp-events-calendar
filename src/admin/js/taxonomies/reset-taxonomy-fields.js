import deparam from 'jquery-deparam';

(function ($) {
    $(document).ajaxSuccess(function (e, request, settings) {
        const object = deparam(settings.data);
        if (object.action === 'add-tag' && object.screen === 'edit-aw-calendar-events-venues' && object.taxonomy === 'aw-calendar-events-venues') {
            // Reset form
            const venueForm = document.getElementById('addtag');
            venueForm.reset();

            // Reset venue image and hidden input - remove nodes from DOM
            const venueImage = document.querySelector('.true_pre_image');
            const venueImageInput = document.getElementById('_venue_image');

            if (venueImage) {
                venueImage.remove();
            }

            if (venueImageInput) {
                venueImageInput.remove();
            }
        }
    });
})(jQuery);


