const tech = {
    "ore": {
        "description": "Прокачать добычу Ore. +$1/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 100,
        "money_value": 1,
        "attack_value": 0
    },
    "gold": {
        "description": "Прокачать добычу Gold. +$2/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 200,
        "money_value": 2,
        "attack_value": 0
    },
    "diamonds": {
        "description": "Прокачать добычу Diamonds. +$3/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 300,
        "money_value": 3,
        "attack_value": 0
    },
    "oil": {
        "description": "Прокачать добычу Oil. +$3/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 400,
        "money_value": 4,
        "attack_value": 0
    },
    "uranium": {
        "description": "Прокачать добычу Uranium. +$3/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 500,
        "money_value": 5,
        "attack_value": 0
    },
    "oxygen": {
        "description": "Прокачать добычу Oxygen. +$4/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 600,
        "money_value": 6,
        "attack_value": 0
    },
    "h3": {
        "description": "Прокачать добычу H3. +$5/секунду. Прокачка технологий добычу увеличивает ваши заработки, с помощью которых вы можете быстрее развивать государство ",
        "cost": 700,
        "money_value": 7,
        "attack_value": 0
    },
    "aircrafts": {
        "description": "Купить Aircrafts. +2 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 100,
        "attack_value": 2,
        "money_value": 0
    },
    "battleships": {
        "description": "Купить battleships. +3 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 200,
        "attack_value": 3,
        "money_value": 0
    },
    "missiles": {
        "description": "Купить missiles. +5 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 300,
        "attack_value": 5,
        "money_value": 0
    },
    "moontanks": {
        "description": "Купить moontanks. +7 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 400,
        "attack_value": 7,
        "money_value": 0
    },
    "rockets": {
        "description": "Купить rockets. +9 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 500,
        "attack_value": 9,
        "money_value": 0
    },
    "stations": {
        "description": "Купить stations. +10 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 600,
        "attack_value": 10,
        "money_value": 0
    },
    "tanks": {
        "description": "Купить tanks. +12 влияния в секунду. Покупка новых вооружений как увеличивает ваше влияние на соседние регионы, так и помогает бороться с влиянием ваших соперников",
        "cost": 700,
        "attack_value": 12,
        "money_value": 0
    },
};


