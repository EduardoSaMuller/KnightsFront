export const knightsData = [
  {
    "id": 1,
    "name": "Laurenti",
    "nickname": "The Brave",
    "birthday": "1995-05-15",
    "class": "warlock",
    "weapons": [
      {
        "name": "sword",
        "mod": 3,
        "attr": "strength",
        "equipped": true
      }
    ],
    "attributes": {
      "strength": 12,
      "dexterity": 10,
      "constitution": 14,
      "intelligence": 8,
      "wisdom": 11,
      "charisma": 9
    },
    "keyAttribute": "strength"
  },
  {
    "id": 2,
    "name": "Laurenti",
    "nickname": "The Brave",
    "birthday": "1995-05-15",
    "class": "cleric",
    "weapons": [
      {
        "name": "sword",
        "mod": 3,
        "attr": "strength",
        "equipped": true
      }
    ],
    "attributes": {
      "strength": 16,
      "dexterity": 14,
      "constitution": 12,
      "intelligence": 11,
      "wisdom": 20,
      "charisma": 18
    },
    "keyAttribute": "strength"
  },
  {
    "id": 3,
    "name": "Laurenti",
    "nickname": "The Brave",
    "birthday": "1995-05-15",
    "class" : "bloodHunter",
    "weapons": [
      {
        "name": "sword",
        "mod": 3,
        "attr": "strength",
        "equipped": true
      }
    ],
    "attributes": {
      "strength": 12,
      "dexterity": 10,
      "constitution": 14,
      "intelligence": 8,
      "wisdom": 11,
      "charisma": 9
    },
    "keyAttribute": "strength"
  },
]
 

export const classColors = {
  artificer: '#40E0D0',
  barbarian: '#FF0000',
  bard: '#C0C0C0',
  bloodHunter: '#8B0000',
  cleric: '#FFFFFF',
  druid: '#006400',
  fighter: '#8B4513',
  monk: '#F4A460',
  paladin: '#FFD700',
  ranger: '#2F4F4F',
  rogue: '#000000',
  sorcerer: '#FF4500',
  warlock: '#663399',
  wizard: '#4169E1',
}

export function calculateExperience(knight) {
  const age = new Date().getFullYear() - new Date(knight.birthday).getFullYear();
  const experience = age >= 7 ? Math.floor((age - 7) * Math.pow(22, 1.45)) : 0;
  return experience;
}

export function calculateAttack(knight) {
  const keyAttrValue = knight.attributes[knight.keyAttribute];
  const equippedWeaponMod = knight.weapons.find(weapon => weapon.equipped).mod;
  let attack = 10;

  if (keyAttrValue >= 0 && keyAttrValue <= 8) {
    attack += -2;
  } else if (keyAttrValue >= 9 && keyAttrValue <= 10) {
    attack += -1;
  } else if (keyAttrValue >= 11 && keyAttrValue <= 12) {
    attack += 0;
  } else if (keyAttrValue >= 13 && keyAttrValue <= 15) {
    attack += 1;
  } else if (keyAttrValue >= 16 && keyAttrValue <= 18) {
    attack += 2;
  } else if (keyAttrValue >= 19 && keyAttrValue <= 20) {
    attack += 3;
  }

  return attack + equippedWeaponMod;
}

export function determineKeyAttribute(knightClass) {
  switch (knightClass) {
    case 'bard':
    case 'sorcerer':
    case 'warlock':
      return 'charisma';
    case 'druid':
    case 'cleric':
      return 'wisdom';
    case 'fighter':
    case 'paladin':
    case 'barbarian':
    case 'bloodhunter':
      return 'strength';
    case 'rogue':
    case 'ranger':
      return 'dexterity';
    case 'wizard':
    case 'artificer':
      return 'intelligence';
    default:
      return 'strength'; // Padrão para outras classes desconhecidas
  }
}