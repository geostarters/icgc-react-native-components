import React, { useState } from "react";
import { SearchBar } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";

const SearchPeliasButton = (props) => {
  const [placeholderText, setPlaceholderText] = useState("Cerca...");
  const [search, updatedSearch] = useState("");
  const [cercaPelias, updatedCercaPelias] = useState({});


  //es un onchange de la capsa del cercador
  const updateSearch = (search) => {
    updatedSearch(search);
    searchingResults(search);
  };

  async function searchingResults(search) {
    try {
      const cercaPelias = await axios.get(
        `https://aws.icgc.cat/cerca_pelias/autocomplete?text=${search}`
      );
      const cercaPeliasData = cercaPelias.data.features;

      updatedCercaPelias(cercaPeliasData);

      cercaPeliasData.forEach((element) => {
        const nomOpcio = element.properties.label;
        const coordOpcio = element.geometry.coordinates;
      });
    } catch (error) {
      console.error(error);
    }
  }
// al fer click a un resultat 
  const flyTo = (result) => {
    const resultCoords = result.geometry.coordinates;
    props.getCoords(resultCoords); //funció que marca un nou SetRegion al MapView d'acord amb les noves coordenades al component mare
    updatedSearch("");
    setPlaceholderText(result.properties.label);
  };

  return (
    <View>
      <SearchBar
        placeholder={placeholderText}
        onChangeText={updateSearch}
        showLoading
        value={search}
        round
        inputStyle={styles.inputStyle}
        inputContainerStyle={styles.inputContainerStyle}
        containerStyle={styles.searchbar}
        style={styles.searchbarContainer}
      />

      {cercaPelias.length > 1 && search.length > 1 ? (
        <ScrollView vertical={true} style={styles.inputModal}>
          {cercaPelias.map((result, index) => (
            <TouchableOpacity
              style={styles.resultButton}
              key={index}
              onPress={() => flyTo(result)}
            >
              <Text>{result.properties.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  inputStyle: {
    color: "teal",
  },
  inputContainerStyle: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderTopWidth: 0,
    borderWidth: 0,
  },
  searchbar: {
    backgroundColor: "white",
    borderWidth: 0,
    elevation: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  resultButton: {
    width: "83%",
    marginTop: 2,

    padding: 5,
    borderRadius: 4,
    elevation: 1,
    marginLeft: 16,
  },
  inputModal: {
    height: "60%",
  },
});
export default SearchPeliasButton;
