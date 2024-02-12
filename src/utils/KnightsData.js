export const knightsData = [
  {
    "id": 1,
    "name": "Laurenti",
    "nickname": "The Brave",
    "birthday": "1995-05-15",
    "classe": "warlock",
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
    "classe": "cleric",
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
    "classe" : "bloodHunter",
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
  const equippedWeaponMod = knight.weapons.reduce((acc, weapon) => {
    return weapon.equipped ? acc + weapon.mod : acc;
  }, 0);
  let mod = 0;
  if (keyAttrValue >= 0 && keyAttrValue <= 8) {
    mod = -2;
  } else if (keyAttrValue >= 9 && keyAttrValue <= 10) {
    mod = -1;
  } else if (keyAttrValue >= 13 && keyAttrValue <= 15) {
    mod = 1;
  } else if (keyAttrValue >= 16 && keyAttrValue <= 18) {
    mod = 2;
  } else if (keyAttrValue >= 19 && keyAttrValue <= 20) {
    mod = 3;
  }
  return 10 + mod + equippedWeaponMod;
}
export function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthToday = today.getMonth() + 1;
  const dayToday = today.getDate();
  const birthMonth = birthDateObj.getMonth() + 1;
  const birthDay = birthDateObj.getDate();

  if (monthToday < birthMonth || (monthToday === birthMonth && dayToday < birthDay)) {
    age--;
  }

  return age;
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