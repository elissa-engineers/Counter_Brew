
export const drinks = [
  {
    id: "moka-espresso",
    name: "Moka Pot Coffee",
    brewMethod: "moka pot",
    temp: "hot",
    milk: "none",
    sweetness: "none",
    strength: "strong",
    equipment: ["moka pot", "stove", "grinder"],
    method: [
      "Fill the base with hot water to just below the safety valve.",
      "Fill the basket with fine-sand-grind coffee, leveled but not tamped.",
      "Assemble and set on medium-low heat with the lid open.",
      "Pull it off the heat the moment it starts to gurgle, then pour."
    ],
    notes: "The little stovetop workhorse behind half the drinks on this site. It runs at far lower pressure than a real espresso machine, so it isn't technically espresso, but the cup it pulls is strong and concentrated enough to stand in for one. Drink it short and intense, or loosen it with hot water."
  },
  {
    id: "home-latte",
    name: "Latte",
    brewMethod: "moka pot",
    temp: "hot",
    milk: "steamed milk",
    sweetness: "none",
    strength: "medium",
    equipment: ["moka pot", "milk frother"],
    method: [
      "Brew a moka pot shot.",
      "Warm and lightly froth your milk (a handheld frother is plenty).",
      "Pour roughly three parts milk to one part coffee.",
      "Finish with a thin layer of foam on top."
    ],
    notes: "The mildest of the moka milk drinks — lots of milk, a small coffee backbone, barely any foam. If you want something gentle and creamy first thing in the morning, this is it."
  },
  {
    id: "home-cappuccino",
    name: "Cappuccino",
    brewMethod: "moka pot",
    temp: "hot",
    milk: "frothed milk",
    sweetness: "none",
    strength: "medium",
    equipment: ["moka pot", "milk frother"],
    method: [
      "Brew a moka pot shot into a cup.",
      "Froth your milk until it roughly doubles in volume.",
      "Add about equal parts steamed milk and pour the foam on top.",
      "Aim for a thick foam cap — that's the signature."
    ],
    notes: "Think of it as the cappuccino's classic balance: roughly a third coffee, a third milk, a third foam. More foam and more coffee presence than a latte, so the espresso character actually comes through."
  },
  {
    id: "home-cortado",
    name: "Cortado",
    brewMethod: "moka pot",
    temp: "hot",
    milk: "warm milk",
    sweetness: "none",
    strength: "strong",
    equipment: ["moka pot", "small glass"],
    method: [
      "Brew a moka pot shot.",
      "Warm a small amount of milk — no big foam needed.",
      "Cut the coffee with milk at about a 1:1 ratio.",
      "Serve small, in a glass if you have one."
    ],
    notes: "Spanish in spirit: a short shot 'cut' with just enough warm milk to soften it. It uses the least milk of the three, which makes it the strongest-tasting — the cup for people who find a latte too dilute."
  },
  {
    id: "iced-mocha",
    name: "Iced Mocha",
    brewMethod: "moka pot",
    temp: "iced",
    milk: "cold milk",
    sweetness: "sweet",
    strength: "medium",
    equipment: ["moka pot", "tall glass"],
    method: [
      "Stir chocolate syrup or cocoa into your hot moka shot until it dissolves.",
      "Fill a tall glass with ice and cold milk.",
      "Pour the chocolate coffee over the top.",
      "Stir before drinking."
    ],
    notes: "The dessert of the bunch — coffee, chocolate, and cold milk over ice. Sweet and easy-going, and a good gateway drink for anyone who claims they don't like coffee."
  },
  {
    id: "french-press",
    name: "French Press Coffee",
    brewMethod: "french press",
    temp: "hot",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["french press", "kettle", "grinder"],
    method: [
      "Add coarse grounds at roughly a 1:15 coffee-to-water ratio.",
      "Pour water just off the boil and give it a gentle stir.",
      "Steep for about four minutes.",
      "Press the plunger down slowly and pour."
    ],
    notes: "Just about the most forgiving brew there is — coarse grind, four-minute steep, plunge, done. The metal mesh lets the oils through, so the cup comes out full-bodied and round rather than crisp. Hard to mess up, which is exactly why it's a staple."
  },
  {
    id: "cafe-au-lait",
    name: "Café au Lait",
    brewMethod: "french press",
    temp: "hot",
    milk: "scalded milk",
    sweetness: "none",
    strength: "medium",
    equipment: ["french press", "saucepan"],
    method: [
      "Brew a strong French press coffee.",
      "Heat milk in a small pan until it's almost scalding — don't let it boil.",
      "Combine equal parts coffee and hot milk.",
      "Skip the sugar; traditionally it's served plain."
    ],
    notes: "The French breakfast classic: equal parts strong brewed coffee and hot milk, with no foam to speak of. It's lighter than a latte and made for dunking a croissant. New Orleans does its own chicory-spiked version, if you ever want the variation."
  },
  {
    id: "cold-foam-coffee",
    name: "Cold-Foam Coffee",
    brewMethod: "french press",
    temp: "iced",
    milk: "cold foam",
    sweetness: "low",
    strength: "medium",
    equipment: ["french press", "tall glass"],
    method: [
      "Brew coffee and chill it, or use leftover cold coffee over ice.",
      "Add cold milk to a clean French press and pump the plunger fast for 20–30 seconds.",
      "Pour the airy cold foam over the iced coffee.",
      "Sip through the foam, or stir it in."
    ],
    notes: "A neat trick most people don't realize the French press can do: pump cold milk and it whips into a light, sweet foam with zero special gear. Floated over iced coffee, it's the café cold-foam drink for nothing."
  },
  {
    id: "pour-over",
    name: "Pour-Over",
    brewMethod: "pour-over",
    temp: "hot",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["v60 dripper", "paper filter", "kettle", "scale"],
    method: [
      "Rinse the paper filter and add medium-fine grounds (about 1:16).",
      "Pour a little water to wet the grounds and let them bloom for 30 seconds.",
      "Pour the rest slowly in circles over 2–3 minutes.",
      "Let it finish dripping, then serve."
    ],
    notes: "The control freak's brew, in the best way — grind, water temperature, and pour rate are all yours to dial in. The paper filter traps the oils and fines, so the cup is clean and bright, the opposite of a French press. It rewards attention and single-origin beans."
  },
  {
    id: "japanese-iced",
    name: "Japanese Iced Coffee",
    brewMethod: "pour-over",
    temp: "iced",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["v60 dripper", "paper filter", "carafe"],
    method: [
      "Put part of your brew water as ice directly in the carafe below the dripper.",
      "Brew a pour-over as normal over the ice, using a roughly 1:16 total ratio split between hot water and ice.",
      "The hot coffee melts and locks in the aromatics instantly.",
      "Swirl and serve over fresh ice."
    ],
    notes: "Also called flash brew: you brew hot straight onto ice so it chills the second it's made. Unlike cold brew, the hot extraction keeps all the bright, aromatic, fruity notes — it's the iced coffee to make when you want personality, not just smoothness, and you want it now."
  },
  {
    id: "ca-phe-sua-da",
    name: "Cà Phê Sữa Đá (Vietnamese)",
    brewMethod: "pour-over",
    temp: "iced",
    milk: "sweetened condensed milk",
    sweetness: "sweet",
    strength: "strong",
    equipment: ["phin filter", "tall glass"],
    method: [
      "Spoon sweetened condensed milk into the bottom of a cup.",
      "Set a phin filter on top, add fine-ground dark roast, and bloom with a splash of hot water.",
      "Top up with hot water and let it drip slowly (4–8 minutes).",
      "Stir the concentrate into the milk, then pour over a tall glass of ice."
    ],
    notes: "Vietnamese iced coffee, built around the little metal phin drip filter and a layer of sweetened condensed milk. Traditionally it's strong dark robusta, and the slow drip pulls a thick, almost syrupy concentrate — the bitterness and the sweet milk are made for each other. (Filed under drip/pour-over since the phin is a gravity drip method.)"
  },
  {
    id: "aeropress",
    name: "AeroPress Coffee",
    brewMethod: "pour-over",
    temp: "hot",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["aeropress", "paper filter", "kettle"],
    method: [
      "Rinse the filter, add fine-medium grounds, and pour in hot water.",
      "Stir for about ten seconds.",
      "Steep for roughly two minutes.",
      "Press down slowly and evenly through the filter."
    ],
    notes: "Part immersion brewer, part syringe — fast, nearly foolproof, and easy to clean, which is why travelers swear by it. Pressed short it makes a concentrated, almost espresso-ish cup you can drink straight or stretch with hot water."
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    brewMethod: "cold steep",
    temp: "iced",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["jar", "strainer"],
    method: [
      "Combine coarse grounds and cold water at about 1:8 in a jar.",
      "Steep in the fridge for 12–24 hours.",
      "Strain out the grounds.",
      "Serve over ice; keeps about a week."
    ],
    notes: "No heat at all — just coarse grounds and cold water left to steep overnight. Skipping the heat skips most of the acidity and bitterness, so it comes out smooth, mellow, and naturally a little sweet. It's a concentrate, so most people cut it with water or milk."
  },
  {
    id: "cold-brew-latte",
    name: "Cold Brew Latte",
    brewMethod: "cold steep",
    temp: "iced",
    milk: "cold milk",
    sweetness: "low",
    strength: "medium",
    equipment: ["jar", "tall glass"],
    method: [
      "Make cold brew concentrate as above.",
      "Fill a glass with ice.",
      "Pour in cold brew, then top with cold milk to taste.",
      "Add a touch of syrup if you want it sweet."
    ],
    notes: "Cold brew's smooth, low-acid base softened further with cold milk. Because the brew itself isn't bitter, you need very little sweetness — a lightly sweet, very easy-drinking summer cup."
  },
  {
    id: "shaken-cold-brew",
    name: "Shaken Cold Brew",
    brewMethod: "cold steep",
    temp: "iced",
    milk: "none",
    sweetness: "none",
    strength: "medium",
    equipment: ["jar", "cocktail shaker or sealed jar"],
    method: [
      "Pour chilled cold brew into a shaker or sealed jar.",
      "Add a few ice cubes.",
      "Shake hard for 20–30 seconds.",
      "Pour, foam and all, over fresh ice."
    ],
    notes: "The home stand-in for nitro: real nitro needs a nitrogen charger, but a hard shake whips a surprising amount of fine foam into cold brew and gives you that creamy, cascading head — no special equipment, just elbow grease."
  },
  {
    id: "turkish-coffee",
    name: "Turkish Coffee",
    brewMethod: "boiled",
    temp: "hot",
    milk: "none",
    sweetness: "low",
    strength: "strong",
    equipment: ["cezve", "stove"],
    method: [
      "Measure cold water with your serving cup into the cezve.",
      "Add one heaped teaspoon of powder-fine coffee per cup, plus sugar now if you want it.",
      "Heat very slowly on low — never a rolling boil.",
      "When a thick foam rises to the rim, take it off, pour grounds and all, and let it settle."
    ],
    notes: "One of the oldest brewing methods still in daily use, recognized by UNESCO as cultural heritage. The coffee is ground to a powder and simmered unfiltered in a long-handled pot called a cezve, so the grounds settle at the bottom of the cup. Sugar goes in during brewing, never after — and don't drink the last sip. (Greek coffee is the same drink under a different name.)"
  },
  {
    id: "cafe-con-leche",
    name: "Café con Leche",
    brewMethod: "boiled",
    temp: "hot",
    milk: "scalded milk",
    sweetness: "low",
    strength: "medium",
    equipment: ["stovetop coffee", "saucepan"],
    method: [
      "Brew a strong, dark coffee.",
      "Scald milk in a pan until hot but not boiling.",
      "Combine roughly equal parts coffee and milk.",
      "Sweeten lightly — that's what sets it apart from a café au lait."
    ],
    notes: "Spain's milky morning coffee — strong dark coffee and scalded milk in about equal measure, usually with a little sugar. Close cousin to the French café au lait, just sweeter, and often served with the milk on the side so you can pour to taste."
  },
  {
    id: "greek-frappe",
    name: "Greek Frappé",
    brewMethod: "instant/whisked",
    temp: "iced",
    milk: "none",
    sweetness: "low",
    strength: "medium",
    equipment: ["cocktail shaker or sealed jar", "tall glass"],
    method: [
      "Add instant coffee, a little cold water, and sugar to a shaker.",
      "Shake hard until a thick light-brown foam forms.",
      "Pour over a glass of ice.",
      "Top with cold water and a splash of milk if you like."
    ],
    notes: "The original whipped coffee, invented by accident in Thessaloniki in the 1950s when someone couldn't find hot water for their instant. It only works with instant coffee — the spray-dried granules are what foam up when shaken. A Greek and Cypriot summer institution, sipped slowly for hours."
  },
  {
    id: "dalgona",
    name: "Dalgona (Whipped) Coffee",
    brewMethod: "instant/whisked",
    temp: "iced",
    milk: "cold milk",
    sweetness: "sweet",
    strength: "medium",
    equipment: ["bowl", "whisk or hand mixer", "tall glass"],
    method: [
      "Combine equal parts instant coffee, sugar, and hot water in a bowl.",
      "Whip until it turns thick, glossy, and holds soft peaks.",
      "Fill a glass with ice and cold milk.",
      "Spoon the whipped coffee on top, then stir to combine."
    ],
    notes: "The one that took over everyone's feed in 2020 — a cloud of whipped coffee floated on cold milk. Same instant-coffee chemistry as the Greek frappé, just whipped stiff instead of shaken loose, and built on a base of milk rather than water. Sweeter and more dessert-like for it."
  },
  {
    id: "bulletproof",
    name: "Bulletproof-Style Coffee",
    brewMethod: "instant/whisked",
    temp: "hot",
    milk: "blended butter & MCT oil",
    sweetness: "none",
    strength: "strong",
    equipment: ["blender", "any coffee brewer"],
    method: [
      "Brew a strong cup of hot coffee (a moka pot works well).",
      "Add a spoon of unsalted butter and a spoon of MCT or coconut oil.",
      "Blend for 20–30 seconds until frothy and emulsified.",
      "Drink right away, while it's still creamy."
    ],
    notes: "Popularized in the early 2010s and loosely inspired by Tibetan yak-butter tea: hot coffee blended with butter and MCT oil until it goes latte-creamy, with no milk at all. The blending is what defines it — skip it and you just get oily coffee. An acquired taste, but its fans are devoted."
  }
];