// Данные о штатах и игроках
const stateData = {"al": {
        "name": "Alabama",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ms", "tn", "ga", "fl"],
        "defense": 100
    },
    "az": {
        "name": "Arizona",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ca", "nv", "ut", "nm"],
        "defense": 100
    },
    "ar": {
        "name": "Arkansas",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["la", "ms", "tn", "mo", "ok", "tx"],
        "defense": 100
    },
    "ca": {
        "name": "California",
        "ownership": "player5",
        "color": "gray",
        "neighbors": ["or", "nv", "az"],
        "defense": 100
    },
    "co": {
        "name": "Colorado",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["wy", "ne", "ks", "ok", "nm", "ut"],
        "defense": 100
    },
    "ct": {
        "name": "Connecticut",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ri", "ny", "ma"],
        "defense": 100
    },
    "de": {
        "name": "Delaware",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nj", "pa", "md"],
        "defense": 100
    },
    "fl": {
        "name": "Florida",
        "ownership": "player2",
        "color": "gray",
        "neighbors": ["al", "ga"],
        "defense": 100
    },
    "ga": {
        "name": "Georgia",
        "ownership": "player3",
        "color": "gray",
        "neighbors": ["al", "fl", "sc", "nc", "tn"],
        "defense": 100
    },
    "id": {
        "name": "Idaho",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["mt", "wy", "ut", "nv", "or", "wa"],
        "defense": 100
    },
    "il": {
        "name": "Illinois",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["wi", "ia", "mo", "in", "ky"],
        "defense": 100
    },
    "in": {
        "name": "Indiana",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["mi", "oh", "ky", "il"],
        "defense": 100
    },
    "ia": {
        "name": "Iowa",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["wi", "mn", "sd", "ne", "mo", "il"],
        "defense": 100
    },
    "ks": {
        "name": "Kansas",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ne", "mo", "ok", "co"],
        "defense": 100
    },
    "ky": {
        "name": "Kentucky",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["in", "oh", "wv", "va", "tn", "mo", "il"],
        "defense": 100
    },
    "la": {
        "name": "Louisiana",
        "ownership": "player1",
        "color": "#29BF12",
        "neighbors": ["ar", "tx", "ms"],
        "defense": 100
    },
    "me": {
        "name": "Maine",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nh"],
        "defense": 100
    },
    "md": {
        "name": "Maryland",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["pa", "de", "va", "wv"],
        "defense": 100
    },
    "ma": {
        "name": "Massachusetts",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ri", "ct", "ny", "vt", "nh"],
        "defense": 100
    },
    "mi": {
        "name": "Michigan",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["wi", "oh", "in"],
        "defense": 100
    },
    "mn": {
        "name": "Minnesota",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nd", "sd", "ia", "wi"],
        "defense": 100
    },
    "ms": {
        "name": "Mississippi",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["la", "al", "tn"],
        "defense": 100
    },
    "mo": {
        "name": "Missouri",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["il", "ky", "tn", "ar", "ok", "ks", "ne", "ia"],
        "defense": 100
    },
    "mt": {
        "name": "Montana",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nd", "sd", "wy", "id"],
        "defense": 100
    },
    "ne": {
        "name": "Nebraska",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["sd", "ia", "mo", "ks", "co", "wy"],
        "defense": 100
    },
    "nv": {
        "name": "Nevada",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["or", "id", "ut", "az", "ca"],
        "defense": 100
    },
    "nh": {
        "name": "New Hampshire",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["vt", "me", "ma"],
        "defense": 100
    },
    "nj": {
        "name": "New Jersey",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ny", "de", "pa"],
        "defense": 100
    },
    "nm": {
        "name": "New Mexico",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["az", "ut", "co", "ok", "tx"],
        "defense": 100
    },
    "ny": {
        "name": "New York",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["vt", "nh", "ma", "ct", "pa", "nj"],
        "defense": 100
    },
    "nc": {
        "name": "North Carolina",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["sc", "ga", "tn", "va"],
        "defense": 100
    },
    "nd": {
        "name": "North Dakota",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["sd", "mn", "mt"],
        "defense": 100
    },
    "oh": {
        "name": "Ohio",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["pa", "wv", "ky", "in", "mi"],
        "defense": 100
    },
    "ok": {
        "name": "Oklahoma",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ks", "mo", "ar", "tx", "nm", "co"],
        "defense": 100
    },
    "or": {
        "name": "Oregon",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["wa", "id", "nv", "ca"],
        "defense": 100
    },
    "pa": {
        "name": "Pennsylvania",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ny", "nj", "de", "md", "wv", "oh"],
        "defense": 100
    },
    "ri": {
        "name": "Rhode Island",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ma", "ct"],
        "defense": 100
    },
    "sc": {
        "name": "South Carolina",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["ga", "nc"],
        "defense": 100
    },
    "sd": {
        "name": "South Dakota",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nd", "mn", "ia", "ne", "wy", "mt"],
        "defense": 100
    },
    "tn": {
        "name": "Tennessee",
        "ownership": "player4",
        "color": "gray",
        "neighbors": ["ky", "va", "nc", "ga", "al", "ms", "ar", "mo"],
        "defense": 100
    },
    "tx": {
        "name": "Texas",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nm", "ok", "ar", "la"],
        "defense": 100
    },
    "ut": {
        "name": "Utah",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["id", "wy", "co", "nm", "az", "nv"],
        "defense": 100
    },
    "vt": {
        "name": "Vermont",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nh", "ny", "ma"],
        "defense": 100
    },
    "va": {
        "name": "Virginia",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["nc", "tn", "ky", "wv", "md"],
        "defense": 100
    },
    "wa": {
        "name": "Washington",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["id", "or"],
        "defense": 100
    },
    "wv": {
        "name": "West Virginia",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["oh", "pa", "md", "va", "ky"],
        "defense": 100
    },
    "wi": {
        "name": "Wisconsin",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["mi", "il", "ia", "mn"],
        "defense": 100
    },
    "wy": {
        "name": "Wyoming",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["mt", "sd", "ne", "co", "ut", "id"],
        "defense": 100
    },
    "dc": {
        "name": "District of Columbia",
        "ownership": "neutral",
        "color": "gray",
        "neighbors": ["va", "md"],
        "defense": 100
    }};

const playerData = {
    "player1": {
        "name": "Florida",
        "color": "#97892A",
        "start_state": "Florida",
        "techs": ["uranium","aircrafts","ore"],
        "income_per_sec": 10,
        "attack_per_sec": 10,
        "total_money": 120,
        "attack_points": 10,
        "owned_states": ["fl"]
    },
    "player2": {
        "name": "Georgia",
        "color": "#985F28",
        "start_state": "Georgia",
        "techs": ["missiles","h3"],
        "income_per_sec": 10,
        "attack_per_sec": 10,
        "total_money": 0,
        "attack_points": 10,
        "owned_states": ["ga"]
    },
    "player3": {
        "name": "Tennessee",
        "color": "#6E2D23",
        "start_state": "Tennessee",
        "techs": ["oxygen","moontanks"],
        "income_per_sec": 10,
        "attack_per_sec": 10,
        "total_money": 0,
        "attack_points": 10,
        "owned_states": ["tn"]
    },
    "player4": {
        "name": "Louisiana",
        "color": "#6F5731",
        "start_state": "Louisiana",
        "techs": ["oxygen","rockets"],
        "income_per_sec": 10,
        "attack_per_sec": 10,
        "total_money": 0,
        "attack_points": 10,
        "owned_states": ["la"]
    },
    "player5": {
        "name": "California",
        "color": "#7E523C",
        "start_state": "California",
        "techs": ["oil","aircrafts"],
        "income_per_sec": 10,
        "attack_per_sec": 10,
        "total_money": 250,
        "attack_points": 10,
        "owned_states": ["ca"]
    }
};

