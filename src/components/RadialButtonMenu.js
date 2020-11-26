import React, { useState } from "react";

import { StyleSheet, View, Alert, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ButtonMenu = (props) => {
  const [buttonsMode, setButtonsMode] = useState(false);
  const [gpsMode, setGpsMode] = useState(false);
  const [infoMode, setInfoMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [basemapMode, setBasemapMode] = useState(false);

  const getCloseButtonMenu = () => {
    setTimeout(function () {
      setButtonsMode(false);
    }, 4000);
  };

  const getButtonsMode = () => {
    setButtonsMode(!buttonsMode) 
    getCloseButtonMenu();
  };
  const getGpsMode = () => {
    if (!gpsMode) {
      setGpsMode(true);
      setConfigMode(false);
      setSearchMode(false);
      setBasemapMode(false);
      setInfoMode(false);
      getCloseButtonMenu();
    } else {
      setGpsMode(false);
    }
  };

  const getInfoMode = () => {
     if (!infoMode) {
      setInfoMode(true);
      setConfigMode(true);
      setSearchMode(false);
      setBasemapMode(false);
      getCloseButtonMenu();
    } else {
      setInfoMode(false);
    }
  };

  const getSearchMode = () => {
    if (!searchMode) {
      setSearchMode(true);
      setConfigMode(false);
      setInfoMode(false);
      setBasemapMode(false);
      getCloseButtonMenu();
    } else {
      setSearchMode(false);
    }
  };
  const getBasemapMode = () => {
    if (!basemapMode) {
      setBasemapMode(true);
      setConfigMode(false);
      setInfoMode(false);
      setSearchMode(false);
      getCloseButtonMenu();
    } else {
      setBasemapMode(false);
    }
  };

  return (
    <View style={styles.actions}>
      <TouchableOpacity style={styles.buttonMenu} onPress={getButtonsMode}>
            {!buttonsMode ? (
                <Icon name="add" size={25} raised color={"black"}></Icon>
                ) : 
                <Icon name="add" size={25} reverse color={"black"}></Icon>
            }
      </TouchableOpacity>

      {buttonsMode === true ? (
        <View>
          <TouchableOpacity style={styles.buttonGps} onPress={getGpsMode}>
            {!gpsMode ? (
                <Icon name="gps-off" size={25} reverse color={"black"}></Icon>
                ) : 
                <Icon name="gps-fixed" size={25} raised color={"green"}></Icon>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonInfo} onPress={getInfoMode}>
            {!infoMode ? (
                <Icon name="help" type="entypo" size={25} reverse color={"black"}></Icon>
                ) : 
                <Icon name="help" type="entypo" size={25} raised color={"black"}></Icon>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSearch} onPress={getSearchMode}>
            {!searchMode ? (
                <Icon name="search" size={25} reverse color={"black"}></Icon>
                ) : 
                <Icon name="search" size={25} raised color={"black"}></Icon>
            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonBasemap} onPress={getBasemapMode}>
            {!basemapMode  ? (
                <Icon name="photo-library" size={25} reverse color={"black"}></Icon>
                ) : 
                <Icon name="photo-library" size={25} raised color={"black"}></Icon>
            }
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  actions: {
    position: "absolute",
    right: 0,
    top: "49%",
    zIndex: 0,

    width: 170,
    paddingBottom: 100,
    paddingTop: 130,
  },
  buttonMenu: {
    position: "absolute",
    top: 80,
    right: 0,
  },
  buttonGps: {
    position: "absolute",
    top: -140,
    right: 0,
  },
  buttonConfig: {
    position: "absolute",
    top: -120,
    right: 70,
  },
  buttonInfo: {
    position: "absolute",
    top: -90,
    right: 70,
  },
  buttonSearch: {
    position: "absolute",
    top: 0,
    right: 70,
  },
  buttonBasemap: {
    position: "absolute",
    top: 40,
    right: 0,
  },

});
export default ButtonMenu;
