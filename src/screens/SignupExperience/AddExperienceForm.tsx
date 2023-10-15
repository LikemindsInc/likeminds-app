import React, { RefObject, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import Button from '../../components/Button/Button';
import { GlobalStyles } from '../../theme/GlobalStyles';
import colors from '../../theme/colors';
import DatePicker from '../../components/DatePicker/DatePicker';
import { Checkbox } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import DateFormatter from '../../utils/date-formatter';
import { SelectList } from 'react-native-dropdown-select-list';
import useAppSelector from '../../hooks/useAppSelector';
import { useFormik } from 'formik';
import { experienceValidator, initialExperienceValues } from './validator';
import { addExperience } from '../../store/slice/addExperience';
import TextInputElement from '../../components/Input/TextInput';
import useAppDispatch from '../../hooks/useAppDispatch';
import { resetAddExperienceSuccess } from '../../reducers/userProfileSession';

const AddExperienceForm = ({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<null>;
}) => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state) => state.settingReducer);
  const session = useAppSelector((state) => state.sessionReducer.profileData);
  const snapPoints = ['100%'];

  const renderHeader = () => (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 5,
        left: 16,
        zIndex: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: '#00CDFE',
        flex: 1,

        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => bottomSheetRef.current?.close()}
    >
      <AntDesign name="close" size={24} color="black" />
    </TouchableOpacity>
  );

  const {
    touched,
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialExperienceValues,
    validationSchema: experienceValidator,
    onSubmit: () => handleAddExperience(),
  });

  const handleAddExperience = () => {
    dispatch(
      addExperience({
        experience: [values],
      }),
    );
  };

  useEffect(() => {
    if (session.isAddExperienceSuccessfully) {
      bottomSheetRef.current?.close();
    }
    // resetAddExperienceSuccess
    return () => {
      resetForm();
      dispatch(resetAddExperienceSuccess());
    };
  }, [session.isAddExperienceSuccessfully]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Enable pan down to close the sheet
      handleComponent={renderHeader}
    >
      <View style={{ flex: 1, padding: 16, backgroundColor: 'white' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <Text style={styles.title}>Add Experience</Text>
          <View style={[styles.inputDouble]}>
            <DatePicker
              defaultValue={values.startDate}
              value={values.startDate}
              onDateChange={(date) =>
                setFieldValue(
                  'startDate',
                  DateFormatter.format(date, 'YYYY-MM-DD'),
                )
              }
              placeholder="Start Date"
              style={styles.inputFlex}
              errorMessage={touched.startDate ? errors.startDate : null}
            />
            {!values.stillWorkHere && (
              <DatePicker
                defaultValue={values.endDate}
                value={values.endDate}
                onDateChange={(date) =>
                  setFieldValue(
                    'endDate',
                    DateFormatter.format(date, 'YYYY-MM-DD'),
                  )
                }
                placeholder="End Date"
                style={styles.inputFlex}
                errorMessage={touched.endDate ? errors.endDate : null}
              />
            )}
          </View>
          <View
            style={[
              GlobalStyles.mb20,
              GlobalStyles.displayRow,
              { alignItems: 'center' },
            ]}
          >
            <Checkbox
              value="STILL_WORK_HERE"
              accessibilityLabel="choose numbers"
              onChange={(value) =>
                setFieldValue('stillWorkHere', !values.stillWorkHere)
              }
            />
            <View style={{ paddingLeft: 8 }}>
              <Text
                style={[
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.textGrey,
                  GlobalStyles.fontSize15,
                ]}
              >
                I still work here
              </Text>
            </View>
          </View>
          <View style={[GlobalStyles.mb10]}>
            <TextInputElement
              placeholder="Job Title"
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType="default"
              value={values.jobTitle}
              error={touched.jobTitle ? errors.jobTitle : null}
              onChangeText={handleChange('jobTitle')}
              returnKeyType="done"
            />
          </View>
          <View style={[GlobalStyles.mb10]}>
            <TextInputElement
              placeholder="Company name"
              autoCorrect={false}
              autoCapitalize={'none'}
              keyboardType="default"
              value={values.companyName}
              error={touched.companyName ? errors.companyName : null}
              onChangeText={handleChange('companyName')}
              returnKeyType="done"
            />
          </View>
          <View style={[GlobalStyles.mb30]}>
            <SelectList
              boxStyles={{
                borderWidth: 0,
                paddingVertical: 21,
                backgroundColor: colors.white,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 4,
                },
                shadowOpacity: 0.1,
                shadowRadius: 16,
                elevation: 4,
              }}
              save="key"
              setSelected={(val: string) => setFieldValue('industry', val)}
              data={(settings.industries || []).map((item) => ({
                key: item.name,
                value: item.name,
              }))}
              placeholder="Industry"
              fontFamily="Inter-Regular"
              arrowicon={
                <AntDesign name="caretdown" size={20} color={colors.primary} />
              }
            />
          </View>
          <View style={[GlobalStyles.mb10]}>
            <TextInputElement
              placeholder="Type in your job description"
              autoCorrect={false}
              multiline
              autoCapitalize={'none'}
              keyboardType="default"
              value={values.responsibilities}
              error={touched.responsibilities ? errors.responsibilities : null}
              onChangeText={handleChange('responsibilities')}
              returnKeyType="done"
              style={{
                height: 100,
                padding: 16,
              }}
            />

            <Button
              loading={session.isAddExperienceLoading}
              title="Add Experience"
              onPress={() => handleSubmit()}
            />
          </View>
        </ScrollView>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputDouble: {
    flexDirection: 'row',
    gap: 20,
  },
  inputFlex: {
    flex: 1,
  },
});

export default AddExperienceForm;
