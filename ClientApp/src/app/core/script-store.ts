/**
 *  The script interface creates a definition of the script tag
 */
interface Script {
  /**
   * An identifiable name for the script
   */
  name: string;

  /**
   * the absolute Url to the script
   */
  src: string;
}

/**
 * An array of external javascript libraries to be referenced in the application dynamically
 */
export const ScriptStore: Script[] = [
  { name: 'settings', src: "assets/js/settings.js" },
  { name: 'todolist', src: "assets/js/todolist.js" },
  { name: 'misc', src: "assets/js/misc.js" },
  { name: 'datetimepicker_b', src: "assets/js/datetimepicker.js" },
  { name: 'dashboard', src: "assets/js/dashboard.js" },
  { name: 'form-controls', src: "assets/js/form-controls.js" },
  { name: 'form-repeater', src: "assets/js/form-repeater.js" },
  { name: 'formpicker', src: "assets/js/formpickers.js" },
  { name: 'bootstrap-notify', src: "assets/vendors/js/bootstrap-notify.js" },
  { name: 'desktop-notification', src: "assets/js/desktop-notification.js" },
  { name: 'toaster', src: "assets/vendors/js/jquery.toast.min.js" },
  { name: 'momentjs', src: "assets/vendors/js/momentjs.js" },
  { name: 'datetimepicker_a', src: "assets/vendors/js/bootstrap-material-datetimepicker.js" },
  { name: 'sweetalert', src: "assets/vendors/js/sweetalert.min.js" },
  { name: 'bootstrap-datepicker', src: "assets/vendors/js/bootstrap-datepicker.min.js" },
  { name: 'jquery-repeater', src: "assets/vendors/js/jquery.repeater.min.js" },
  { name: 'summernote', src: "assets/vendors/js/summernote-bs4.min.js" },

]
