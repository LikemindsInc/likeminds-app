import { FC, useEffect, useRef, useState } from "react";
import Input, { ITextInputProps } from "../Input/Input";
import { Platform, Text, TextInput, View } from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Popover from "react-native-popover-view";
import Button from "../Button/Button";
import DateFormatter from "../../utils/date-formatter";
import { GlobalStyles } from "../../theme/GlobalStyles";

interface IProps extends ITextInputProps {
  onDateChange?: (data: Date) => void;
}

const DatePicker: FC<IProps> = (props) => {
  const ref = useRef<TextInput>(null);
  const [date, setDate] = useState<Date>(new Date(props.value || new Date()));

  const [show, setShow] = useState(false);

  const onStartDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate;

    if (currentDate) setDate(currentDate);
  };

  const handleDateSelect = () => {
    if (Platform.OS === "android") {
      setShow(false);
      return DateTimePickerAndroid.open({
        value: date,
        onChange: onStartDateChange,
        mode: "date",
        is24Hour: true,
      });
    }
    setShow(true);
  };

  useEffect(() => {
    if (date && ref.current)
      ref.current.setNativeProps({
        text: DateFormatter.format(date, "YYYY-MM-DD"),
      });
    props.onDateChange && props.onDateChange(date);
  }, [date]);
  return (
    <View style={[props.style]}>
      <View>
        <Input
          editable={false}
          inputRef={ref}
          onPress={handleDateSelect}
          pointerEvents="none"
          placeholder={props.placeholder}
          errorMessage={props.errorMessage}
        />
      </View>

      <Popover isVisible={show} onRequestClose={() => setShow(false)}>
        <View style={{ paddingHorizontal: 16, paddingVertical: 16 }}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={"date"}
            onChange={onStartDateChange}
            display="inline"
          />
          <View
            style={{
              flexDirection: "row",
              gap: 20,
              justifyContent: "flex-end",
            }}
          >
            <Button
              title="Ok"
              style={{ paddingVertical: 8 }}
              onPress={() => setShow(false)}
            />
          </View>
        </View>
      </Popover>
    </View>
  );
};

export default DatePicker;
