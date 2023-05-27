import * as Location from "expo-location";

export const checkLocationPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();

  console.log("status :>> ", status);

  if (status !== "granted") {
    console.log("Permission to access location was denied!");
  }
  return status === "granted";
};
