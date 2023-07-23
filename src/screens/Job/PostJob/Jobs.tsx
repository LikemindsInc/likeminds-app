import {
    Animated,
    Pressable,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    useWindowDimensions,
  } from "react-native";
  import { GlobalStyles } from "../../../theme/GlobalStyles";
  import Input from "../../../components/Input/Input";
  import { Feather, AntDesign } from "@expo/vector-icons";
  import colors from "../../../theme/colors";
  import { TabView, SceneMap } from "react-native-tab-view";
  import { useState } from "react";
  import { Box, useColorModeValue } from "native-base";
  import { StatusBar } from "react-native";
  import Button from "../../../components/Button/Button";
import { ScrollView } from "react-native-gesture-handler";
import { Tailor, Industry, Location, Type, Company, ExperienceLevel, Salary, PostDate } from "../../../components/Dropdown/Dropdown"

export default function Jobs() {
  return (
    <View style={[GlobalStyles.container, {width: "100%"}]}>
    <View style={[GlobalStyles.flewRow, {marginBottom: 8}]}>
      <View style={[GlobalStyles.flexOne]}>
        <Text style={[GlobalStyles.title, GlobalStyles.fontInterRegular, {fontWeight: "800"}]}> Jobs </Text>
      </View>
      <TouchableOpacity style={styles.filter}>
        <Feather name="sliders" size={24} color={colors.black} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.search}>
        <AntDesign name="search1" size={24} color={colors.black} />
      </TouchableOpacity>
    </View>
    <ScrollView style={{marginTop: 8, marginBottom: 8}} horizontal={true} showsHorizontalScrollIndicator={false}>
    <View style={[GlobalStyles.flewRow, {marginBottom: 8}]}>
        <Tailor />
        <PostDate />
        <Location />
        <ExperienceLevel />
        <Type />
        <Company />
        <Salary />
    </View>
    </ScrollView>
    <ScrollView style={{marginTop: 8}} showsVerticalScrollIndicator={false}> 
    <View style={{marginTop: 8, marginBottom: 8, borderWidth: 1, borderRadius: 10, padding: 18, borderColor: "grey"}}>

    <View style={[GlobalStyles.flewRow, {marginBottom: 8}]}>
        <View style={[GlobalStyles.flexOne]}>
            <Text style={[GlobalStyles.fontInterRegular, {fontWeight: "800"}]}>Project Manager</Text>
            <Text style={[{fontSize:12}, GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>3h ago</Text>
        </View>
        <TouchableOpacity style={styles.search}>
        <AntDesign name="ellipsis1" size={24} color={colors.black} />
      </TouchableOpacity>
    </View>

    <View style={{marginBottom: 8}}>
        <Text style={[GlobalStyles.fontInterRegular, {fontSize:12, fontWeight: "300"}]}>
            Are you Interested in making an impact in a new start-up geared towards empowering manginalized communities? Likeminds is looking for a project Manager to help drive the vision of our products and services.
        </Text>
    </View>

    <View style={[GlobalStyles.flewRow, {marginBottom: 8}]}>
        <View style={{flex:1}}>
            <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Industry</Text>
            <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Internet Technology</Text>
        </View>

        <View style={{marginRight: 8, flex: 0}}>
            <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Location</Text>
            <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Remote</Text>
        </View>
    </View>

    <View style={[GlobalStyles.flewRow, {marginBottom: 8}]}>
        <View style={{flex: 1}}>
            <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Type</Text>
            <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Full Time</Text>
        </View>

        <View style={{marginRight: 8, flex: 0}}>
            <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Company</Text>
            <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Likeminds</Text>
        </View>
    </View>

    <View style={{marginBottom: 8}}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Experience Level</Text>
        <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Senior Level</Text>
    </View>

    <View style={{marginBottom: 8}}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Tailor</Text>
        <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800"}]}>Sponsoring Companies, DI&E Hires</Text>
    </View>

    <View style={{marginBottom: 8}}>
        <Text style={[GlobalStyles.textGrey, GlobalStyles.fontInterRegular]}>Salary</Text>
        <Text style={[GlobalStyles.fontInterRegular, {fontWeight:"800", fontSize: 14, color: "#47D0FD"}]}>$150k/year</Text>
    </View>

    <View>
        <Text style={[GlobalStyles.fontInterRegular, {fontSize: 12, fontWeight: "800"}]}>About LikeMinds</Text>
        <Text style={[GlobalStyles.fontInterRegular, {fontSize:12, fontWeight: "300"}]}>
            LikeMinds is a platform for briging together talents yet disadvantaged communities to support one another and grow.
        </Text>
    </View>

    <View style={[GlobalStyles.flewRow, {justifyContent:"space-between", width: 160}]}>
    <Button
            type="outline-primary"
            buttonStyle={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: "100%", height: 35, marginTop: 8, padding: 8, alignSelf: "flex-start" }}
            title="Save"
            onPress={() => {} }
          />
    <Button
            buttonStyle={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
            style={{ width: "100%", height: 35, marginTop: 8, padding: 8, alignSelf: "flex-end" }}
            title="Apply"
            onPress={() => {} }
          />
    </View>


    </View>
    </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
    filter: {
        paddingHorizontal: 1,
        paddingVertical: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      search: {
        paddingHorizontal: 1,
        paddingVertical: 1,
        justifyContent: "center",
        alignItems: "center",
      },
})