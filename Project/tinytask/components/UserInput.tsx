import React, { FC } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";
import {
  Text as ThemedText,
  View as ThemedView,
  useThemeColor,
} from "./Themed";


{
  /* ACCESSING AND SENDING VALUES TO TEXT INPUT*/
}
interface UserInputProps
  extends Omit<TextInputProps, "autoCompleteType" | "keyboardType"> {
  name: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  autoCompleteType?: string;
  keyboardType?: string;
  secureTextEntry?: boolean;
}

const UserInput: FC<UserInputProps> = ({
  name,
  value,
  setValue,
  autoCompleteType = "off",
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  const textColor = useThemeColor(
    {
      light: "#FFFFFF", // Set text color for light mode
      dark: "#000000", // Set text color for dark mode
    },
    "text" // Accessing text color from theme
  );

  const borderBottomColor = useThemeColor(
    {
      light: "#8e93a1", // Set border color for light mode
      dark: "#8e93a1", // Set border color for dark mode
    },
    "borderColor" // Accessing border color from theme
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.label, { color: textColor }]}>
        {name}
      </ThemedText>
      <TextInput
        autoCorrect={false}
        keyboardType={keyboardType as any}
        secureTextEntry={secureTextEntry}
        style={[styles.input, { borderBottomColor, color: textColor }]}
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      {/* USER INPUT (TEXT) WILL BE SENT TO setValue FUNCTION TO SET VALUE FOR THE STATE */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 0.5,
    height: 48,
    marginBottom: 30,
  },
});

export default UserInput;
