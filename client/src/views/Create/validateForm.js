import { imageRegex, lettersRegex, urlRegex } from "../../utils/consts";

export function validateForm(formData, errors, setErrors, allPokemons) {
  let newErrors = { ...errors };
  const { name, image, hp, attack, defense, speed, height, weight, type1, type2 } = formData;

  //* Name
  if (!name) newErrors.name = "Name cannot be empty";
  else if (typeof name !== "string") newErrors.name = "Name must be string";
  else if (!lettersRegex.test(name)) newErrors.name = "Name must only contain letters";
  else if (name.length < 4) newErrors.name = "Name is too short";
  else if (allPokemons?.some((element) => element.name === name.trim().toLowerCase()))
    newErrors.name = "Name already in use";
  else newErrors.name = "";

  //* Image
  if (!image) newErrors.image = "Image cannot be empty";
  else if (typeof image !== "string") newErrors.image = "Image must be a string";
  else if (!urlRegex.test(image)) newErrors.image = "Image must be a valid URL";
  else if (!imageRegex.test(image)) newErrors.image = "URL must be a valid image";
  else newErrors.image = "";

  //* HP
  if (!hp) newErrors.hp = "HP cannot be empty";
  else if (!Number.isInteger(Number(hp))) newErrors.hp = "HP must be an integer";
  else if (hp < 0 || hp > 255) newErrors.hp = "HP must be 255 or less";
  else newErrors.hp = "";

  //* Attack
  if (!attack) newErrors.attack = "Attack cannot be empty";
  else if (!Number.isInteger(Number(attack))) newErrors.attack = "Attack must be an integer";
  else if (attack < 0 || attack > 255) newErrors.attack = "Attack must be 255 or less";
  else newErrors.attack = "";

  //* Defense
  if (!defense) newErrors.defense = "Defense cannot be empty";
  else if (!Number.isInteger(Number(defense))) newErrors.defense = "Defense must be an integer";
  else if (defense < 0 || defense > 255) newErrors.defense = "Defense must be 255 or less";
  else newErrors.defense = "";

  //* Speed (Optional)
  if (!Number.isInteger(Number(speed))) newErrors.speed = "Speed must be an integer";
  else if (speed < 0 || speed > 255) newErrors.speed = "Speed must be 255 or less";
  else newErrors.speed = "";

  //* Height (Optional)
  if (!Number.isInteger(Number(height))) newErrors.height = "Height must be an integer";
  else if (height < 0 || height > 14) newErrors.height = "Height must be 14 or less";
  else newErrors.height = "";

  //* Weight (Optional)
  if (!Number.isInteger(Number(weight))) newErrors.weight = "Weight must be an integer";
  else if (weight < 0 || weight > 1000) newErrors.weight = "Weight must be 1000 or less";
  else newErrors.weight = "";

  //* Type 1
  if (!type1) newErrors.type1 = "Type 1 cannot be empty";
  else if (typeof type1 !== "string") newErrors.type1 = "Type 1 must be a string";
  else newErrors.type1 = "";

  //* Type 2 (Optional)
  if (typeof type2 !== "string") newErrors.type2 = "Type 2 must be a string";
  else if (type1 === "unknown" && type2) newErrors.type2 = "Type 2 cannot be set";
  else if (type2 === type1) newErrors.type2 = "Types must be different";
  else newErrors.type2 = "";

  setErrors(newErrors);
}
