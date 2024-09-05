// DEPENDENCIES
import { useState } from "react";
import { View, Text, TextInput, Pressable, Dimensions } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

// REDUX
import { sendSuggestionsAction } from "store/slices/usersSlice";

// STYLES
import styles from "./Suggestions.styled";

// FUNCTION
const Suggestions = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const initialSuggestionsState = {
    suggestions: "",
    shareSuggestion: 0,
  };

  const [suggestionsState, setSuggestionsState] = useState(
    initialSuggestionsState,
  );
  const [errorState, setErrorState] = useState({});

  const validateSuggestions = () => {
    const { suggestions } = suggestionsState;
    const errors = {};

    if (!suggestions) errors.suggestions = "Suggestions is required.";
    else if (suggestions.length < 6 || suggestions.length > 3000)
      errors.suggestions = "suggestions length between 6 and 3000 characters";

    setErrorState(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    let finalValue = value;

    if (type === "checkbox") {
      finalValue = checked ? 1 : 0;
    }

    setSuggestionsState((prevSuggestions) => {
      return {
        ...prevSuggestions,
        [name]: finalValue,
      };
    });
  };

  const handleSendSuggestions = async () => {
    if (!validateSuggestions()) return;

    try {
      await dispatch(sendSuggestionsAction(suggestionsState)).unwrap();
      // await dispatch(
      //   toastAction({ message: response, type: "SUCCESS" })
      // ).unwrap();
      setSuggestionsState(initialSuggestionsState);
    } catch (error) {
      console.log(error);
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" })
      // ).unwrap();
    }
  };

  const { width } = Dimensions.get("window");
  const generalWidth = width - 65;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>{t("Suggestions.Title")}</Text>
      <Text style={styles.subtitle}>{t("Suggestions.Description")}</Text>

      <TextInput
        style={[
          styles.textAreaInput,
          errorState.suggestions && { borderColor: colors.orange },
        ]}
        multiline
        numberOfLines={4}
        value={suggestionsState.suggestions}
        onChangeText={(text) =>
          handleChange({ target: { name: "suggestions", value: text } })
        }
        placeholder={t("Suggestions.PlaceholderTextArea")}
        placeholderTextColor={colors.greyLight}
      />

      <View style={[styles.wrapperCheckBox, { maxWidth: generalWidth }]}>
        <CheckBox
          value={suggestionsState.shareSuggestion}
          onValueChange={(newValue) =>
            handleChange({
              target: { name: "shareSuggestion", value: newValue },
            })
          }
          onTintColor={colors.orange}
          onFillColor={colors.orange}
          onCheckColor={colors.white}
          animationDuration="0"
          boxType="square"
          style={{ width: 20, height: 20 }}
        />
        <Pressable
          onPress={(prevState) =>
            setSuggestionsState({
              ...prevState,
              shareSuggestion: !suggestionsState.shareSuggestion,
            })
          }
        >
          <Text style={styles.checkboxLabel}>
            {t("Suggestions.CheckboxShare")}
          </Text>
        </Pressable>
      </View>

      <Pressable
        style={styles.createSuggestionsButton}
        onPress={handleSendSuggestions}
      >
        <Text style={styles.buttonText}>{t("Suggestions.SendButton")}</Text>
      </Pressable>
    </View>
  );
};

export default Suggestions;
