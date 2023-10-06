import { View, Text, StyleSheet, ListRenderItem, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../constants/Colors";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import categories from "../../assets/data/filter.json";
import { Ionicons } from "@expo/vector-icons";
import BouncyCheckbox from "react-native-bouncy-checkbox";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Catagory {
  name: String;
  count: number;
  checked?: boolean;
}

const Itembox = () => {
  return (
    <>
      <View style={styles.itemcontainer}>
        <TouchableOpacity style={styles.item}>
          <Ionicons name="arrow-down-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Sort</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="fast-food-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Hygiene Rating</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="pricetag-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Offers</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons name="nutrition-outline" size={20} color={Colors.medium} />
          <Text style={{ flex: 1 }}>Dietary</Text>
          <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Catagories</Text>
    </>
  );
};

const Filter = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<Catagory[]>(categories);
  const [selected, setSelected] = useState<Catagory[]>([]);
  const flexWidth = useSharedValue(0);
  const scale = useSharedValue(0);

  useEffect(() => {
    const hasSelected = selected.length > 0;
    const selectedItems = items.filter((item) => item.checked);
    const newSelected = selectedItems.length > 0;
    if (hasSelected !== newSelected) {
      flexWidth.value = withTiming(newSelected ? 150 : 0);
      scale.value = withTiming(newSelected ? 1 : 0);
    }

    setSelected(selectedItems);
  }, [items]);

  const clearAll = () => {
    const updateItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(updateItems);
  };

  const animatedstyles = useAnimatedStyle(() => {
    return {
      width: flexWidth.value,
    };
  });

  const animatedText = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  const renderItem: ListRenderItem<Catagory> = ({ item, index }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.itemText}>
          {item.name} ({item.count})
        </Text>
        <BouncyCheckbox
          isChecked={items[index].checked}
          fillColor={Colors.primary}
          unfillColor="#fff"
          disableBuiltInState
          iconStyle={{
            borderColor: Colors.primary,
            borderRadius: 5,
            borderWidth: 2,
          }}
          innerIconStyle={{ borderWidth: 2, borderRadius: 5 }}
          onPress={() => {
            const isChecked = items[index].checked;

            const updateItems = items.map((item) => {
              if (item.name === items[index].name) {
                item.checked = !isChecked;
              }
              return item;
            });
            setItems(updateItems);
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderItem}
        ListHeaderComponent={<Itembox />}
      />
      <View style={{ height: 90 }}>
        <View style={styles.footer}>
          <View style={styles.btnContainer}>
            <Animated.View style={[animatedstyles, styles.outlinebtn]}>
              <TouchableOpacity onPress={clearAll}>
                <Animated.Text style={[animatedText, styles.outlinetxt]}>
                  Clear all
                </Animated.Text>
              </TouchableOpacity>
            </Animated.View>

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightGrey,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -10,
    },
  },
  fullwidth: {
    backgroundColor: Colors.primary,
    padding: 16,
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    height: 56,
  },
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  itemcontainer: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
    paddingVertical: 8,
    borderColor: Colors.grey,
    borderBottomWidth: 1,
  },
  header: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  itemText: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
  outlinebtn: {
    borderColor: Colors.primary,
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    height: 56,
  },
  outlinetxt: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Filter;
