import { Ages, Car, FamilyMember } from "../../App";

export const nonToddlerCount = (familyMembers: FamilyMember[]) => {
  let toddlerCount = 0;
  familyMembers.map((item) => {
    if (
      [Ages.month0_5, Ages.month6_11, Ages.year1, Ages.year2].includes(item.age)
    ) {
      toddlerCount = toddlerCount + 1;
    }
  });

  return familyMembers.length - toddlerCount;
};

export const getStordrift = (familyMembers: FamilyMember[]) => {
  let adultCount = 0;
  familyMembers.map((item) => {
    if (
      [
        Ages.year18_19,
        Ages.year20_30,
        Ages.year31_50,
        Ages.year51_60,
        Ages.year61_66,
        Ages.year67_73,
        Ages.olderThan74,
      ].includes(item.age)
    ) {
      adultCount = adultCount + 1;
    }
  });
  if (adultCount > 1 && familyMembers.length > 4) {
    return true;
  }
  return false;
};

export const getFoodAndBeverages = (
  age: Ages,
  gender: string,
  pregnant?: boolean
) => {
  if (pregnant) {
    return 3980;
  }
  const dataW = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 1090 },
    { key: Ages.year1, value: 1370 },
    { key: Ages.year2, value: 1870 },
    { key: Ages.year3, value: 1870 },
    { key: Ages.year4_5, value: 1870 },
    { key: Ages.year6_9, value: 2390 },
    { key: Ages.year10_13, value: 2870 },
    { key: Ages.year14_17, value: 3310 },
    { key: Ages.year18_19, value: 3570 },
    { key: Ages.year20_30, value: 3570 },
    { key: Ages.year31_50, value: 3370 },
    { key: Ages.year51_60, value: 3370 },
    { key: Ages.year61_66, value: 3100 },
    { key: Ages.year67_73, value: 3100 },
    { key: Ages.olderThan74, value: 2800 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 1090 },
    { key: Ages.year1, value: 1370 },
    { key: Ages.year2, value: 1870 },
    { key: Ages.year3, value: 1870 },
    { key: Ages.year4_5, value: 1870 },
    { key: Ages.year6_9, value: 2390 },
    { key: Ages.year10_13, value: 2990 },
    { key: Ages.year14_17, value: 3780 },
    { key: Ages.year18_19, value: 4240 },
    { key: Ages.year20_30, value: 4240 },
    { key: Ages.year31_50, value: 3980 },
    { key: Ages.year51_60, value: 3980 },
    { key: Ages.year61_66, value: 3500 },
    { key: Ages.year67_73, value: 3500 },
    { key: Ages.olderThan74, value: 3250 },
    { key: Ages.unknown, value: 0 },
  ];

  if (gender != "Kvinne") {
    return dataM.find((item) => item.key === age)?.value;
  } else {
    return dataW.find((item) => item.key === age)?.value;
  }
};

export const getClothesAndFootwear = (age: Ages, gender: string) => {
  const dataW = [
    { key: Ages.month0_5, value: 420 },
    { key: Ages.month6_11, value: 420 },
    { key: Ages.year1, value: 500 },
    { key: Ages.year2, value: 640 },
    { key: Ages.year3, value: 640 },
    { key: Ages.year4_5, value: 640 },
    { key: Ages.year6_9, value: 690 },
    { key: Ages.year10_13, value: 650 },
    { key: Ages.year14_17, value: 900 },
    { key: Ages.year18_19, value: 950 },
    { key: Ages.year20_30, value: 950 },
    { key: Ages.year31_50, value: 950 },
    { key: Ages.year51_60, value: 950 },
    { key: Ages.year61_66, value: 950 },
    { key: Ages.year67_73, value: 950 },
    { key: Ages.olderThan74, value: 950 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 420 },
    { key: Ages.month6_11, value: 420 },
    { key: Ages.year1, value: 500 },
    { key: Ages.year2, value: 640 },
    { key: Ages.year3, value: 640 },
    { key: Ages.year4_5, value: 640 },
    { key: Ages.year6_9, value: 690 },
    { key: Ages.year10_13, value: 630 },
    { key: Ages.year14_17, value: 760 },
    { key: Ages.year18_19, value: 880 },
    { key: Ages.year20_30, value: 880 },
    { key: Ages.year31_50, value: 880 },
    { key: Ages.year51_60, value: 880 },
    { key: Ages.year61_66, value: 880 },
    { key: Ages.year67_73, value: 880 },
    { key: Ages.olderThan74, value: 880 },
    { key: Ages.unknown, value: 0 },
  ];

  if (gender != "Mann") {
    return dataW.find((item) => item.key === age)?.value;
  } else {
    return dataM.find((item) => item.key === age)?.value;
  }
};

