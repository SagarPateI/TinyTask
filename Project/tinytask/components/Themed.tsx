/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */
import {
  Text as DefaultText,
  useColorScheme,
  View as DefaultView,
} from "react-native";

import Colors from "../constants/Colors";

type ThemeColors = {
  text: string;
  background: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
  borderColor?: string; // Add borderColor to the type
};

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
} & ThemeColors;

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof ThemeColors
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useBorderColor(
  props: { light?: string; dark?: string; borderColor?: string },
  colorName: "borderColor"
) {
  const theme = useColorScheme() ?? "light";

  // Use a type assertion to narrow down the type
  const borderColor =
    (props[theme] as ThemeColors)?.[colorName] ||
    Colors[theme]?.[colorName] ||
    "";

  return borderColor;
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const {
    style,
    lightColor,
    darkColor,
    borderColor: borderColorProp,
    ...otherProps
  } = props;

  // Extracting borderColor from props or using the default if not provided
  const borderColor = useBorderColor(
    { light: lightColor, dark: darkColor, borderColor: borderColorProp },
    "borderColor"
  );

  return (
    <DefaultView
      style={[
        {
          backgroundColor: useThemeColor(
            { light: lightColor, dark: darkColor },
            "background"
          ),
          borderColor,
        },
        style,
      ]}
      {...otherProps}
    />
  );
}
