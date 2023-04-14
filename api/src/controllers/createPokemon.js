const { Pokemon } = require("../db.js");

const createPokemon = async (req, res) => {
  try {
    const { name, hp, attack, defense, speed, height, weight, image, types } =
      req.body;

    if (![name, hp, attack, defense, image, types].every(Boolean))
      return res.status(404).send("Necessary parameters not found");

    const pokemonName = name.trim().toLowerCase();
    const pokemonTypes = types.map((element) => element.trim().toLowerCase());

    const newPokemon = await Pokemon.create({
      name: pokemonName,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
    });

    const dbTypes = await Promise.all(
      pokemonTypes.map(async (element) => {
        const [type, created] = await Type.findOrCreate({
          where: { name: element },
        });
        return type;
      })
    );

    await newPokemon.addTypes(dbTypes);

    const createdPokemon = await Pokemon.findOne({
      where: { id: newPokemon.id },
      include: Type,
    });

    res.status(200).json(createdPokemon);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = createPokemon;