export const getPersonalCare = (age: Ages, gender: string) => {
  const dataW = [
    { key: Ages.month0_5, value: 590 },
    { key: Ages.month6_11, value: 590 },
    { key: Ages.year1, value: 510 },
    { key: Ages.year2, value: 510 },
    { key: Ages.year3, value: 310 },
    { key: Ages.year4_5, value: 200 },
    { key: Ages.year6_9, value: 230 },
    { key: Ages.year10_13, value: 430 },
    { key: Ages.year14_17, value: 590 },
    { key: Ages.year18_19, value: 910 },
    { key: Ages.year20_30, value: 910 },
    { key: Ages.year31_50, value: 910 },
    { key: Ages.year51_60, value: 870 },
    { key: Ages.year61_66, value: 870 },
    { key: Ages.year67_73, value: 870 },
    { key: Ages.olderThan74, value: 870 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 590 },
    { key: Ages.month6_11, value: 590 },
    { key: Ages.year1, value: 510 },
    { key: Ages.year2, value: 510 },
    { key: Ages.year3, value: 310 },
    { key: Ages.year4_5, value: 200 },
    { key: Ages.year6_9, value: 230 },
    { key: Ages.year10_13, value: 340 },
    { key: Ages.year14_17, value: 460 },
    { key: Ages.year18_19, value: 720 },
    { key: Ages.year20_30, value: 720 },
    { key: Ages.year31_50, value: 720 },
    { key: Ages.year51_60, value: 720 },
    { key: Ages.year61_66, value: 720 },
    { key: Ages.year67_73, value: 720 },
    { key: Ages.olderThan74, value: 720 },
    { key: Ages.unknown, value: 0 },
  ];

  if (gender != "Mann") {
    return dataW.find((item) => item.key === age)?.value;
  } else {
    return dataM.find((item) => item.key === age)?.value;
  }
};

export const getGamesAndSubscriptions = (age: Ages) => {
  const data = [
    { key: Ages.month0_5, value: 150 },
    { key: Ages.month6_11, value: 150 },
    { key: Ages.year1, value: 410 },
    { key: Ages.year2, value: 410 },
    { key: Ages.year3, value: 680 },
    { key: Ages.year4_5, value: 680 },
    { key: Ages.year6_9, value: 800 },
    { key: Ages.year10_13, value: 1300 },
    { key: Ages.year14_17, value: 1450 },
    { key: Ages.year18_19, value: 1590 },
    { key: Ages.year20_30, value: 1590 },
    { key: Ages.year31_50, value: 1590 },
    { key: Ages.year51_60, value: 1590 },
    { key: Ages.year61_66, value: 1590 },
    { key: Ages.year67_73, value: 1590 },
    { key: Ages.olderThan74, value: 1590 },
    { key: Ages.unknown, value: 0 },
  ];

  return data.find((item) => item.key === age)?.value;
};

export const getTravelExpenses = (age: Ages, student?: boolean) => {
  if (student) {
    return 488;
  }
  const data = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 0 },
    { key: Ages.year1, value: 0 },
    { key: Ages.year2, value: 0 },
    { key: Ages.year3, value: 0 },
    { key: Ages.year4_5, value: 0 },
    { key: Ages.year6_9, value: 407 },
    { key: Ages.year10_13, value: 407 },
    { key: Ages.year14_17, value: 407 },
    { key: Ages.year18_19, value: 407 },
    { key: Ages.year20_30, value: 814 },
    { key: Ages.year31_50, value: 814 },
    { key: Ages.year51_60, value: 814 },
    { key: Ages.year61_66, value: 814 },
    { key: Ages.year67_73, value: 407 },
    { key: Ages.olderThan74, value: 407 },
    { key: Ages.unknown, value: 0 },
  ];

  return data.find((item) => item.key === age)?.value;
};

export const getInfantEquipment = (age: Ages, pregnant?: boolean) => {
  if (pregnant) {
    return 3390;
  }
  const data = [
    { key: Ages.month0_5, value: 420 },
    { key: Ages.month6_11, value: 420 },
    { key: Ages.year1, value: 0 },
    { key: Ages.year2, value: 0 },
    { key: Ages.year3, value: 0 },
    { key: Ages.year4_5, value: 0 },
    { key: Ages.year6_9, value: 0 },
    { key: Ages.year10_13, value: 0 },
    { key: Ages.year14_17, value: 0 },
    { key: Ages.year18_19, value: 0 },
    { key: Ages.year20_30, value: 0 },
    { key: Ages.year31_50, value: 0 },
    { key: Ages.year51_60, value: 0 },
    { key: Ages.year61_66, value: 0 },
    { key: Ages.year67_73, value: 0 },
    { key: Ages.olderThan74, value: 0 },
    { key: Ages.unknown, value: 0 },
  ];

  return data.find((item) => item.key === age)?.value;
};

