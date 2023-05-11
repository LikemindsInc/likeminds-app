import { ScrollView, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../theme/GlobalStyles";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { CheckIcon, Select } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../theme/colors";
import DropZone from "../../components/DropZone/DropZone";
import { APP_SCREEN_LIST } from "../../constants";
import { useNavigation } from "@react-navigation/native";

const PersonalInformation = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={[GlobalStyles.container]}>
      <View style={[GlobalStyles.mb20, GlobalStyles.mt10, GlobalStyles.mb30]}>
        <Text
          style={[
            GlobalStyles.fontInterMedium,
            GlobalStyles.fontSize20,
            GlobalStyles.fontWeight700,
          ]}
        >
          Personal Information
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input style={styles.inputFlex} placeholder="First Name" />
          <Input style={styles.inputFlex} placeholder="Last Name" />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <Select
            minWidth="200"
            accessibilityLabel="Country you live in"
            placeholder="Country you live in"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            width={"100%"}
            mt={1}
            fontFamily={"Inter-Regular"}
            shadow={"1"}
            height={60}
            dropdownIcon={
              <View style={{ paddingRight: 8 }}>
                <AntDesign name="caretdown" size={20} color={colors.primary} />
              </View>
            }
            borderRadius={10}
          >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </View>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input style={styles.inputFlex} placeholder="City" />
        </View>
        <View style={[styles.inputDouble, GlobalStyles.mb10]}>
          <Input
            multiline
            style={[styles.inputFlex, { height: 100, paddingVertical: 8 }]}
            placeholder="Bio"
            textAlignVertical="top"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View style={[GlobalStyles.mb30]}>
          <Select
            minWidth="200"
            accessibilityLabel="Country you are from"
            placeholder="Country you are from"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            width={"100%"}
            mt={1}
            fontFamily={"Inter-Regular"}
            shadow={"1"}
            height={60}
            dropdownIcon={
              <View style={{ paddingRight: 8 }}>
                <AntDesign name="caretdown" size={20} color={colors.primary} />
              </View>
            }
            borderRadius={10}
          >
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
          </Select>
        </View>
        <DropZone type="document" emptyIcon={<FileUploadEmptyIcon />} />
      </ScrollView>
      <Button
        title="Continue"
        onPress={() =>
          navigation.navigate(APP_SCREEN_LIST.SIGNUP_PROFILE_PICTURE)
        }
      />
    </View>
  );
};

const FileUploadEmptyIcon = () => {
  return (
    <View>
      <View style={[GlobalStyles.displayRowCenter]}>
        <AntDesign name="clouduploado" size={24} color={colors.primary} />
      </View>
      <View style={[GlobalStyles.displayRow]}>
        <Text
          style={[
            GlobalStyles.fontSize13,
            GlobalStyles.fontInterRegular,
            GlobalStyles.textNavyBlue,
            GlobalStyles.fontWeight400,
          ]}
        >
          Resume
        </Text>
        <Text
          style={[
            GlobalStyles.fontSize13,
            GlobalStyles.fontInterRegular,
            GlobalStyles.textGrey,
            GlobalStyles.fontWeight400,
          ]}
        >
          (Optional)
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputDouble: {
    flexDirection: "row",
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default PersonalInformation;
