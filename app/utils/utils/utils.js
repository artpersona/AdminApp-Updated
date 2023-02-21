import { Platform } from "react-native";

export const isResponseSuccessful = (response) => {
  return response.status >= 200 && response.status <= 300;
};

export const resetKeyboardOffset = () => {
  return Platform.select({
    ios: () => 0,
    android: () => -300,
  })();
};

export const collectIdsAndDocs = (data) => {
  let newData = [];
  Object.entries(data).forEach(([key, value]) => {
    newData = [
      ...newData,
      {
        id: key,
        ...value,
      },
    ];
  });
  return newData;
};
