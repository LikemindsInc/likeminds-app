import React, { RefObject, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import colors from '../../theme/colors';
import { Checkbox } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import DateFormatter from '../../utils/date-formatter';
import { SelectList } from 'react-native-dropdown-select-list';
import useAppSelector from '../../hooks/useAppSelector';
import { useFormik } from 'formik';
import { educationValidator, initialEducationValues } from './validator';
import { addExperience } from '../../store/slice/addExperience';
import useAppDispatch from '../../hooks/useAppDispatch';
import { resetAddExperienceSuccess } from '../../reducers/userProfileSession';

import { ISchool } from '@app-model';
import { SCHOOL_DEGREES } from '../../constants';
import DatePicker from '../../components/DatePicker/DatePicker';
import { GlobalStyles } from '../../theme/GlobalStyles';
import TextInputElement from '../../components/Input/TextInput';
import Button from '../../components/Button/Button';
import AutoCompleteInput from '../../components/AutoCompleteInput/AutoCompleteInput';

const AddEducationForm = ({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<null>;
}) => {
  const dispatch = useAppDispatch();

  const setting = useAppSelector((state) => state.settingReducer);
  const session = useAppSelector((state) => state.sessionReducer.profileData);
  const snapPoints = ['100%'];
  const [school, setSchool] = useState('');
  const [schools, setSchools] = useState<ISchool[]>([]);

  const handleOnSchoolFilter = (query: string) => {
    if (query.trim() === '') setSchools(setting.schools);
    else {
      const data = setting.schools.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase().trim()),
      );
      setSchools(data);
    }

    setSchool(query);
    setFieldValue('school', query);
  };

  const handleClose = () => {
    resetForm();
    setFieldValue('degree', '');
    bottomSheetRef.current?.close();
  };

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
      onPress={() => handleClose()}
    >
      <AntDesign name="close" size={24} color="black" />
    </TouchableOpacity>
  );

  const handleAddEduction = () => {
    dispatch(
      addExperience({
        education: [values],
      }),
    );
  };

  const {
    touched,
    values,
    handleChange,
    setFieldValue,
    errors,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialEducationValues,
    validationSchema: educationValidator,
    onSubmit: () => handleAddEduction(),
  });

  useEffect(() => {
    if (session.isAddExperienceSuccessfully) {
      bottomSheetRef.current?.close();
    }
    return () => {
      resetForm();
      dispatch(resetAddExperienceSuccess());
    };
  }, [session.isAddExperienceSuccessfully]);

  console.log(session.education);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enablePanDownToClose={true} // Enable pan down to close the sheet
      handleComponent={renderHeader}
    >
      <View
        style={{
          flex: 1,
          marginTop: 80,
          backgroundColor: colors.white,
        }}
      >
        <View
          style={{
            paddingHorizontal: 16,
          }}
        >
          <Text style={styles.title}>Add Education</Text>
          <View style={[styles.inputDouble]}>
            <DatePicker
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
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <View
            style={[
              { flex: 1, backgroundColor: 'white' },
              styles.fieldContainer,
            ]}
          >
            <View style={[GlobalStyles.mb10]}>
              <TextInputElement
                placeholder="Major"
                autoCorrect={false}
                autoCapitalize={'none'}
                keyboardType="default"
                value={values.major}
                error={touched.major ? errors.major : null}
                onChangeText={handleChange('major')}
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
                setSelected={(val: string) => setFieldValue('degree', val)}
                data={SCHOOL_DEGREES.map((item) => ({
                  key: item,
                  value: item,
                }))}
                placeholder="Choose Degree"
                fontFamily="Inter-Regular"
                arrowicon={
                  <AntDesign
                    name="caretdown"
                    size={20}
                    color={colors.primary}
                  />
                }
              />
            </View>
            <View style={[GlobalStyles.mb10]}>
              <AutoCompleteInput
                data={(schools || []).map((item) => item.name)}
                onChangeText={handleOnSchoolFilter}
                value={values.school}
              />
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            GlobalStyles.mb10,
            {
              paddingHorizontal: 16,
            },
          ]}
        >
          <Button
            loading={session.isAddExperienceLoading}
            title="Add Education"
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  fieldContainer: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: 'white',
  },
});

export default AddEducationForm;
