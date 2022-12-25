import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import Checkbox from "expo-checkbox";
import useGenerate from "../useCustomHooks/useGenerate";
import * as Constants from "../constants/Constants";
import DateTimePicker from "@react-native-community/datetimepicker";
import { getConvertedDate, getConvertedDateTS } from "../helper/dateUtils";
import List from "./List";
import { Ionicons, AntDesign } from "@expo/vector-icons";

export default function Home() {
  const [status, setStatus] = useState([
    {
      id: 1,
      name: "Active",
      code: Constants.CODE_ACTIVE,
      isChecked: false,
    },
    {
      id: 2,
      name: "Super Active",
      code: Constants.CODE_SUPERACTIVE,
      isChecked: false,
    },
    {
      id: 3,
      name: "Bored",
      code: Constants.CODE_BORED,
      isChecked: false,
    },
  ]);

  //Hooks
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(getConvertedDate);
  const [toDate, setToDate] = useState(getConvertedDate);
  const [showFlatList, setShowFlatList] = useState(false);
  const [isClickEdit, setClickEdit] = useState(false);

  //Custom Hooks
  const { result, onGenerate } = useGenerate(fromDate, toDate, status);

  const handleChange = (id) => {
    let data = status.map((status) => {
      if (id === status.id) {
        console.log("...................................");
        return { ...status, isChecked: !status.isChecked };
      }
      return status;
    });

    setStatus(data);
  };

  const handleGenerate = () => {
    setShowFlatList(!showFlatList);
    setClickEdit(false);
    onGenerate();
  };

  const onFromDateSelected = (val) => {
    setShowFromPicker(!showFromPicker);
    const timestamp = new Date(val.nativeEvent.timestamp);
    const formattedDate = getConvertedDateTS(timestamp);
    console.log("formattedDate ", formattedDate); // Output: "July 1, 2021"
    setFromDate(formattedDate);
  };

  const onToDateSelected = (val) => {
    setShowToPicker(!showToPicker);
    const timestamp = new Date(val.nativeEvent.timestamp);
    const formattedDate = getConvertedDateTS(timestamp);
    console.log("formattedDate ", formattedDate); // Output: "July 1, 2021"
    setToDate(formattedDate);
  };

  const showFromDatePicker = () => {
    setShowFromPicker(!showFromPicker);
  };

  const showToDatePicker = () => {
    setShowToPicker(!showToPicker);
  };

  // console.log("result ", result);

  const onEdit = () => {
    setShowFlatList(!showFlatList);
    setClickEdit(true);
  };

  const onBack = () => {
    setShowFlatList(!showFlatList);
  };

  return (
    <View style={styles.container}>
      {showFlatList ? (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={onBack}>
              <Ionicons name="arrow-back" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity onPress={onEdit} style={styles.editBox}>
              <View style={{ justifyContent: "center", flexDirection: "row" }}>
                <Text style={styles.edit}> Edit </Text>
                <AntDesign name="menufold" size={32} color="white" />
              </View>
            </TouchableOpacity>
          </View>
          <List result={result} />
        </View>
      ) : (
        <View>
          <Text style={styles.paragraph}>
            {" "}
            {isClickEdit ? "Edit Filter" : "User Analyzer"}
          </Text>
          {!isClickEdit ? (
            <Text style={styles.hint}>Select filters to generate report</Text>
          ) : null}
          <View style={styles.dateBox}>
            <View>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Date</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ height: 50 }}>
                  <Text style={styles.from}> From</Text>
                  <Text style={styles.to}> To </Text>
                </View>

                <View style={{ height: 50 }}>
                  <TouchableOpacity
                    onPress={showFromDatePicker}
                    style={styles.fromPicker}
                  >
                    <Text style={{ fontSize: 18 }}>{fromDate}</Text>
                  </TouchableOpacity>

                  {showFromPicker ? (
                    <DateTimePicker
                      value={date}
                      mode={"date"}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      is24Hour={true}
                      onChange={onFromDateSelected}
                      style={{ width: 200 }}
                    />
                  ) : null}

                  <TouchableOpacity
                    onPress={showToDatePicker}
                    style={styles.toPicker}
                  >
                    <Text style={{ fontSize: 18 }}>{toDate}</Text>
                  </TouchableOpacity>

                  {showToPicker ? (
                    <DateTimePicker
                      value={date}
                      mode={"date"}
                      display={Platform.OS === "ios" ? "spinner" : "default"}
                      is24Hour={true}
                      onChange={onToDateSelected}
                      style={{ width: 200 }}
                    />
                  ) : null}
                </View>
              </View>
            </View>

            <View style={{ marginTop: 50 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>Status</Text>
              <View>
                {status.map((item) => {
                  return (
                    <View style={{ padding: 5, flexDirection: "row" }}>
                      <Checkbox
                        style={styles.checkbox}
                        value={item.isChecked}
                        onValueChange={() => {
                          handleChange(item.id);
                        }}
                        color={item.isChecked ? "#4630EB" : undefined}
                      />
                      <Text style={{ marginStart: 5, fontSize: 14 }}>
                        {item.name}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <TouchableOpacity
                onPress={handleGenerate}
                style={styles.generate}
              >
                <Text
                  style={{ fontSize: 22, textAlign: "center", color: "#fff" }}
                >
                  Generate
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    marginTop: 60,
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#4630EB",
    height: 50,
    width: 450,
    padding: 5,
  },

  editBox: {
    margin: 10,
    backgroundColor: "#4630EB",
    alignItems: "flex-end",
    height: 40,
    width: 100,
    padding: 5,
  },

  dateBox: {
    margin: 10,
    padding: 10,
    borderColor: "#000",
    borderWidth: 1,
    height: 350,
    width: 400,
  },

  from: { padding: 5, fontSize: 18, fontWeight: "bold" },

  to: {
    padding: 5,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  fromPicker: {
    borderColor: "#000",
    borderWidth: 1,
    marginStart: 5,
    padding: 5,
    width: 300,
    marginTop: 10,
  },

  toPicker: {
    borderColor: "#000",
    borderWidth: 1,
    marginStart: 5,
    padding: 5,
    width: 300,
    marginTop: 10,
  },

  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  hint: {
    marginLeft: 24,
    marginRight: 24,
    fontSize: 14,
    textAlign: "center",
  },
  checkbox: {},

  edit: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginTop: 2,
  },

  generate: {
    borderRadius: 4,
    backgroundColor: "#4630EB",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 50,
  },
});
