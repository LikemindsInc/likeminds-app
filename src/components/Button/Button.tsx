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
import { Spinner } from "native-base";
import colors from "../../theme/colors";

interface IButtonProps extends ButtonProps {
  Icon?: JSX.Element;
  type?: "secondary" | "primary" | "outline-primary" | "cancel" | "tertiary";
  style?: ViewStyle;
  loading?: boolean;
  containerStyle?: ViewStyle;
}

const Button: FC<IButtonProps> = (props) => {
  if (props.type === "tertiary") {
    return (
      <View>
        {props.disabled ? (
          <View
            style={[
              GlobalStyles.buttonStyle,
              { backgroundColor: "#245264" },
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
            {props.loading ? (
              <Spinner color={"#fff"} />
            ) : (
              <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={props.loading ? () => {} : props.onPress}>
            <View
              style={[
                GlobalStyles.buttonStyle,
                { backgroundColor: "#245264" },
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
              {props.loading ? (
                <Spinner color={"#fff"} />
              ) : (
                <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
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
            {props.loading ? (
              <Spinner color={colors.primary} />
            ) : (
              <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={props.loading ? () => {} : props.onPress}>
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
              {props.loading ? (
                <Spinner color={colors.primary} />
              ) : (
                <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  if (props.type === "cancel") {
    return (
      <View style={props.containerStyle}>
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
            {props.loading ? (
              <Spinner color={colors.primary} />
            ) : (
              <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
            )}
          </View>
        ) : (
          <TouchableOpacity onPress={props.loading ? () => {} : props.onPress}>
            <View
              style={[
                GlobalStyles.buttonStyle,
                GlobalStyles.primaryButtonOnline,
                { backgroundColor: "#88969D", borderColor: "#88969D" },
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
              {props.loading ? (
                <Spinner color={colors.primary} />
              ) : (
                <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  return (
    <View style={props.containerStyle ? props.containerStyle : {}}>
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
          {props.loading ? (
            <Spinner color={"#fff"} />
          ) : (
            <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={props.loading ? () => {} : props.onPress}>
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
            {props.loading ? (
              <Spinner color={"#fff"} />
            ) : (
              <View style={[GlobalStyles.pl4]}>{props.Icon}</View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Button;
