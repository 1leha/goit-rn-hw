import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../db/firebaseConfig";

export const uploadPhotoToFirebase = async (dbFolder, uri) => {
  const res = await fetch(uri);
  const file = await res.blob();

  const fileStorage = ref(storage, `${dbFolder}/${file.data.blobId}`);
  await uploadBytes(fileStorage, file);
  const url = await getDownloadURL(
    ref(storage, `${dbFolder}/${file.data.blobId}`)
  );

  return url;
};
