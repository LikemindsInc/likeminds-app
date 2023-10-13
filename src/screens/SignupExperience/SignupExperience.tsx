import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { GlobalStyles } from '../../theme/GlobalStyles';
import Input from '../../components/Input/Input';
import React, { useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import TextLink from '../../components/TextLink/TextLink';
import colors from '../../theme/colors';
import DatePicker from '../../components/DatePicker/DatePicker';
import { Checkbox } from 'native-base';
import { APP_SCREEN_LIST } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import useAppSelector from '../../hooks/useAppSelector';
import {
  ISessionState,
  updateExperience,
} from '../../reducers/userProfileSession';
import { ISettingState } from '../../reducers/settings';
import { AntDesign } from '@expo/vector-icons';
import DateFormatter from '../../utils/date-formatter';
import useAppDispatch from '../../hooks/useAppDispatch';
import BackButton from '../../components/Navigation/BackButton/BackButton';
import moment from 'moment';
import { SelectList } from 'react-native-dropdown-select-list';
import { getAllIndustriesAction } from '../../actions/auth';
import AddExperienceForm from './AddExperienceForm';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SignupExperience = () => {
  const navigation = useNavigation<any>();
  const [startDate, setStartDate] = useState(
    moment().subtract('7', 'days').format('YYYY-MM-DD'),
  );
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'));
  const [stillWorkHere, setStillWorkHere] = useState(false);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [responsibilities, setResponsibilities] = useState('');
  const bottomSheetRef = useRef(null);

  const settings = useAppSelector((state) => state.settingReducer);

  useEffect(() => {
    dispatch(getAllIndustriesAction());
  }, []);

  const [errors, setErrors] = useState<{
    startDate: null | string;
    endDate: null | string;
    companyName: string | null;
    jobTitle: string | null;
    responsibilities: string | null;
    industry: string | null;
  }>({
    startDate: null,
    endDate: null,
    companyName: null,
    jobTitle: null,
    responsibilities: null,
    industry: null,
  });

  useEffect(() => {
    setErrors({
      startDate: null,
      endDate: null,
      companyName: null,
      jobTitle: null,
      responsibilities: null,
      industry: null,
    });
  }, []);

  useEffect(() => {
    if (jobTitle.trim() !== '')
      setErrors((state) => ({ ...state, jobTitle: null }));
    // else
    //   setErrors((state) => ({ ...state, jobTitle: "Job title is required" }));
  }, [jobTitle]);

  useEffect(() => {
    if (companyName.trim() !== '')
      setErrors((state) => ({ ...state, companyName: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     companyName: "Company name is required",
    //   }));
  }, [companyName]);

  useEffect(() => {
    if (responsibilities.trim() !== '')
      setErrors((state) => ({ ...state, responsibilities: null }));
    // else
    //   setErrors((state) => ({
    //     ...state,
    //     responsibilities: "Please provide responsiblities",
    //   }));
  }, [responsibilities]);

  const validateStartDate = () => {
    if (startDate.trim() !== '') {
      if (moment().diff(startDate, 'days') < 0) {
        return setErrors((state) => ({
          ...state,
          startDate: 'Start date can not be a future date',
        }));
      } else if (
        startDate.trim() !== '' &&
        moment(endDate).diff(startDate, 'days') < 0
      ) {
        return setErrors((state) => ({
          ...state,
          startDate: 'Start date can not be earlier than end date ',
        }));
      }
      setErrors((state) => ({ ...state, startDate: null }));
    } else
      setErrors((state) => ({
        ...state,
        startDate: 'start date is required',
      }));
  };

  const validateEndDate = () => {
    if (!stillWorkHere) {
      setErrors((state) => ({ ...state, endDate: null }));
    } else if (endDate.trim() !== '') {
      if (
        startDate.trim() !== '' &&
        moment(startDate).diff(endDate, 'days') < 0
      ) {
        return setErrors((state) => ({
          ...state,
          endDate: 'End date can not be earlier than start date',
        }));
      }
      setErrors((state) => ({ ...state, endDate: null }));
    } else
      setErrors((state) => ({ ...state, endDate: 'End date is required' }));
  };

  useEffect(() => {
    validateStartDate();
  }, [startDate, endDate]);

  useEffect(() => {
    validateEndDate();
  }, [endDate, stillWorkHere, startDate]);

  const session = useAppSelector(
    (state: any) => state.sessionReducer,
  ) as ISessionState;

  const setting = useAppSelector(
    (state: any) => state.settingReducer,
  ) as ISettingState;

  const dispatch = useAppDispatch();

  const handleOnNextPress = () => {
    if (companyName.trim() === '')
      return setErrors((state) => ({
        ...state,
        companyName: 'Company name is Required',
      }));
    if (responsibilities.trim() === '')
      return setErrors((state) => ({
        ...state,
        responsibilities: 'Responsibilities is Required',
      }));
    if (jobTitle.trim() === '')
      return setErrors((state) => ({
        ...state,
        jobTitle: 'Job title is Required',
      }));

    if (startDate.trim() === '')
      return setErrors((state) => ({
        ...state,
        startDate: 'start date is required',
      }));
    dispatch(
      updateExperience({
        startDate,
        stillWorkHere,
        endDate,
        jobTitle,
        companyName,
        responsibilities: responsibilities,
        industry,
      }),
    );
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };

  const handleOnSkip = () => {
    navigation.navigate(APP_SCREEN_LIST.SIGNUP_EDUCATION_SCREEN);
  };
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={50}
      // keyboardShouldPersistTaps={"always"}
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
        <View>
          <View style={{ marginBottom: 20 }}>
            <BackButton title="Experience" />
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
              Add a work experience, you may skip if you don’t have any
            </Text>
          </View>

          <TouchableOpacity
            style={{}}
            onPress={() => bottomSheetRef.current?.expand()}
          >
            <Text style={styles.add}>Add Experience</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={[GlobalStyles.mb20, GlobalStyles.displayRowCenter]}>
            <TextLink
              title="Skip For Now"
              onPress={handleOnSkip}
              color={colors.black}
            />
          </View>
          <Button title="Continue" onPress={handleOnNextPress} />
        </View>
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
