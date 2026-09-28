/*
 * Resort and restaurant data for the Disney World Match quiz.
 *
 * This is the file you edit to change recommendations. Menus, prices and
 * character lineups change often, so review it before each season.
 *
 * Resort fields
 *   tier         value | moderate | deluxe | villa
 *   sleeps       max guests in a standard room
 *   suiteSleeps  max guests in the largest suite/villa option (0 if none)
 *   transport    ways to reach parks besides buses: monorail, skyliner, boat, walk
 *   parks        ease of access, 1 (bus only) to 3 (walk, monorail or one short ride)
 *   access       optional reason text shown when a park the guest picked is easy to reach
 *   vibes        tropical, rustic, elegant, playful, nature, lively, quiet, modern
 *   pool         1 (basic) to 3 (standout)
 *   goodFor      young-kids, kids, teens, adults, grandparents
 *
 * Restaurant fields
 *   kind         character | table | signature | quick
 *   family       true for buffets and family-style platters
 *   price        1 ($ under $15) to 4 ($$$$ over $60) per adult
 *   credits      Disney Dining Plan table-service credits, if not the default
 *                (signature restaurants default to 2, everything else to 1)
 *   plan         set to false if the restaurant doesn't accept the dining plan
 *   chars        who appears, for character meals
 *   themes       princess, classic, pixar, starwars, animals
 *   picky / adv  0 to 2: how well it suits picky or adventurous eaters
 *   kids / adults 0 to 2: how well it suits kids, or an adults-only group
 *   celebrate    birthday, anniversary, first
 *   park         mk, epcot, hs, ak, springs, or resort (then set `resort` to a resort id)
 */
