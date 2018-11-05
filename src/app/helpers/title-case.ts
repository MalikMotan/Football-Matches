
export function toTitleCase(title) {
  if (title) {
    return title.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  } else {
    return '';
  }
}
