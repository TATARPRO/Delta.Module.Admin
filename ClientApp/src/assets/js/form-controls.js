
(function ($) {
  //checkbox and radios
  $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

  // Background
  $("[data-background]").each(function () {
    var me = $(this);
    me.css({
      backgroundImage: 'url(' + me.data('background') + ')'
    });
  });

  $(function () {
    /* Code for attribute data-custom-class for adding custom class to tooltip */
    if (typeof $.fn.tooltip.Constructor === 'undefined') {
      throw new Error('Bootstrap Tooltip must be included first!');
    }

    var Tooltip = $.fn.tooltip.Constructor;

    // add customClass option to Bootstrap Tooltip
    $.extend(Tooltip.Default, {
      customClass: ''
    });

    var _show = Tooltip.prototype.show;

    Tooltip.prototype.show = function () {

      // invoke parent method
      _show.apply(this, Array.prototype.slice.apply(arguments));

      if (this.config.customClass) {
        var tip = this.getTipElement();
        $(tip).addClass(this.config.customClass);
      }

    };
    $('[data-toggle="tooltip"]').tooltip();

  });

  $(function () {
    $('.file-upload-browse').on('click', function () {
      var file = $(this).parent().parent().parent().find('.file-upload-default');
      file.trigger('click');
    });
    $('.file-upload-default').on('change', function () {
      $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });
  });
})(jQuery);
