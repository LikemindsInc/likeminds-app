import React, { RefObject, useRef, useState } from 'react';
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
import Input from '../../components/Input/Input';
import colors from '../../theme/colors';
import DatePicker from '../../components/DatePicker/DatePicker';
import { Checkbox } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import DateFormatter from '../../utils/date-formatter';
import { SelectList } from 'react-native-dropdown-select-list';
import useAppSelector from '../../hooks/useAppSelector';
import { useFormik } from 'formik';
import { initialSignupValues, signupValidator } from './validator';

const AddExperienceForm = ({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<null>;
}) => {
  const [stillWorkHere, setStillWorkHere] = useState(false);
  const settings = useAppSelector((state) => state.settingReducer);
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

  const {} = useFormik({
    initialValues: initialSignupValues,
    validationSchema: signupValidator,
    onSubmit: () => {},
  });

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
              onDateChange={
                (date) => {}
                // setStartDate(DateFormatter.format(date, 'YYYY-MM-DD'))
              }
              placeholder="Start Date"
              style={styles.inputFlex}
              //   errorMessage={errors.startDate}
            />
            {!stillWorkHere && (
              <DatePicker
                onDateChange={
                  (date) => {}
                  //   setEndDate(DateFormatter.format(date, 'YYYY-MM-DD'))
                }
                placeholder="End Date"
                style={styles.inputFlex}
                // errorMessage={errors.endDate}
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
              onChange={(value) => setStillWorkHere((state) => !state)}
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
            <Input
            //   value={jobTitle}
            //   onChangeText={(text) => setJobTitle(text)}
            //   placeholder="Job Title"
            //   errorMessage={errors.jobTitle}
            />
          </View>
          <View style={[GlobalStyles.mb10]}>
            <Input
            //   value={companyName}
            //   onChangeText={(text) => setCompanyName(text)}
            //   placeholder="Company Name"
            //   errorMessage={errors.companyName}
            />
          </View>
          {/* <View style={[GlobalStyles.mb10]}>
          <Input
            value={industry}
            onChangeText={(text) => setIndustry(text)}
            placeholder="Industry"
            errorMessage={errors.industry}
          />
        </View> */}
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
              setSelected={(val: string) => {}}
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
            <Input
              //   value={responsibilities}
              //   onChangeText={(text) => setResponsibilities(text)}
              //   placeholder="Responsibilities"
              multiline
              //   errorMessage={errors.responsibilities}
              inputContainer={{ height: 100, paddingVertical: 8 }}
            />

            <Button title="Add Experience" onPress={() => {}} />
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
