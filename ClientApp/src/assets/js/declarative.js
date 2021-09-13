
function showToaster (title, text, mode) {
  'use strict';
  var icon, background = ''
  switch (mode) {
    case 0:
      background = '#f2a654'; //danger
      icon = 'danger'
      break;
    case 1:
      background = '#46c35f'; //info
      icon = 'info'
      break;
    case 2:
      background = '#f96868'; //success
      icon = 'success'
      break;
    case 3:
      background = '#57c7d4'; //warning
      icon = 'warning'
      break;
    default:
      background = '#f7f7f7'; //grey
      icon = 'info'
      break;
  }

  $.toast().reset('all');
  $.toast({
    heading: title,
    text: text,
    showHideTransition: 'slide',
    icon: icon,
    loaderBg: background,
    position: 'top-right'
  })
};

function showNotification(colorName, text, icon, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'This is a default notification message'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true
    $.notify({
      message: text,
      icon: icon
    },
      {
        type: colorName,
        allow_dismiss: allowDismiss,
        newest_on_top: true,
        timer: 1000,
        placement: {
          from: placementFrom,
          align: placementAlign
        },
        animate: {
          enter: animateEnter,
          exit: animateExit
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert-fill-primary alert alert-dismissible {0} ' + (allowDismiss ? "" : "") + '" role="alert">' +
          '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
  }

function showDialogWithIcon(title, text, type) {
  swal({
    title: title,
    text: text,
    showConfirmButton: true,
    type: type
  })
}

function showDialogWithOptions(title, text, type, showCancel, cancelText, okText) {
  return new Promise((resolve, reject) => {
    swal({
      title: title,
      text: text,
      type: type,
      showCancelButton: showCancel,
      confirmButtonColor: "#f96868",
      cancelButtonColor: "#f2a654",
      cancelButtonText: cancelText,
      confirmButtonText: okText,
      closeOnConfirm: true,
      closeOnCancel: true
    }, function (isConfirm) {
      if (isConfirm) {
        resolve("1")
      } else {
        reject("0")
      }
    })
  })
}

function activateLoader(activate) {
  //if (activate == true) {
  //  $(".main-panel").prepend(`<div class="grid-margin stretch-card is-async" id="async-loader">
  //                    <div class="loader-demo-box">
  //                      <div class="dot-opacity-loader">
  //                        <span></span>
  //                        <span></span>
  //                        <span></span>
  //                      </div>
  //                    </div>
  //                  </div>`)
  //} else {
  //  $(".is-async").remove()
  //}
}

function removeElement(selector) {
  $(`${selector}`).remove();
}

function appendCheckboxHelper() {
  //checkbox and radios
  //$(".form-check label,.form-radio label").each((index, element) => {
  //  var helper = element.querySelector('i.input-helper')
  //  if (!helper) {
  //    var n = document.createElement('i'); n.classList.add('input-helper')
  //    element.appendChild(n);
  //  }
  //})
}

function setBackground() {
  // Background
  //$("[data-background]").each(function () {
  //  var me = $(this);
  //  me.css({
  //    backgroundImage: 'url(' + me.data('background') + ')'
  //  });
  //});
}

function tooltip() {
  //$('[data-toggle="tooltip"]').tooltip();
}

function fileUpload() {
  //$('.file-upload-browse').each((index, element) => {
  //  element.removeEventListener('click', x => { })
  //  element.addEventListener('click', function () {
  //    var file = $(this).parent().parent().parent().find('.file-upload-default');
  //    file.trigger('click');
  //  })
  //})

  //$('.file-upload-default').each((index, element) => {
  //  element.removeEventListener('change', x => { })
  //  element.addEventListener('change', function () {
  //    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
  //  })
  //})
}
