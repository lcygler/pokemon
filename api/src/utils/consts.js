const API_URL = "https://pokeapi.co/api/v2";

const imageRegex = /\.(jpg|jpeg|png|gif|bmp)$/i;

const urlRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

module.exports = {
  API_URL,
  imageRegex,
  urlRegex,
};
