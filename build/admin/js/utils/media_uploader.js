/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************************************!*\
  !*** ./src/admin/js/utils/media_uploader.js ***!
  \**********************************************/
jQuery(function ($) {
  /*
  * Select/Upload image(s) event
  */
  $('body').on('click', '.misha_upload_image_button', function (e) {
    e.preventDefault();
    var buttonHtml = ""; // Get filetypes

    var fileTypes = [];

    if ($(this).data('image') === "yes") {
      fileTypes.push('image');
    }

    if ($(this).data('document') === "yes") {
      fileTypes.push('application/pdf');
      fileTypes.push('application/msword');
      fileTypes.push('application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    } // Get title text


    var titleText = $(this).data('title'); // Get button text 

    var buttonText = $(this).data('usetext');
    var button = $(this),
        custom_uploader = wp.media({
      title: titleText,
      library: {
        // uncomment the next line if you want to attach image to the current post
        // uploadedTo : wp.media.view.settings.post.id, 
        //                        type: 'image'
        type: fileTypes
      },
      button: {
        text: buttonText // button label text

      },
      multiple: false // for multiple image selection set to true

    }).on('select', function () {
      // it also has "open" and "close" events 
      var attachment = custom_uploader.state().get('selection').first().toJSON();

      if (fileTypes.includes('image')) {
        buttonHtml = '<img class="true_pre_image" src="' + attachment.url + '" style="max-width:95%;display:block;" />';
      }

      if (fileTypes.includes('application/pdf') || fileTypes.includes('application/msword') || fileTypes.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
        buttonHtml = '<span>' + attachment.filename + '</span>';
      }

      $(button).removeClass('button').html(buttonHtml).next().val(attachment.id).next().show();
    }).open();
  });
  /*
   * Remove image event
   */

  $('body').on('click', '.misha_remove_image_button', function () {
    var buttonText = $(this).data('add-text');
    $(this).hide().prev().val('').prev().addClass('button').html(buttonText);
    return false;
  });
});
/******/ })()
;
//# sourceMappingURL=media_uploader.js.map