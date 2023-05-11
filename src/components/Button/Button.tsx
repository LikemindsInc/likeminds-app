import { LinearGradient } from "expo-linear-gradient";
import { FC } from "react";
import { GlobalStyles } from "../../theme/GlobalStyles";
import {
  Text,
  View,
  TouchableOpacity,
  ButtonProps,
  ViewStyle,
} from "react-native";

interface IButtonProps extends ButtonProps {
  Icon?: JSX.Element;
  type?: "secondary" | "primary" | "outline-primary" | "cancel";
  style?: ViewStyle;
}

const Button: FC<IButtonProps> = (props) => {
  if (props.type === "outline-primary") {
    return (
      <View>
        {props.disabled ? (
          <View
            style={[
              GlobalStyles.buttonStyle,
              { backgroundColor: "#88969D" },
              props.style ? props.style : {},
            ]}
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
            <View
              style={[
                GlobalStyles.buttonStyle,
                GlobalStyles.primaryButtonOnline,
                props.style ? props.style : {},
              ]}
            >
              <Text
                style={[
                  GlobalStyles.textPrimary,
                  GlobalStyles.fontInterRegular,
                  GlobalStyles.fontSize13,
                ]}
              >
                {props.title}
              </Text>
              <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View>
      {props.disabled ? (
        <View
          style={[
            GlobalStyles.buttonStyle,
            { backgroundColor: "#88969D" },
            props.style ? props.style : {},
          ]}
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
            style={[GlobalStyles.buttonStyle, props.style ? props.style : {}]}
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
