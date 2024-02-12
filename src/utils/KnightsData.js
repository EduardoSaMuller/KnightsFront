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
export function getImageSource(knightClass) {
  // Determine o caminho da imagem com base na classe do cavaleiro
  switch (knightClass) {
    case "artificer":
      return require("@/assets/artificer.webp");
    case "barbarian":
      return require("@/assets/barbarian.webp");
    case "bard":
      return require("@/assets/bard.webp");
    case "bloodHunter":
      return require("@/assets/bloodhunter.webp");
    case "cleric":
      return require("@/assets/cleric.webp");
    case "druid":
      return require("@/assets/druid.webp");
    case "fighter":
      return require("@/assets/fighter.webp");
    case "monk":
      return require("@/assets/monk.webp");
    case 'paladin':
      return require('@/assets/paladin.webp');
    case "ranger":
      return require("@/assets/ranger.webp");
    case "rogue":
      return require("@/assets/rogue.webp");
    case "sorcerer":
      return require("@/assets/sorcerer.webp");
    case "warlock":
      return require("@/assets/warlock.webp");
    case "wizard":
      return require("@/assets/wizard.webp");
      
    // Adicione mais casos conforme necessário para outras classes
    default:
      // Retorne um caminho padrão se a classe não for encontrada
      return "";
  }
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