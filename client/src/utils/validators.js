const uuidRegex = /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[8|9|aA|bB][a-f0-9]{3}-[a-f0-9]{12}$/;

function isUUID(str) {
  return uuidRegex.test(str);
}

module.exports = {
  isUUID,
};
