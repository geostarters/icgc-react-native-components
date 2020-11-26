import React, { useState } from "react";
import axios from "axios";

const KeiakiRN = (props) => {
  const [markerPickedCoordinates, setMarkerPickedCoordinates] = useState({});
  const [responseKeiaki, setResponseKeiaki] = useState({});
  const [geometryKeiaki, setGeometryKeiaki] = useState(false);

  // FUNCIÓ A CRIDAR AMB UN LONGPRESS AL MAPA
  const selectLocation = (event) => {
    setMarkerPickedCoordinates({
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    });

    getKeiaki(markerPickedCoordinates);
  };

  // FUNCIÓ CRIDA KEIAKI API
  async function getKeiaki(markerPickedCoordinates) {
    try {
      const long = markerPickedCoordinates.longitude;
      const lat = markerPickedCoordinates.latitude;

      const responseKeiaki = await axios.get(
        `https://betaserver2.icgc.cat/keiaki/api/${long}/${lat}`
      );

      setResponseKeiaki(responseKeiaki);

      const geometryKeiaki = await axios.get(
        `https://betaserver2.icgc.cat/keiaki/api/geo/${long}/${lat}`
      );
      setGeometryKeiaki(geometryKeiaki);
    } catch (error) {
      console.error(error);
    }
  }
};
export default KeiakiRN;
