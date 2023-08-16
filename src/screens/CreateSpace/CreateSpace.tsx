import { Text, TouchableOpacity, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import { useState } from "react";
import Button from "../../components/Button/Button";
import useAppDispatch from "../../hooks/useAppDispatch";
import { useToast } from "native-base";
import { storeSpaceTitleAndDescription } from "../../reducers/space_reducer";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { APP_SCREEN_LIST } from "../../constants";
import BackButton from "../../components/Navigation/BackButton/BackButton";

const CreateSpace = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigation = useNavigation<NavigationProp<any>>();
  const hanldeOnNext = () => {
    if (title.trim() === "")
      return toast.show({
        description: "Please provide the title of your space",
        variant: "contained",
      });

    if (description.trim() === "")
      return toast.show({
        description: "Please provide the description of your space",
        variant: "contained",
      });

    dispatch(storeSpaceTitleAndDescription({ title, description }));

    navigation.navigate(APP_SCREEN_LIST.CREATE_SPACE_ADD_PICTURE);
  };
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
        <BackButton title="Create Your Space" />
        {/* <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Create Your Space
        </Text> */}
      </View>
      <View style={[GlobalStyles.mb40]}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight700,
            GlobalStyles.textGrey,
          ]}
        >
          Enter general Information about your space
        </Text>
      </View>
      <View style={[GlobalStyles.mb20, { flex: 1 }]}>
        <Input
          placeholder="Space Title"
          autoCorrect={false}
          autoCapitalize={"none"}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          placeholder="About My Space"
          autoCorrect={false}
          autoCapitalize={"none"}
          value={description}
          onChangeText={(text) => setDescription(text)}
          contentContainerStyle={{ height: 300, alignItems: "flex-start" }}
          textAlignVertical="top"
          textAlign="left"
          multiline={true}
        />
      </View>

      <Button onPress={hanldeOnNext} title="Continue" />
    </View>
  );
};

export default CreateSpace;
