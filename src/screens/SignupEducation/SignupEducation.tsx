import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Button from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import colors from '../../theme/colors';
import { APP_SCREEN_LIST } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAppDispatch from '../../hooks/useAppDispatch';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import { getAllSchoolAction } from '../../actions/auth';
import useAppSelector from '../../hooks/useAppSelector';
import AddEducationForm from './AddEducationForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import EducationCard from './EducationCard';

const SignupEducation = () => {
  const bottomSheetRef = useRef(null);
  const sessionReducer = useAppSelector((state) => state.sessionReducer);

  const navigation = useNavigation<any>();

  useEffect(() => {
    dispatch(getAllSchoolAction());
  }, []);

  const dispatch = useAppDispatch();

  const handleOnNextPress = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_SKILLS_SCREEN);
  };

  const education = sessionReducer?.profileData?.education || [];

  return (
    <View style={[GlobalStyles.container]}>
      <View style={{ marginBottom: 20 }}>
        <BackButton title="Education" />
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
          Tell us about your most recent educational achievement
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          {education.length > 0 ? (
            <View>
              {education.map((degree, index) => (
                <EducationCard
                  key={'key-' + index}
                  degree={degree}
                  handleDelete={() => {}}
                />
              ))}
            </View>
          ) : null}
          {education.length == 0 ? <Text>No Education Added</Text> : null}
          <TouchableOpacity
            style={{
              marginBottom: 40,
              marginTop: 20,
            }}
            onPress={() => bottomSheetRef.current?.expand()}
          >
            <Text style={styles.add}>Add Education</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View>
        <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
          <TextLink
            title="Skip For Now"
            onPress={handleOnNextPress}
            color={colors.black}
          />
        </View>
        <Button
          loading={session.updateEducationHistoryStatus === 'loading'}
          title="Continue"
          onPress={handleOnNextPress}
        />
      </View>
      <AddEducationForm bottomSheetRef={bottomSheetRef} />
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
  add: {
    fontSize: 18,
    color: GlobalStyles.textPrimary.color,
    textDecorationLine: 'underline',
  },
});

export default SignupEducation;
