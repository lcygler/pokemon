const lettersRegex = /^[a-zA-Z]+$/;

const urlRegex =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;

function validateForm(formData, errors, setErrors) {
  let newErrors = { ...errors };
  const { name, image, hp, attack, defense, speed, height, weight, type1, type2 } = formData;

  //* Name
  if (!name) newErrors.name = "Name cannot be empty";
  else if (typeof name !== "string") newErrors.name = "Name must be string";
  else if (!lettersRegex.test(name)) newErrors.name = "Name must only contain letters";
  else if (name.length < 5) newErrors.name = "Name must have at least 5 characters";
  else newErrors.name = "";

  //* Image
  if (!image) newErrors.image = "Image cannot be empty";
  else if (typeof image !== "string") newErrors.image = "Image must be string";
  else if (!urlRegex.test(image)) newErrors.image = "Image must be an URL";
  else newErrors.image = "";

  //* HP
  if (!hp) newErrors.hp = "HP cannot be empty";
  else if (!Number.isInteger(parseInt(hp))) newErrors.hp = "HP must be an integer";
  else if (hp < 0 || hp > 255) newErrors.hp = "HP must be a number between 0 and 255";
  else newErrors.hp = "";

  //* Attack
  if (!attack) newErrors.attack = "Attack cannot be empty";
  else if (!Number.isInteger(parseInt(attack))) newErrors.attack = "Attack must be an integer";
  else if (attack < 0 || attack > 255) newErrors.attack = "Attack must be a number between 0 and 255";
  else newErrors.attack = "";

  //* Defense
  if (!defense) newErrors.defense = "Defense cannot be empty";
  else if (!Number.isInteger(parseInt(defense))) newErrors.defense = "Defense must be an integer";
  else if (defense < 0 || defense > 255) newErrors.defense = "Defense must be a number between 0 and 255";
  else newErrors.defense = "";

  //* Speed (Optional)
  if (speed) {
    if (!Number.isInteger(parseInt(speed))) newErrors.speed = "Speed must be an integer";
    else if (speed < 0 || speed > 255) newErrors.speed = "Speed must be a number between 0 and 255";
    else newErrors.speed = "";
  }

  //* Height (Optional)
  if (height) {
    if (!Number.isInteger(parseInt(height))) newErrors.height = "Height must be an integer";
    else if (height < 1 || height > 14) newErrors.height = "Height must be a number between 1 and 14";
    else newErrors.height = "";
  }

  //* Weight (Optional)
  if (weight) {
    if (!Number.isInteger(parseInt(weight))) newErrors.weight = "Weight must be an integer";
    else if (weight < 1 || weight > 999) newErrors.weight = "Weight must be a number between 1 and 999";
    else newErrors.weight = "";
  }

  //* Type 1
  if (!type1) newErrors.type1 = "Type cannot be empty";
  else if (typeof type1 !== "string") newErrors.type1 = "Type must be string";
  else newErrors.type1 = "";

  //* Type 2 (Optional)
  if (type2) {
    if (typeof type2 !== "string") newErrors.type2 = "Type must be string";
    else newErrors.type2 = "";
  }

  setErrors(newErrors);
}

module.exports = { validateForm };
