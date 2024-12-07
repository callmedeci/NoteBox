import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export function popup({
  title = <p></p>,
  color,
  iconColor,
  position = "center",
  bgColor = "#18181b",
  showConfirmButton = false,
  showCancelButton = false,
  showCloseButton = true,
  isToast = false,
  icon,
  iconHtml,
  timer,
}) {
  return MySwal.fire({
    title,
    position,
    toast: isToast,
    background: bgColor,

    ...(color && { color }),
    ...(timer && { timer, timerProgressBar: true }),
    ...(icon ? { icon } : iconHtml && { iconHtml: iconHtml }),
    ...(iconColor && { iconColor }),

    allowEscapeKey: true,
    stopKeydownPropagation: true,

    showConfirmButton,
    showCancelButton,
    showCloseButton,

    confirmButtonColor: "#e11d48",
    confirmButtonText: "Yes",

    cancelButtonColor: "#3f3f46",
    cancelButtonText: "No",

    showClass: {
      popup: "swal2-show",
      backdrop: "swal2-backdrop-show",
      icon: "swal2-icon-show",
    },
    hideClass: {
      popup: "swal2-hide",
      backdrop: "swal2-backdrop-hide",
      icon: "swal2-icon-hide",
    },
  });
}
