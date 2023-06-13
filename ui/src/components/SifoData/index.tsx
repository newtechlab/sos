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
    return 4270;
  }
  const dataW = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 1080 },
    { key: Ages.year1, value: 1480 },
    { key: Ages.year2, value: 1970 },
    { key: Ages.year3, value: 1970 },
    { key: Ages.year4_5, value: 1970 },
    { key: Ages.year6_9, value: 2530 },
    { key: Ages.year10_13, value: 3060 },
    { key: Ages.year14_17, value: 3480 },
    { key: Ages.year18_19, value: 3570 },
    { key: Ages.year20_30, value: 3570 },
    { key: Ages.year31_50, value: 3620 },
    { key: Ages.year51_60, value: 3620 },
    { key: Ages.year61_66, value: 3330 },
    { key: Ages.year67_73, value: 3330 },
    { key: Ages.olderThan74, value: 3010 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 1080 },
    { key: Ages.year1, value: 1480 },
    { key: Ages.year2, value: 1970 },
    { key: Ages.year3, value: 1970 },
    { key: Ages.year4_5, value: 1970 },
    { key: Ages.year6_9, value: 2530 },
    { key: Ages.year10_13, value: 3140 },
    { key: Ages.year14_17, value: 3970 },
    { key: Ages.year18_19, value: 4540 },
    { key: Ages.year20_30, value: 4540 },
    { key: Ages.year31_50, value: 4270 },
    { key: Ages.year51_60, value: 4270 },
    { key: Ages.year61_66, value: 3760 },
    { key: Ages.year67_73, value: 3760 },
    { key: Ages.olderThan74, value: 3490 },
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
    { key: Ages.month0_5, value: 430 },
    { key: Ages.month6_11, value: 430 },
    { key: Ages.year1, value: 500 },
    { key: Ages.year2, value: 650 },
    { key: Ages.year3, value: 650 },
    { key: Ages.year4_5, value: 650 },
    { key: Ages.year6_9, value: 700 },
    { key: Ages.year10_13, value: 460 },
    { key: Ages.year14_17, value: 920 },
    { key: Ages.year18_19, value: 970 },
    { key: Ages.year20_30, value: 970 },
    { key: Ages.year31_50, value: 970 },
    { key: Ages.year51_60, value: 970 },
    { key: Ages.year61_66, value: 970 },
    { key: Ages.year67_73, value: 970 },
    { key: Ages.olderThan74, value: 970 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 430 },
    { key: Ages.month6_11, value: 430 },
    { key: Ages.year1, value: 500 },
    { key: Ages.year2, value: 650 },
    { key: Ages.year3, value: 650 },
    { key: Ages.year4_5, value: 650 },
    { key: Ages.year6_9, value: 700 },
    { key: Ages.year10_13, value: 640 },
    { key: Ages.year14_17, value: 770 },
    { key: Ages.year18_19, value: 900 },
    { key: Ages.year20_30, value: 900 },
    { key: Ages.year31_50, value: 900 },
    { key: Ages.year51_60, value: 900 },
    { key: Ages.year61_66, value: 900 },
    { key: Ages.year67_73, value: 900 },
    { key: Ages.olderThan74, value: 900 },
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
    { key: Ages.month0_5, value: 470 },
    { key: Ages.month6_11, value: 470 },
    { key: Ages.year1, value: 560 },
    { key: Ages.year2, value: 560 },
    { key: Ages.year3, value: 330 },
    { key: Ages.year4_5, value: 210 },
    { key: Ages.year6_9, value: 240 },
    { key: Ages.year10_13, value: 460 },
    { key: Ages.year14_17, value: 560 },
    { key: Ages.year18_19, value: 920 },
    { key: Ages.year20_30, value: 920 },
    { key: Ages.year31_50, value: 920 },
    { key: Ages.year51_60, value: 880 },
    { key: Ages.year61_66, value: 880 },
    { key: Ages.year67_73, value: 880 },
    { key: Ages.olderThan74, value: 880 },
    { key: Ages.unknown, value: 0 },
  ];

  const dataM = [
    { key: Ages.month0_5, value: 470 },
    { key: Ages.month6_11, value: 470 },
    { key: Ages.year1, value: 560 },
    { key: Ages.year2, value: 560 },
    { key: Ages.year3, value: 330 },
    { key: Ages.year4_5, value: 210 },
    { key: Ages.year6_9, value: 240 },
    { key: Ages.year10_13, value: 340 },
    { key: Ages.year14_17, value: 450 },
    { key: Ages.year18_19, value: 740 },
    { key: Ages.year20_30, value: 740 },
    { key: Ages.year31_50, value: 740 },
    { key: Ages.year51_60, value: 740 },
    { key: Ages.year61_66, value: 740 },
    { key: Ages.year67_73, value: 740 },
    { key: Ages.olderThan74, value: 740 },
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
    { key: Ages.month0_5, value: 160 },
    { key: Ages.month6_11, value: 160 },
    { key: Ages.year1, value: 430 },
    { key: Ages.year2, value: 430 },
    { key: Ages.year3, value: 710 },
    { key: Ages.year4_5, value: 710 },
    { key: Ages.year6_9, value: 830 },
    { key: Ages.year10_13, value: 1350 },
    { key: Ages.year14_17, value: 1500 },
    { key: Ages.year18_19, value: 1650 },
    { key: Ages.year20_30, value: 1650 },
    { key: Ages.year31_50, value: 1650 },
    { key: Ages.year51_60, value: 1650 },
    { key: Ages.year61_66, value: 1650 },
    { key: Ages.year67_73, value: 1650 },
    { key: Ages.olderThan74, value: 1650 },
    { key: Ages.unknown, value: 0 },
  ];

  return data.find((item) => item.key === age)?.value;
};

