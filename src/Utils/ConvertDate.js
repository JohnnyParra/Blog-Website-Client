export function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;
  let ext = "";

  if (interval > 1) {
    ext = interval < 2 ? " year" : " years";
    return Math.floor(interval) + ext + " ago";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    ext = interval < 2 ? " month" : " months";
    return Math.floor(interval) + ext + " ago";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    ext = interval < 2 ? " day" : " days";
    return Math.floor(interval) + ext + " ago";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    ext = interval < 2 ? " hour" : " hours";
    return Math.floor(interval) + ext + " ago";
  }
  interval = seconds / 60;
  if (interval > 1) {
    ext = interval < 2 ? " minute" : " minutes";
    return Math.floor(interval) + ext + " ago";
  }
  ext = interval < 2 ? " second" : " seconds";
  return Math.floor(seconds) + ext + " ago";
}
