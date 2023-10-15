import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GlobalStyles } from '../../../theme/GlobalStyles';
import BackButton from '../../../components/Navigation/BackButton/BackButton';
import colors, { addOpacity } from '../../../theme/colors';
import { ScrollView, useToast } from 'native-base';
import Input from '../../../components/Input/Input';
import { AntDesign } from '@expo/vector-icons';
import BottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Button from '../../../components/Button/Button';
import { Feather } from '@expo/vector-icons';
import {
  INDUSTRIES,
  JOB_EXPERIENCE,
  JOB_LOCATION,
  JOB_TYPES,
  TAILOR_JOBS,
} from '../../../constants';
import RadioGroup, { RadioButtonProps } from 'react-native-radio-buttons-group';
import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';
import {
  IPostState,
  clearCreateJobStatus,
} from '../../../reducers/post_reducer';
import { createJobAction } from '../../../actions/post';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import KeyboardDismisser from '../../../components/KeyboardDismisser/KeyboardDismisser';
import { Checkbox } from 'react-native-paper';

const PostJob = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLocation, setJobLocation] = useState(JOB_LOCATION[0].value);
  const [tailorJob, setTailorJob] = useState<string[]>([]);
  const [jobExperience, setJobExperience] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [salary, setSalary] = useState('');
  const [jobName, setJobName] = useState('');

  const [applicationLink, setJobApplicationLink] = useState('');

  const state = useAppSelector((state: any) => state.postReducer) as IPostState;

  const dispatch = useAppDispatch();

  const snapPoints = useMemo(() => ['50%', '60%'], []);
  const radioButtons: any[] = useMemo(
    () =>
      JOB_LOCATION.map((item, i) => ({
        id: item.value,
        label: item.label,
        value: item.value,
      })),
    [],
  );

  const tailorRadioButtons: any[] = useMemo(
    () =>
      TAILOR_JOBS.map((item, i) => ({
        id: item.value,
        label: item.label,
        value: item.value,
      })),
    [],
  );

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {}, []);

  const handleOpenIndustrySelectPicker = () => {
    bottomSheetRef.current?.expand();
  };

  const handleOnIndustrySelect = (industry: string) => {
    setSelectedIndustry(industry);
  };

  const handleOnJobTypeSelect = (text: string) => {
    setJobType(text);
  };

  const toast = useToast();
  const naviation = useNavigation<NavigationProp<any>>();

  const handleOnCheck = (item: any) => {
    const index = tailorJob.findIndex((value) => item.value === value);

    if (index === -1) setTailorJob((state) => [...state, item.value]);
    else {
      const oldState = [...tailorJob];

      oldState.splice(index, 1);

      setTailorJob(oldState);
    }
  };

  const handleOnPress = () => {
    const payload = {
      companyDescription,
      companyName,
      jobDescription,
      jobTitle,
      jobLocation,
      selectedIndustry,
      jobType,
      locationAddress,
      jobExperience,
      salary,
    };

    dispatch(
      createJobAction({
        companyDescription: payload.companyDescription,
        companyName: payload.companyName,
        companyLocation: locationAddress,
        jobTitle: payload.jobTitle,
        jobDescription: payload.jobDescription,
        salary: +payload.salary,
        experienceLevel: payload.jobExperience,
        industry: payload.selectedIndustry,
        jobLocation: payload.jobLocation,
        jobType: payload.jobType,
        applicationLink,
        tailor: tailorJob,
      }),
    );
  };

  useEffect(() => {
    if (state.createJobStatus === 'completed') {
      setSelectedIndustry('');
      setCompanyName('');
      setCompanyDescription('');
      setJobDescription('');
      setJobExperience('');
      setJobDescription('');
      setJobLocation('');
      setJobTitle('');
      setSalary('');
      setJobType('');
      setLocationAddress('');

      naviation.goBack();

      dispatch(clearCreateJobStatus());
    } else if (state.createJobStatus === 'failed') {
      dispatch(clearCreateJobStatus());
    }
  }, [state.createJobStatus]);

  return (
    <KeyboardDismisser>
      <View style={[GlobalStyles.container]}>
        <View style={[GlobalStyles.mb20, GlobalStyles.mt20]}>
          <BackButton title="Job Post" iconColor={colors.primary} />
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Job Title"
              autoCorrect={false}
              autoCapitalize={'none'}
              value={jobTitle}
              onChangeText={(text) => setJobTitle(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Company Name"
              autoCorrect={false}
              autoCapitalize={'none'}
              value={companyName}
              onChangeText={(text) => setCompanyName(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Company Description"
              autoCorrect={false}
              autoCapitalize={'none'}
              contentContainerStyle={{ height: 100, alignItems: 'flex-start' }}
              textAlignVertical="top"
              textAlign="left"
              multiline={true}
              value={companyDescription}
              onChangeText={(text) => setCompanyDescription(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <TouchableOpacity onPress={handleOpenIndustrySelectPicker}>
              <View style={styles.industryStyle}>
                <View
                  style={[
                    GlobalStyles.flewRow,
                    { justifyContent: 'space-between' },
                  ]}
                >
                  <Text
                    style={[
                      GlobalStyles.fontInterRegular,
                      GlobalStyles.fontWeight400,
                      GlobalStyles.fontSize15,
                    ]}
                  >
                    {selectedIndustry === '' ? 'Industry' : selectedIndustry}
                  </Text>
                  <AntDesign
                    name="caretdown"
                    size={24}
                    color={colors.primary}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Job Description"
              autoCorrect={false}
              autoCapitalize={'none'}
              contentContainerStyle={{ height: 100, alignItems: 'flex-start' }}
              textAlignVertical="top"
              textAlign="left"
              multiline={true}
              value={jobDescription}
              onChangeText={(text) => setJobDescription(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Job Link"
              autoCorrect={false}
              autoCapitalize={'none'}
              textAlignVertical="top"
              textAlign="left"
              value={applicationLink}
              onChangeText={(text) => setJobApplicationLink(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight400,
                GlobalStyles.textNavyBlue,
                { justifyContent: 'center' },
              ]}
            >
              Job Type{' '}
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize15,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textRed,
                ]}
              >
                *
              </Text>
            </Text>
            <View
              style={[
                GlobalStyles.flewRow,
                GlobalStyles.mt20,
                { flexWrap: 'wrap', gap: 10 },
              ]}
            >
              {JOB_TYPES.filter((item) => item.label !== 'All').map(
                (item, i) => (
                  <JobType
                    isSelected={item.value === jobType}
                    onPress={() => handleOnJobTypeSelect(item.value)}
                    text={item.label}
                    key={i}
                  />
                ),
              )}
            </View>
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight400,
                GlobalStyles.textNavyBlue,
                { justifyContent: 'center' },
              ]}
            >
              Location of Job{' '}
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize15,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textRed,
                ]}
              >
                *
              </Text>
            </Text>
            <View
              style={[
                GlobalStyles.flewRow,
                GlobalStyles.mt20,
                { flexWrap: 'wrap', gap: 10 },
              ]}
            >
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setJobLocation}
                selectedId={jobLocation}
                layout="row"
                color={colors.primary}
              />
            </View>
          </View>

          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Location"
              autoCorrect={false}
              autoCapitalize={'none'}
              value={locationAddress}
              onChangeText={(text) => setLocationAddress(text)}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight400,
                GlobalStyles.textNavyBlue,
                { justifyContent: 'center' },
              ]}
            >
              Job Experience{' '}
              <Text
                style={[
                  GlobalStyles.fontInterMedium,
                  GlobalStyles.fontSize15,
                  GlobalStyles.fontWeight400,
                  GlobalStyles.textRed,
                ]}
              >
                *
              </Text>
            </Text>
            <View
              style={[
                GlobalStyles.flewRow,
                GlobalStyles.mt20,
                { flexWrap: 'wrap', gap: 10 },
              ]}
            >
              {JOB_EXPERIENCE.filter((item) => item.label !== 'All').map(
                (item, i) => (
                  <JobType
                    isSelected={item.value === jobExperience}
                    onPress={() => setJobExperience(item.value)}
                    text={item.label}
                    key={i}
                  />
                ),
              )}
            </View>
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Input
              placeholder="Salary*"
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType="number-pad"
              value={salary}
              mode="currency"
              onChangeText={(text) => {
                setSalary(text);
              }}
            />
          </View>
          <View style={[GlobalStyles.mb20]}>
            <Text
              style={[
                GlobalStyles.fontInterMedium,
                GlobalStyles.fontSize15,
                GlobalStyles.fontWeight400,
                GlobalStyles.textNavyBlue,
                { justifyContent: 'center' },
              ]}
            >
              Tailor
            </Text>
            <View
              style={[
                // GlobalStyles.flewRow,
                GlobalStyles.mt20,

                // { flexWrap: "wrap", gap: 10 },
              ]}
            >
              {TAILOR_JOBS.map((item, i) => (
                <Checkbox.Item
                  key={i}
                  uncheckedColor={colors.grey}
                  status={
                    tailorJob.findIndex((value) => item.value === value) !== -1
                      ? 'checked'
                      : 'indeterminate'
                  }
                  label={item.label}
                  position="leading"
                  labelStyle={{ textAlign: 'left' }}
                  mode="ios"
                  onPress={() => {
                    // setChecked(!checked);
                    handleOnCheck(item);
                  }}
                />
              ))}
            </View>
          </View>
          <View>
            <Button
              loading={state.createJobStatus === 'loading'}
              onPress={handleOnPress}
              title="Post Job"
            />
          </View>
        </ScrollView>
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={(props: any) => (
            <BottomSheetBackdrop {...props} pressBehavior={'close'} />
          )}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1, flexGrow: 1, flexBasis: 1 }}
            >
              <View style={[GlobalStyles.container]}>
                {INDUSTRIES.map((item, i) => (
                  <IndustryItem
                    text={item}
                    key={i}
                    handleOnSelect={handleOnIndustrySelect}
                    isSelected={item === selectedIndustry}
                  />
                ))}
              </View>
            </ScrollView>
            <View
              style={[
                { marginTop: 30, paddingHorizontal: 16, marginBottom: 20 },
              ]}
            >
              <Button
                onPress={() => bottomSheetRef.current?.close()}
                title="Continue"
              />
            </View>
          </View>
        </BottomSheet>
      </View>
    </KeyboardDismisser>
  );
};

