import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import React, { useEffect, useRef } from 'react';
import Button from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import colors from '../../theme/colors';
import { APP_SCREEN_LIST } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import { getAllIndustriesAction } from '../../actions/auth';
import AddExperienceForm from './AddExperienceForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ExperienceCard from './ExperienceCard';

const SignupExperience = () => {
  const dispatch = useAppDispatch();
  const bottomSheetRef = useRef(null);
  const navigation = useNavigation<any>();
  const sessionReducer = useAppSelector((state) => state.sessionReducer);

  useEffect(() => {
    dispatch(getAllIndustriesAction());
  }, []);

  const handleOnNextPress = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };

  const experience = sessionReducer?.profileData?.experience || [];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
    >
      <View
        style={[
          GlobalStyles.container,
          {
            flex: 1,
            justifyContent: 'space-between',
          },
        ]}
      >
        <View style={{ marginBottom: 20 }}>
          <BackButton title="Experience" />
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Text
            style={[
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
              GlobalStyles.fontWeight700,
              GlobalStyles.textGrey,
            ]}
          >
            Add a work experience, you may skip if you don’t have any
          </Text>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginBottom: 15,
          }}
        >
          <View>
            {experience.length > 0 ? (
              <View>
                {experience.map((experience, index) => (
                  <ExperienceCard
                    key={'key-' + index}
                    experience={experience}
                    handleDelete={() => {}}
                  />
                ))}
              </View>
            ) : null}
            {experience.length == 0 ? <Text>No Experience Added</Text> : null}
            {/* </ScrollView> */}

            <TouchableOpacity
              style={{
                marginBottom: 40,
                marginTop: 20,
              }}
              onPress={() => bottomSheetRef.current?.expand()}
            >
              <Text style={styles.add}>Add Experience</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
              <TextLink
                title="Skip For Now"
                onPress={handleOnNextPress}
                color={colors.black}
              />
            </View>
            <Button title="Continue" onPress={handleOnNextPress} />
          </View>
        </ScrollView>
      </View>

      <AddExperienceForm bottomSheetRef={bottomSheetRef} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputDouble: {
    flexDirection: 'row',
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
  add: {
    fontSize: 18,
    color: GlobalStyles.textPrimary.color,
    textDecorationLine: 'underline',
  },
});

export default SignupExperience;