export const getOtherGrocieries = (familyMembers: FamilyMember[]) => {
  if (familyMembers.length > 7) {
    return 1070;
  }
  const data = [
    { key: 1, value: 450 },
    { key: 2, value: 490 },
    { key: 3, value: 620 },
    { key: 4, value: 760 },
    { key: 5, value: 890 },
    { key: 6, value: 990 },
    { key: 7, value: 1070 },
  ];
  return data.find((item) => item.key === familyMembers.length)?.value;
};

export const getHouseholdItems = (familyMembers: FamilyMember[]) => {
  if (nonToddlerCount(familyMembers) > 7) {
    return 870;
  }
  const data = [
    { key: 1, value: 410 },
    { key: 2, value: 440 },
    { key: 3, value: 530 },
    { key: 4, value: 680 },
    { key: 5, value: 750 },
    { key: 6, value: 840 },
    { key: 7, value: 870 },
  ];
  return data.find((item) => item.key === nonToddlerCount(familyMembers))
    ?.value;
};

export const getFurniture = (familyMembers: FamilyMember[]) => {
  if (nonToddlerCount(familyMembers) > 7) {
    return 1390;
  }
  const data = [
    { key: 1, value: 500 },
    { key: 2, value: 550 },
    { key: 3, value: 670 },
    { key: 4, value: 870 },
    { key: 5, value: 1020 },
    { key: 6, value: 1220 },
    { key: 7, value: 1390 },
  ];
  return data.find((item) => item.key === nonToddlerCount(familyMembers))
    ?.value;
};

export const getMediaAndRecreation = (familyMembers: FamilyMember[]) => {
  if (familyMembers.length > 7) {
    return 2320;
  }
  const data = [
    { key: 1, value: 2090 },
    { key: 2, value: 2090 },
    { key: 3, value: 2090 },
    { key: 4, value: 2210 },
    { key: 5, value: 2210 },
    { key: 6, value: 2320 },
    { key: 7, value: 2320 },
  ];
  return data.find((item) => item.key === familyMembers.length)?.value;
};

export const getCarExpenses = (car: Car, familyMembers: FamilyMember[]) => {
  if (car.fossil) {
    if (familyMembers.length > 4) {
      const data = [
        { key: 1, value: 4330 },
        { key: 2, value: 7297 },
        { key: 3, value: 10264 },
        { key: 4, value: 13231 },
      ];
      return data.find((item) => item.key === car.fossil)?.value;
    } else {
      const data = [
        { key: 1, value: 2976 },
        { key: 2, value: 5934 },
        { key: 3, value: 8901 },
        { key: 4, value: 11868 },
      ];
      return data.find((item) => item.key === car.fossil)?.value;
    }
  } else {
    if (familyMembers.length > 4) {
      const data = [
        { key: 1, value: 2550 },
        { key: 2, value: 4525 },
        { key: 3, value: 6500 },
        { key: 4, value: 8475 },
      ];
      return data.find((item) => item.key === car.electric)?.value;
    } else {
      const data = [
        { key: 1, value: 1975 },
        { key: 2, value: 3950 },
        { key: 3, value: 5925 },
        { key: 4, value: 7900 },
      ];
      return data.find((item) => item.key === car.electric)?.value;
    }
  }
  return 0;
};

export const getKindergarden = (
  familyMembers: FamilyMember[],
  salary?: number
) => {
  const data = [
    { key: 0, value: 0 },
    { key: 1, value: 3050 },
    { key: 2, value: 2135 + 3050 },
    { key: 3, value: 1525 + 2135 + 3050 },
  ];
  let count = 0;
  familyMembers.map((item) => {
    if (item.kindergarden) {
      count = count + 1;
    }
  });
  if (salary) {
    if (salary > 559167) {
      if (count > 3) {
        return (
          (data.find((item) => item.key === 3)?.value as number) +
          1525 * (count - 3)
        );
      } else {
        return data.find((item) => item.key === count)?.value;
      }
    } else {
      return count * salary * 0.06;
    }
  }
};
// , furniture, household item,

export const getSFO = (
  freeSfo?: boolean,
  salary?: number,
  sfo?: string
): number => {
  if (sfo === "Nei") {
    return 0;
  }
  if (salary) {
    if (salary >= 445921) {
      if (freeSfo) {
        return 1069;
      } else if (sfo === "Heltid") {
        return 3299;
      } else if (sfo === "Deltid") {
        return 2230;
      }
    } else if (salary <= 250830) {
      if (freeSfo) {
        return 252;
      } else if (sfo === "Heltid") {
        return 704;
      } else if (sfo === "Deltid") {
        return 452;
      }
    } else {
      if (freeSfo) {
        return 462;
      } else if (sfo === "Heltid") {
        return 1294;
      } else if (sfo === "Deltid") {
        return 832;
      }
    }
  }
  return 0;
};

export const hasSalary = (familyMembers: FamilyMember[]) => {
  let hasKids = false;
  familyMembers.map((item) => {
    if (item.kindergarden != false || item.sfo != "Nei") {
      hasKids = true;
    }
  });
  return hasKids;
};
