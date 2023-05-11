import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { GlobalStyles } from "../../theme/GlobalStyles";
import { Text, View, TouchableOpacity, ButtonProps } from "react-native";

interface IButtonProps extends ButtonProps {
  Icon?: JSX.Element;
  type?: "secondary" | "primary" | "outline" | "cancel";
}

const Button: FC<IButtonProps> = (props) => {
  return (
    <View>
      {props.disabled ? (
        <View
          style={[GlobalStyles.buttonStyle, { backgroundColor: "#88969D" }]}
        >
          <Text
            style={[
              GlobalStyles.textWhite,
              GlobalStyles.fontInterRegular,
              GlobalStyles.fontSize13,
            ]}
          >
            {props.title}
          </Text>
          <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
        </View>
      ) : (
        <TouchableOpacity onPress={props.onPress}>
          <LinearGradient
            style={[GlobalStyles.buttonStyle]}
            colors={["#00CDFE", "#009AEE"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text
              style={[
                GlobalStyles.textWhite,
                GlobalStyles.fontInterRegular,
                GlobalStyles.fontSize13,
              ]}
            >
              {props.title}
            </Text>
            <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;
