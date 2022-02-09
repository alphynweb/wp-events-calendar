import {deparam} from 'jquery-deparam';

(function ($) {
    $(document).ajaxSuccess(function (e, request, settings) {
        const object = $.deparam(settings.data);
        console.log(object);
    });
})(jQuery);