export const IndustryItem = (props: any) => {
  const [items, setItems] = useState<string[]>([]);

  const handleOnSelect = (text: string) => {
    let newItems = [...items];
    if (props.isMultiple) {
      const index = newItems.findIndex((item) => item === text);
      if (index !== -1) {
        newItems.splice(index, 1);
      } else {
        newItems.push(text);
      }
      setItems(newItems);
      props.handleOnSelect(newItems);
    } else {
      const shouldDeSelect = newItems[0] === text;

      newItems = newItems[0] === text ? [] : [text];

      props.handleOnSelect(shouldDeSelect ? '' : text);
      setItems(newItems);
    }
  };

  return (
    <View>
      {(props.options || []).map((item: { label: string; value: string }) => (
        <TouchableOpacity
          onPress={() => handleOnSelect(item.value)}
          style={[GlobalStyles.flewRow, styles.industryRowItem]}
          key={item.value}
        >
          <View
            style={[
              styles.checkWrapper,
              items.includes(item.value)
                ? { backgroundColor: colors.primary }
                : {},
            ]}
          >
            <Feather
              name="check"
              size={20}
              color={items.includes(item.value) ? colors.white : '#88969D'}
            />
          </View>
          <Text
            style={[
              GlobalStyles.pl4,
              GlobalStyles.fontInterMedium,
              GlobalStyles.textNavyBlue,
              GlobalStyles.fontSize15,
            ]}
          >
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export const JobType = (props: any) => {
  return (
    <TouchableOpacity
      onPress={() => props.onPress(props.text)}
      style={[
        styles.JobType,
        props.isSelected ? { backgroundColor: colors.primary } : {},
      ]}
    >
      <Text
        style={[
          GlobalStyles.fontInterMedium,
          GlobalStyles.textGrey,
          GlobalStyles.fontSize13,
          GlobalStyles.fontWeight400,
          props.isSelected ? { color: colors.white } : {},
        ]}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  JobType: {
    backgroundColor: '#F3F5F7',
    borderRadius: 30,
    paddingVertical: 11,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  industryStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: '#2844531a',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 100,
    shadowRadius: 3,
    elevation: 10,
  },
  industryRowItem: {
    marginBottom: 20,
    paddingBottom: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#889669' + addOpacity(20),
  },
  checkWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F5F7',
  },
});

export default PostJob;