export const getTravelExpenses = (age: Ages, student?: boolean) => {
  if (student) {
    return 511;
  }
  const data = [
    { key: Ages.month0_5, value: 0 },
    { key: Ages.month6_11, value: 0 },
    { key: Ages.year1, value: 0 },
    { key: Ages.year2, value: 0 },
    { key: Ages.year3, value: 0 },
    { key: Ages.year4_5, value: 0 },
    { key: Ages.year6_9, value: 427 },
    { key: Ages.year10_13, value: 427 },
    { key: Ages.year14_17, value: 427 },
    { key: Ages.year18_19, value: 427 },
    { key: Ages.year20_30, value: 853 },
    { key: Ages.year31_50, value: 853 },
    { key: Ages.year51_60, value: 853 },
    { key: Ages.year61_66, value: 853 },
    { key: Ages.year67_73, value: 427 },
    { key: Ages.olderThan74, value: 427 },
    { key: Ages.unknown, value: 0 },
  ];

  return data.find((item) => item.key === age)?.value;
};

export const getInfantEquipment = (age: Ages, pregnant?: boolean) => {
  if (pregnant) {
    return 3880;
  }
  const data = [
    { key: Ages.month0_5, value: 520 },
    { key: Ages.month6_11, value: 520 },
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
    return 950;
  }
  const data = [
    { key: 1, value: 380 },
    { key: 2, value: 430 },
    { key: 3, value: 570 },
    { key: 4, value: 680 },
    { key: 5, value: 780 },
    { key: 6, value: 880 },
    { key: 7, value: 950 },
  ];
  return data.find((item) => item.key === familyMembers.length)?.value;
};

export const getHouseholdItems = (familyMembers: FamilyMember[]) => {
  if (nonToddlerCount(familyMembers) > 7) {
    return 1060;
  }
  const data = [
    { key: 1, value: 550 },
    { key: 2, value: 600 },
    { key: 3, value: 670 },
    { key: 4, value: 860 },
    { key: 5, value: 930 },
    { key: 6, value: 1000 },
    { key: 7, value: 1060 },
  ];
  return data.find((item) => item.key === nonToddlerCount(familyMembers))
    ?.value;
};

export const getFurniture = (familyMembers: FamilyMember[]) => {
  if (nonToddlerCount(familyMembers) > 7) {
    return 1460;
  }
  const data = [
    { key: 1, value: 520 },
    { key: 2, value: 580 },
    { key: 3, value: 700 },
    { key: 4, value: 910 },
    { key: 5, value: 1070 },
    { key: 6, value: 1270 },
    { key: 7, value: 1460 },
  ];
  return data.find((item) => item.key === nonToddlerCount(familyMembers))
    ?.value;
};

export const getMediaAndRecreation = (familyMembers: FamilyMember[]) => {
  if (familyMembers.length > 7) {
    return 2410;
  }
  const data = [
    { key: 1, value: 2160 },
    { key: 2, value: 2160 },
    { key: 3, value: 2160 },
    { key: 4, value: 2300 },
    { key: 5, value: 2300 },
    { key: 6, value: 2410 },
    { key: 7, value: 2410 },
  ];
  return data.find((item) => item.key === familyMembers.length)?.value;
};

