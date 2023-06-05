import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const [myLocation, setMyLocation] = useState(null);
  const { params } = useRoute();

  // Location permission
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        console.log("Permission to access location was denied!");
      }

      const coords = {
        latitude: params.coords.latitude,
        longitude: params.coords.longitude,
      };
      setMyLocation(coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {myLocation && (
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: params.coords.latitude,
            longitude: params.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={5}
          maxZoomLevel={15}
          onMapReady={() => console.log("Map is ready")}
        >
          {myLocation && (
            <Marker
              title={params.description}
              coordinate={{
                latitude: params.coords.latitude,
                longitude: params.coords.longitude,
              }}
              description={params.place}
            />
          )}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
