import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

export const checkCameraPermissions = async () => {
  let { status } = await Camera.requestCameraPermissionsAsync();
  await MediaLibrary.requestPermissionsAsync();

  return status === "granted";
};