export const getCarExpenses = (car: Car, familyMembers: FamilyMember[]) => {
  let sum = 0;
  if (car.fossil) {
    if (familyMembers.length > 4) {
      const data = [
        { key: 1, value: 4638 },
        { key: 2, value: 7713 },
        { key: 3, value: 10788 },
        { key: 4, value: 13863 },
      ];
      sum =
        sum + (data.find((item) => item.key === car.fossil)?.value as number);
    } else {
      const data = [
        { key: 1, value: 3075 },
        { key: 2, value: 6150 },
        { key: 3, value: 9225 },
        { key: 4, value: 12300 },
      ];
      sum =
        sum + (data.find((item) => item.key === car.fossil)?.value as number);
    }
  }
  if (car.electric) {
    if (familyMembers.length > 4) {
      const data = [
        { key: 1, value: 2700 },
        { key: 2, value: 4675 },
        { key: 3, value: 6650 },
        { key: 4, value: 8625 },
      ];
      sum =
        sum + (data.find((item) => item.key === car.electric)?.value as number);
    } else {
      const data = [
        { key: 1, value: 1975 },
        { key: 2, value: 3950 },
        { key: 3, value: 5925 },
        { key: 4, value: 7900 },
      ];
      sum =
        sum + (data.find((item) => item.key === car.electric)?.value as number);
    }
  }
  return sum;
};

export const getKindergarden = (
  familyMembers: FamilyMember[],
  salary?: number
) => {
  let sum = 0;
  let count = 0;
  let youngerChild = false;
  const ageOrder = Object.values(Ages);
  const sortedFamilyMembers = familyMembers
    .filter((item) => item.kindergarden === true)
    .sort((a, b) => ageOrder.indexOf(b.age) - ageOrder.indexOf(a.age));

  sortedFamilyMembers.map((item) => {
    count = count + 1;
    if (item.age === Ages.year1) {
      youngerChild = true;
    }
    if (salary) {
      const data = [
        { key: 0, value: 0 },
        { key: 1, value: 3000 },
        { key: 2, value: 2100 },
        { key: 3, value: 1500 },
      ];

      if (salary > 598825) {
        if (count >= 3) {
          sum = sum + 1500;
        } else {
          sum =
            sum + (data.find((item) => item.key === count)?.value as number);
        }
      } else if (salary >= 550000) {
        const dataFreeCore = [
          { key: 0, value: 0 },
          { key: 1, value: 1666 },
          { key: 2, value: 1166 },
          { key: 3, value: 833 },
        ];
        if (youngerChild) {
          sum =
            count < 4
              ? sum + (data.find((item) => item.key === count)?.value as number)
              : sum + 833;
        } else if (count > 3) {
          sum = sum + 833;
        } else {
          sum =
            sum +
            (dataFreeCore.find((item) => item.key === count)?.value as number);
        }
      } else {
        const dataLowIncome = [
          { key: 0, value: 0 },
          { key: 1, value: (salary * 0.06) / 11 },
          { key: 2, value: ((salary * 0.06) / 11) * 0.7 },
          { key: 3, value: ((salary * 0.06) / 11) * 0.5 },
        ];
        if (youngerChild) {
          sum =
            count < 4
              ? sum +
                (dataLowIncome.find((item) => item.key === count)
                  ?.value as number)
              : sum + ((salary * 0.06) / 11) * 0.5;
        } else if (count > 3) {
          sum =
            sum +
            ((salary * 0.06) / 11) * 0.5 -
            ((salary * 0.06) / 11) * 0.5 * 0.4434713376;
        } else {
          sum =
            sum +
            (dataLowIncome.find((item) => item.key === count)
              ?.value as number) -
            (dataLowIncome.find((item) => item.key === count)
              ?.value as number) *
              0.4434713376;
        }
      }
    }
  });
  return sum;
};
// , lek og mediebruk (20kr feil), bilkostnader,

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
        return 1180;
      } else if (sfo === "Heltid") {
        return 3421;
      } else if (sfo === "Deltid") {
        return 2313;
      }
    } else if (salary <= 250832) {
      if (freeSfo) {
        return 261;
      } else if (sfo === "Heltid") {
        return 730;
      } else if (sfo === "Deltid") {
        return 452;
      }
    } else {
      if (freeSfo) {
        return 479;
      } else if (sfo === "Heltid") {
        return 1342;
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
