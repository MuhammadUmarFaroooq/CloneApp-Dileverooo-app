import { Button, StyleSheet, Text, View } from "react-native";
import React, { Component, forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["50%"], []);
  const renderbackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );
  const { dismiss } = useBottomSheetModal();
  {
    return (
      <BottomSheetModal
        style={{ backgroundColor: Colors.lightGrey, borderRadius: 0 }}
        overDragResistanceFactor={0}
        ref={ref}
        snapPoints={snapPoints}
        backdropComponent={renderbackdrop}
      >
        <View style={style.contentcontainer}>
          <View style={style.toggle}>
            <TouchableOpacity style={style.toggleActive}>
              <Text style={style.activeText}>Delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.toggleInactive}>
              <Text style={style.InactiveText}>PickUp</Text>
            </TouchableOpacity>
          </View>

          <Text style={style.subheader}>Your Location</Text>
          <Link href={"/(modal)/location-search"} asChild>
            <TouchableOpacity>
              <View style={style.item}>
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={Colors.medium}
                />
                <Text style={{ flex: 1 }}>Current Location</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={Colors.primary}
                />
              </View>
            </TouchableOpacity>
          </Link>

          <Text style={style.subheader}>Arrival Time</Text>
          <TouchableOpacity>
            <View style={style.item}>
              <Ionicons
                name="stopwatch-outline"
                size={20}
                color={Colors.medium}
              />
              <Text style={{ flex: 1 }}>Now</Text>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Colors.primary}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.buttom} onPress={() => dismiss()}>
            <Text>Confirm</Text>
          </TouchableOpacity>
        </View>
      </BottomSheetModal>
    );
  }
});

const style = StyleSheet.create({
  contentcontainer: {
    flex: 1,
  },
  toggle: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  toggleActive: {
    backgroundColor: Colors.primary,
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  toggleInactive: {
    padding: 8,
    borderRadius: 32,
    paddingHorizontal: 30,
  },
  activeText: {
    color: "#fff",
    fontWeight: "700",
  },
  InactiveText: {
    color: Colors.primary,
  },
  subheader: {
    fontSize: 16,
    fontWeight: "600",
    margin: 16,
  },
  buttom: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 4,
    marginTop: 30,
    alignItems: "center",
    marginLeft: 38,
    width: "80%",
  },
  item: {
    flexDirection: "row",
    gap: 6,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 10,
    padding: 16,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default BottomSheet;
