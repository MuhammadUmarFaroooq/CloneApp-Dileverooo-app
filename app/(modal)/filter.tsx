import { View, Text, StyleSheet, ListRenderItem } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import { categories } from "../../assets/data/home";

interface Catagory {
  name: String;
  count: number;
  checked?: boolean;
}

const Filter = () => {
  const navigation = useNavigation();

  const renderItem: ListRenderItem<Catagory> = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={categories} renderItem={renderItem} />
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.fullwidth}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.footerText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    color: Colors.medium,
    padding: 10,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  fullwidth: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    marginTop: 15,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Filter;
