import Button from '../../../components/Button/Button';
import colors from '../../../theme/colors';
import MultiSelect from 'react-native-multiple-select';
import React, { useState } from 'react';
import TextLink from '../../../components/TextLink/TextLink';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import { APP_SCREEN_LIST } from '../../../constants';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { updateSkillsProfileAction } from '../../../actions/auth';
import { updateSkills } from '../../../reducers/userProfileSession';

const SUGGESTIONS = [
  'App Design',
  'User Experience',
  'UX/UI',
  'Figma',
  'Adobe',
  'Sketch',
  'Wireframes',
].map((item, i) => ({ id: `${i}`, name: item }));

const SkillsForm = () => {
  const navigation = useNavigation<any>();
  const session = useAppSelector((state: any) => state.sessionReducer);

  const [items, setItems] = useState(SUGGESTIONS);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const handleOnNextPress = () => {
    dispatch(updateSkills(selectedItems));
    setTimeout(() => {
      dispatch(updateSkillsProfileAction());
    }, 300);
  };

  const onSelectedItemsChange = (selectedItems: any[]) => {
    setSelectedItems(selectedItems);
  };

  const renderSelectedItems = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignSelf: 'flex-start',
          gap: 10,
          marginTop: 20,
        }}
      >
        {selectedItems.map((item, i) => (
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderRadius: 30,
              borderColor: colors.primary,
              borderWidth: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'flex-start',
            }}
            key={i}
          >
            <Text
              style={[
                GlobalStyles.fontSize13,
                GlobalStyles.fontInterMedium,
                GlobalStyles.textGrey,
                { color: colors.primary },
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  return (
    <View
      style={[
        { flex: 1, paddingHorizontal: 16, paddingBottom: 20, paddingTop: 10 },
      ]}
    >
      <View style={[GlobalStyles.mb40]}>
        <Text
          style={[
            GlobalStyles.fontInterRegular,
            GlobalStyles.fontSize13,
            GlobalStyles.fontWeight700,
            GlobalStyles.textGrey,
          ]}
        >
          Add all the technical skills and tools you are expert at
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="name"
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          searchInputPlaceholderText="Select skills..."
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          fontFamily="Inter-Medium"
          noItemsText="Skill1, Skill2"
          selectedItemIconColor={colors.navyBlue}
          itemTextColor="#000"
          canAddItems
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          hideSubmitButton
          onAddItem={(data: { id: any; name: string }[]) => {
            const newItem = data.find((item) => isNaN(item.id));
            if (!newItem) return;

            const itemExists = items.find(
              (item) =>
                item.name.toLowerCase().trim() ===
                newItem.name.toLowerCase().trim(),
            );

            if (itemExists) return;

            newItem.id = `${data.length}`;

            setItems([...items, newItem]);
          }}
          styleRowList={{ paddingTop: 10, paddingBottom: 10 }}
        />
        <View>{renderSelectedItems()}</View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink
            onPress={() =>
              navigation.navigate(APP_SCREEN_LIST.SIGNUP_CERTIFICATE_SCREEN)
            }
            title="Skip For Now"
            color={colors.black}
          />
        </View>
        <Button
          loading={session.completeProfileStatus === 'loading'}
          title="Continue"
          onPress={handleOnNextPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputDouble: {
    flexDirection: 'row',
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default SkillsForm;