window.PT_DATA = {
  resorts: [
    {
      id: "all-star", name: "All-Star Resorts", sub: "Movies, Music & Sports",
      tier: "value", sleeps: 4, suiteSleeps: 6, suiteLabel: "Family suites at All-Star Music",
      transport: [], parks: { mk: 1, epcot: 1, hs: 1, ak: 2 },
      vibes: ["playful"], pool: 1, goodFor: ["young-kids", "kids"],
      blurb: "Giant icons from Disney films, music and sports. The lowest room rates on property, and family suites at All-Star Music sleep six."
    },
    {
      id: "pop", name: "Pop Century", sub: "Value resort",
      tier: "value", sleeps: 4, suiteSleeps: 0,
      transport: ["skyliner"], parks: { mk: 1, epcot: 2, hs: 2, ak: 1 },
      access: { epcot: "Skyliner gondola to EPCOT", hs: "Skyliner gondola to Hollywood Studios" },
      vibes: ["playful"], pool: 1, goodFor: ["kids", "teens", "adults"],
      blurb: "Decade-themed icons from the 1950s through the 1990s, with a Skyliner station for gondola rides to EPCOT and Hollywood Studios."
    },
    {
      id: "aoa", name: "Art of Animation", sub: "Value resort",
      tier: "value", sleeps: 4, suiteSleeps: 6, suiteLabel: "Family suites",
      transport: ["skyliner"], parks: { mk: 1, epcot: 2, hs: 2, ak: 1 },
      access: { epcot: "Skyliner gondola to EPCOT", hs: "Skyliner gondola to Hollywood Studios" },
      vibes: ["playful"], pool: 2, poolNote: "The Big Blue Pool, the largest on property",
      goodFor: ["young-kids", "kids"],
      blurb: "Life-size scenes from Cars, Finding Nemo, The Lion King and The Little Mermaid. Family suites sleep six and have two bathrooms."
    },
    {
      id: "cbr", name: "Caribbean Beach", sub: "Moderate resort",
      tier: "moderate", sleeps: 5, suiteSleeps: 0,
      transport: ["skyliner"], parks: { mk: 1, epcot: 2, hs: 2, ak: 1 },
      access: { epcot: "Skyliner gondola to EPCOT", hs: "Skyliner gondola to Hollywood Studios" },
      vibes: ["tropical", "playful"], pool: 2, goodFor: ["kids", "teens", "grandparents"],
      blurb: "Colorful island villages around a lake, and the central hub of the Skyliner. Many rooms sleep five."
    },
    {
      id: "coronado", name: "Coronado Springs", sub: "Moderate resort",
      tier: "moderate", sleeps: 4, suiteSleeps: 0,
      transport: [], parks: { mk: 1, epcot: 1, hs: 1, ak: 2 },
      vibes: ["lively", "elegant"], pool: 2, goodFor: ["teens", "adults"],
      blurb: "A Spanish and Mexican-inspired resort around a lake, with the Gran Destino Tower, the rooftop Toledo restaurant and a Mayan pyramid pool."
    },
    {
      id: "pofq", name: "Port Orleans French Quarter", sub: "Moderate resort",
      tier: "moderate", sleeps: 4, suiteSleeps: 0,
      transport: ["boat"], parks: { mk: 1, epcot: 1, hs: 1, ak: 1 },
      vibes: ["quiet", "elegant"], pool: 2, goodFor: ["adults", "young-kids"],
      blurb: "A small, quiet New Orleans-style resort with beignets at the food court and a riverboat to Disney Springs."
    },
    {
      id: "por", name: "Port Orleans Riverside", sub: "Moderate resort",
      tier: "moderate", sleeps: 5, suiteSleeps: 0,
      transport: ["boat"], parks: { mk: 1, epcot: 1, hs: 1, ak: 1 },
      vibes: ["rustic", "quiet"], pool: 2, goodFor: ["kids", "grandparents"],
      blurb: "Southern mansions and bayou buildings along the river, with a riverboat to Disney Springs. Royal Guest Rooms and Alligator Bayou rooms sleep five."
    },
    {
      id: "contemporary", name: "Contemporary", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 5, suiteSleeps: 0,
      transport: ["monorail", "walk"], parks: { mk: 3, epcot: 2, hs: 1, ak: 1 },
      access: { mk: "Walk or take the monorail to Magic Kingdom", epcot: "Monorail to EPCOT with one transfer" },
      vibes: ["modern", "lively"], pool: 2, goodFor: ["young-kids", "kids", "teens", "adults", "grandparents"],
      blurb: "A 10-minute walk to Magic Kingdom, with the monorail running right through the building. Home of California Grill and Chef Mickey's."
    },
    {
      id: "poly", name: "Polynesian Village", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 5, suiteSleeps: 0,
      transport: ["monorail", "boat"], parks: { mk: 3, epcot: 2, hs: 1, ak: 1 },
      access: { mk: "Monorail or boat to Magic Kingdom", epcot: "Walk to the EPCOT monorail" },
      vibes: ["tropical", "lively"], pool: 3, poolNote: "Volcano pool with a waterslide",
      goodFor: ["young-kids", "kids", "grandparents"],
      blurb: "South Pacific theming on the Seven Seas Lagoon, Dole Whip on site, and Magic Kingdom fireworks from the beach."
    },
    {
      id: "gf", name: "Grand Floridian", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 5, suiteSleeps: 0,
      transport: ["monorail", "boat"], parks: { mk: 3, epcot: 2, hs: 1, ak: 1 },
      access: { mk: "One monorail stop to Magic Kingdom", epcot: "Monorail to EPCOT with one transfer" },
      vibes: ["elegant", "quiet"], pool: 3, poolNote: "Alice in Wonderland splash area and beach pool",
      goodFor: ["young-kids", "adults", "grandparents"],
      blurb: "Disney's flagship Victorian-style resort. One monorail stop from Magic Kingdom, with 1900 Park Fare and Victoria & Albert's."
    },
    {
      id: "wl", name: "Wilderness Lodge", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 4, suiteSleeps: 8, suiteLabel: "Boulder Ridge and Copper Creek villas",
      transport: ["boat"], parks: { mk: 2, epcot: 1, hs: 1, ak: 1 },
      access: { mk: "Boat to Magic Kingdom" },
      vibes: ["rustic", "nature", "quiet"], pool: 3, poolNote: "Hot-spring-style pool beside an erupting geyser",
      goodFor: ["kids", "adults", "grandparents"],
      blurb: "A Pacific Northwest national-park lodge with its own geyser, a towering lobby and a boat to Magic Kingdom."
    },
    {
      id: "beach-yacht", name: "Beach Club & Yacht Club", sub: "Deluxe resorts",
      tier: "deluxe", sleeps: 5, suiteSleeps: 0,
      transport: ["walk", "boat", "skyliner"], parks: { mk: 1, epcot: 3, hs: 3, ak: 1 },
      access: { epcot: "Walk to EPCOT's International Gateway", hs: "Boat or walking path to Hollywood Studios" },
      vibes: ["elegant", "playful"], pool: 3, poolNote: "Stormalong Bay, a sand-bottom pool with a shipwreck slide",
      goodFor: ["kids", "teens", "adults", "grandparents"],
      blurb: "New England seaside resorts on Crescent Lake. Walk to EPCOT, boat to Hollywood Studios, and swim in the best pool at Disney World."
    },
    {
      id: "boardwalk", name: "BoardWalk Inn", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 4, suiteSleeps: 9, suiteLabel: "BoardWalk Villas",
      transport: ["walk", "boat", "skyliner"], parks: { mk: 1, epcot: 3, hs: 3, ak: 1 },
      access: { epcot: "Walk to EPCOT's International Gateway", hs: "Boat or walking path to Hollywood Studios" },
      vibes: ["lively"], pool: 2, goodFor: ["teens", "adults"],
      blurb: "A 1930s Atlantic City boardwalk with street performers, a dueling-piano bar and evening strolls. Walk to EPCOT or Hollywood Studios."
    },
    {
      id: "akl", name: "Animal Kingdom Lodge", sub: "Deluxe resort",
      tier: "deluxe", sleeps: 4, suiteSleeps: 8, suiteLabel: "Kidani Village villas",
      transport: [], parks: { mk: 1, epcot: 1, hs: 1, ak: 2 },
      access: { ak: "A short bus ride to Animal Kingdom" },
      vibes: ["nature", "quiet"], pool: 2, goodFor: ["young-kids", "kids", "adults", "grandparents"],
      blurb: "Savanna-view rooms where giraffes and zebras wander past your balcony. Home of Jiko, Boma and Sanaa."
    },
    {
      id: "riviera", name: "Riviera Resort", sub: "Disney Vacation Club villas",
      tier: "villa", sleeps: 5, suiteSleeps: 9, suiteLabel: "One- and two-bedroom villas",
      transport: ["skyliner"], parks: { mk: 1, epcot: 2, hs: 2, ak: 1 },
      access: { epcot: "Skyliner gondola to EPCOT", hs: "Skyliner gondola to Hollywood Studios" },
      vibes: ["elegant", "quiet"], pool: 2, goodFor: ["adults", "grandparents"],
      blurb: "European Riviera-inspired villas with kitchens, its own Skyliner station, and Topolino's Terrace on the rooftop."
    },
    {
      id: "cabins", name: "Cabins at Fort Wilderness", sub: "Disney Vacation Club cabins",
      tier: "villa", sleeps: 6, suiteSleeps: 0,
      transport: ["boat"], parks: { mk: 2, epcot: 1, hs: 1, ak: 1 },
      access: { mk: "Boat to Magic Kingdom" },
      vibes: ["rustic", "nature"], pool: 2, goodFor: ["kids", "grandparents"],
      blurb: "Standalone cabins in the pines that sleep six, with a full kitchen, a private deck and a boat to Magic Kingdom."
    },
    {
      id: "saratoga", name: "Saratoga Springs", sub: "Disney Vacation Club villas",
      tier: "villa", sleeps: 4, suiteSleeps: 8, suiteLabel: "One- and two-bedroom villas",
      transport: ["boat"], parks: { mk: 1, epcot: 1, hs: 1, ak: 1 },
      vibes: ["quiet", "elegant"], pool: 2, goodFor: ["adults", "grandparents"],
      blurb: "Upstate New York spa-town villas with a walkway and boat to Disney Springs. Kitchens and extra space for bigger groups."
    }
  ],

  restaurants: [
    // Magic Kingdom
    { id: "crt", name: "Cinderella's Royal Table", where: "Magic Kingdom", park: "mk",
      kind: "character", price: 4, credits: 2, chars: "Cinderella and other princesses",
      themes: ["princess"], picky: 1, adv: 0, kids: 2, adults: 0, celebrate: ["first", "birthday"],
      note: "Dine inside Cinderella Castle. Fixed price, and it books up fast." },
    { id: "bog", name: "Be Our Guest", where: "Magic Kingdom", park: "mk",
      kind: "table", price: 4, themes: ["princess"], picky: 1, adv: 1, kids: 1, adults: 1, celebrate: ["first", "anniversary"],
      note: "Dine in the Beast's castle ballroom. The Beast often makes an appearance." },
    { id: "crystal", name: "The Crystal Palace", where: "Magic Kingdom", park: "mk",
      kind: "character", family: true, price: 3, chars: "Winnie the Pooh, Tigger, Eeyore and Piglet",
      themes: ["classic"], picky: 2, adv: 0, kids: 2, adults: 0,
      note: "Buffet in a bright Victorian glass conservatory." },
    { id: "skipper", name: "Jungle Navigation Co. Skipper Canteen", where: "Magic Kingdom", park: "mk",
      kind: "table", price: 3, themes: ["animals"], picky: 1, adv: 2, kids: 1, adults: 1,
      note: "Jungle Cruise skippers serve bad puns alongside globally inspired dishes." },
    { id: "liberty", name: "Liberty Tree Tavern", where: "Magic Kingdom", park: "mk",
      kind: "table", family: true, price: 3, picky: 2, adv: 0, kids: 1, adults: 1,
      note: "An all-you-care-to-enjoy Thanksgiving-style feast served family-style." },
    { id: "columbia", name: "Columbia Harbour House", where: "Magic Kingdom", park: "mk",
      kind: "quick", price: 1, picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Fish and shrimp baskets and chicken nuggets, with quiet seating upstairs." },

    // Resort restaurants
    { id: "chefmickey", name: "Chef Mickey's", where: "Contemporary", park: "resort", resort: "contemporary",
      kind: "character", family: true, price: 3, chars: "Mickey, Minnie, Donald, Goofy and Pluto",
      themes: ["classic"], picky: 2, adv: 0, kids: 2, adults: 0,
      note: "A lively buffet with the monorail gliding overhead." },
    { id: "cagrill", name: "California Grill", where: "Contemporary", park: "resort", resort: "contemporary",
      kind: "signature", price: 4, picky: 0, adv: 1, kids: 0, adults: 2, celebrate: ["anniversary"],
      note: "Top-floor dining with Magic Kingdom fireworks viewing from the observation deck." },
    { id: "ohana", name: "'Ohana", where: "Polynesian Village", park: "resort", resort: "poly",
      kind: "character", family: true, price: 3, chars: "Breakfast only: Lilo, Stitch, Mickey and Pluto",
      themes: ["classic"], picky: 2, adv: 1, kids: 2, adults: 1,
      note: "Family-style skewers, noodles and bread pudding at dinner." },
    { id: "kona", name: "Kona Cafe", where: "Polynesian Village", park: "resort", resort: "poly",
      kind: "table", price: 2, picky: 1, adv: 1, kids: 1, adults: 1,
      note: "Famous for Tonga Toast at breakfast and Pan-Asian dishes later in the day." },
    { id: "parkfare", name: "1900 Park Fare", where: "Grand Floridian", park: "resort", resort: "gf",
      kind: "character", family: true, price: 3, chars: "Cinderella, her stepfamily and friends (lineup varies by meal)",
      themes: ["princess", "classic"], picky: 2, adv: 0, kids: 2, adults: 0, celebrate: ["first", "birthday"],
      note: "Buffet in a bright Victorian dining room." },
    { id: "vanda", name: "Victoria & Albert's", where: "Grand Floridian", park: "resort", resort: "gf",
      kind: "signature", price: 4, plan: false, picky: 0, adv: 2, kids: 0, adults: 2, minAge: 10, celebrate: ["anniversary"],
      note: "A multi-course tasting menu and Disney's most formal dining. Guests must be 10 or older." },
    { id: "storybook", name: "Story Book Dining at Artist Point", where: "Wilderness Lodge", park: "resort", resort: "wl",
      kind: "character", price: 4, chars: "Snow White, Dopey, Grumpy and the Evil Queen",
      themes: ["princess"], picky: 1, adv: 1, kids: 1, adults: 1,
      note: "Dinner only, with a fixed-price menu inspired by the enchanted forest." },
    { id: "capemay", name: "Cape May Cafe", where: "Beach Club", park: "resort", resort: "beach-yacht",
      kind: "character", family: true, price: 3, chars: "Breakfast: Minnie, Daisy, Donald and Goofy in beachwear",
      themes: ["classic"], picky: 2, adv: 0, kids: 2, adults: 0,
      note: "A relaxed character breakfast that is easier to book than in-park options." },
    { id: "beaches", name: "Beaches & Cream Soda Shop", where: "Beach Club", park: "resort", resort: "beach-yacht",
      kind: "table", price: 2, picky: 2, adv: 0, kids: 2, adults: 1, celebrate: ["birthday"],
      note: "Burgers, shakes and the Kitchen Sink sundae for the whole table." },
    { id: "topolino", name: "Topolino's Terrace", where: "Riviera Resort", park: "resort", resort: "riviera",
      kind: "character", price: 4, chars: "Breakfast: Mickey, Minnie, Donald and Daisy in artist outfits",
      themes: ["classic"], picky: 1, adv: 1, kids: 1, adults: 2, celebrate: ["anniversary"],
      note: "Rooftop views. Character breakfast in the morning, Italian-inspired signature dinner at night." },
    { id: "boma", name: "Boma – Flavors of Africa", where: "Animal Kingdom Lodge", park: "resort", resort: "akl",
      kind: "table", family: true, price: 3, themes: ["animals"], picky: 1, adv: 2, kids: 1, adults: 1,
      note: "A buffet of African-inspired dishes next to familiar favorites." },
    { id: "jiko", name: "Jiko – The Cooking Place", where: "Animal Kingdom Lodge", park: "resort", resort: "akl",
      kind: "signature", price: 4, themes: ["animals"], picky: 0, adv: 2, kids: 0, adults: 2, celebrate: ["anniversary"],
      note: "African-inspired signature dining with an award-winning South African wine list." },
    { id: "sanaa", name: "Sanaa", where: "Animal Kingdom Lodge – Kidani Village", park: "resort", resort: "akl",
      kind: "table", price: 2, themes: ["animals"], picky: 1, adv: 2, kids: 1, adults: 2,
      note: "Indian-inspired dishes with savanna views. Order the bread service." },
    { id: "toledo", name: "Toledo – Tapas, Steak & Seafood", where: "Coronado Springs", park: "resort", resort: "coronado",
      kind: "signature", price: 4, picky: 0, adv: 1, kids: 0, adults: 2, celebrate: ["anniversary"],
      note: "Rooftop Spanish-inspired dining on top of the Gran Destino Tower." },

    // EPCOT
    { id: "akershus", name: "Akershus Royal Banquet Hall", where: "EPCOT – Norway", park: "epcot",
      kind: "character", family: true, price: 3, chars: "Belle, Ariel, Snow White and other princesses (lineup varies)",
      themes: ["princess"], picky: 1, adv: 1, kids: 2, adults: 0, celebrate: ["first", "birthday"],
      note: "Princess dining that is usually easier to book than Cinderella's Royal Table." },
    { id: "gardengrill", name: "Garden Grill", where: "EPCOT – The Land", park: "epcot",
      kind: "character", family: true, price: 3, chars: "Chip, Dale, Mickey and Pluto in farm outfits",
      themes: ["classic"], picky: 2, adv: 0, kids: 2, adults: 1,
      note: "A slowly rotating dining room that passes scenes from Living with the Land." },
    { id: "space220", name: "Space 220", where: "EPCOT – Mission: SPACE", park: "epcot",
      kind: "signature", price: 4, themes: ["starwars"], picky: 1, adv: 1, kids: 2, adults: 1, celebrate: ["birthday"],
      note: "Ride a space elevator to a dining room with a view of Earth from orbit." },
    { id: "lecellier", name: "Le Cellier Steakhouse", where: "EPCOT – Canada", park: "epcot",
      kind: "signature", price: 4, picky: 1, adv: 1, kids: 0, adults: 2, celebrate: ["anniversary"],
      note: "Filet mignon and cheddar cheese soup in a cozy stone wine cellar." },
    { id: "vianapoli", name: "Via Napoli", where: "EPCOT – Italy", park: "epcot",
      kind: "table", price: 3, picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Wood-fired Neapolitan pizza, including a half-meter pizza for the table." },
    { id: "teppan", name: "Teppan Edo", where: "EPCOT – Japan", park: "epcot",
      kind: "table", price: 3, picky: 2, adv: 1, kids: 2, adults: 1, celebrate: ["birthday"],
      note: "Hibachi chefs cook at your table. Great for teens." },
    { id: "regaleagle", name: "Regal Eagle Smokehouse", where: "EPCOT – The American Adventure", park: "epcot",
      kind: "quick", price: 2, picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Barbecue from around the country, with a fixin's bar." },

    // Hollywood Studios
    { id: "hollywoodvine", name: "Hollywood & Vine", where: "Hollywood Studios", park: "hs",
      kind: "character", family: true, price: 3, chars: "Disney Junior pals at breakfast; Minnie and friends at dinner",
      themes: ["classic"], picky: 2, adv: 0, kids: 2, adults: 0,
      note: "Buffet with seasonal themes at dinner." },
    { id: "scifi", name: "Sci-Fi Dine-In Theater", where: "Hollywood Studios", park: "hs",
      kind: "table", price: 3, themes: ["starwars"], picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Eat in a vintage car at a drive-in while old sci-fi trailers play." },
    { id: "primetime", name: "50's Prime Time Cafe", where: "Hollywood Studios", park: "hs",
      kind: "table", price: 3, picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Comfort food in a 1950s kitchen, where your server makes sure you finish your vegetables." },
    { id: "brownderby", name: "The Hollywood Brown Derby", where: "Hollywood Studios", park: "hs",
      kind: "signature", price: 4, picky: 1, adv: 1, kids: 0, adults: 2, celebrate: ["anniversary"],
      note: "Old Hollywood glamour and the original Cobb salad." },
    { id: "dockingbay", name: "Docking Bay 7 Food and Cargo", where: "Hollywood Studios – Galaxy's Edge", park: "hs",
      kind: "quick", price: 2, themes: ["starwars"], picky: 1, adv: 1, kids: 1, adults: 1,
      note: "Galactic comfort food inside Star Wars: Galaxy's Edge." },
    { id: "woodys", name: "Woody's Lunch Box", where: "Hollywood Studios – Toy Story Land", park: "hs",
      kind: "quick", price: 1, themes: ["pixar"], picky: 2, adv: 0, kids: 2, adults: 1,
      note: "Grilled cheese, totchos and lunch box tarts." },

    // Animal Kingdom
    { id: "tusker", name: "Tusker House", where: "Animal Kingdom", park: "ak",
      kind: "character", family: true, price: 3, chars: "Mickey, Donald, Daisy and Goofy in safari gear",
      themes: ["classic", "animals"], picky: 2, adv: 1, kids: 2, adults: 1,
      note: "African-inspired family-style meal with plenty of familiar dishes." },
    { id: "satuli", name: "Satu'li Canteen", where: "Animal Kingdom – Pandora", park: "ak",
      kind: "quick", price: 2, themes: ["animals"], picky: 1, adv: 1, kids: 1, adults: 2,
      note: "Build-your-own bowls inside Pandora – The World of Avatar." },
    { id: "yakyeti", name: "Yak & Yeti Restaurant", where: "Animal Kingdom – Asia", park: "ak",
      kind: "table", price: 3, themes: ["animals"], picky: 1, adv: 1, kids: 1, adults: 1,
      note: "Pan-Asian dishes in a two-story Himalayan setting." },

    // Disney Springs
    { id: "homecomin", name: "Chef Art Smith's Homecomin'", where: "Disney Springs", park: "springs",
      kind: "table", price: 3, picky: 2, adv: 0, kids: 1, adults: 2,
      note: "Southern comfort food, famous for its fried chicken." },
    { id: "politepig", name: "The Polite Pig", where: "Disney Springs", park: "springs",
      kind: "quick", price: 2, picky: 2, adv: 1, kids: 1, adults: 2,
      note: "Barbecue and bourbon at a counter-service price." }
  ]
};
