// DEPENDENCIES
import { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  TextInput,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

// REDUX
import { editUserInfoAction, userProfileAction } from "store/slices/usersSlice";

// HOOKS
import useFormValidation from "hooks/useFormValidation";

// STYLES
import styles from "./EditProfile.styled";

// UTILS
import { normalizeDate } from "utils/dateUtil";
import {
  backhandOptions,
  dominantHandOptions,
  genderOptions,
  translateOptions,
} from "utils/typesUtil";
import { countries } from "utils/countriesUtil";
import { validateEditProfile } from "utils/validationUtil";

// FUNCTION
const EditProfile = ({ isAdmin, closeEditProfile, userId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const userInfo = useSelector((state) => state.users.userInfo);

  const initialState = useMemo(
    () => ({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      birthdate: normalizeDate(userInfo.birthdate),
      gender: userInfo.gender,
      dominantHand: userInfo.dominantHand,
      backhand: userInfo.backhand,
      height: userInfo.height,
      weight: userInfo.weight,
      country: userInfo.country,
    }),
    [userInfo],
  );

  const {
    formState,
    errors,
    handleChange,
    handleChangeBirthdate,
    handleValidation,
  } = useFormValidation(initialState, validateEditProfile);

  const onSubmit = async () => {
    const isValid = handleValidation();
    if (!isValid) return;

    try {
      await dispatch(editUserInfoAction(formState)).unwrap();
      await dispatch(userProfileAction(userId)).unwrap();
      closeEditProfile();
      // await dispatch(toastAction(response)).unwrap();
    } catch (error) {
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" })
      // ).unwrap();
    }
  };

  const compareObj = JSON.stringify(initialState) === JSON.stringify(formState);

  const { width } = Dimensions.get("window");

  const generalWidth = width - 65;

  if (!isAdmin) return;

  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>{t("EditProfile.Personal.Title")}</Text>
      <View
        style={{
          marginBottom: 30,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: colors.greyDarkSemiTransparent,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Email")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                backgroundColor: colors.greyDark,
                opacity: 0.5,
              },
            ]}
            onChangeText={(value) => handleChange(value, "email")}
            value={userInfo?.email}
            editable={false}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Name")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                borderColor: errors.firstName ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "firstName")}
            value={formState?.firstName}
            placeholder={t("EditProfile.Personal.Name")}
            placeholderTextColor={colors.greyDark}
          />
          {errors.firstName && (
            <Text style={styles.errorLabel}>{errors.firstName}</Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Lastname")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                borderColor: errors.lastName ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "lastName")}
            value={formState?.lastName}
            placeholder={t("EditProfile.Personal.Lastname")}
            placeholderTextColor={colors.greyDark}
          />
          {errors.lastName && (
            <Text style={styles.errorLabel}>{errors.lastName}</Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Birthdate")}
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={formState.birthdate}
            mode="date"
            onChange={handleChangeBirthdate}
            display="default"
            style={{ ...styles.inputSelect, width: generalWidth }}
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Gender.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "gender")}
            value={formState.gender}
            items={translateOptions(genderOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Height")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                borderColor: errors.height ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "height")}
            value={formState?.height && String(formState?.height)}
            placeholder={t("EditProfile.Personal.Height")}
            placeholderTextColor={colors.greyDark}
          />
          {errors.height && (
            <Text style={styles.errorLabel}>{errors.height}</Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Personal.Weight")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,

                borderColor: errors.weight ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "weight")}
            value={formState?.weight && String(formState?.weight)}
            placeholder={t("EditProfile.Personal.Weight")}
            placeholderTextColor={colors.greyDark}
          />
          {errors.weight && (
            <Text style={styles.errorLabel}>{errors.weight}</Text>
          )}
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("Profile.Country")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "country")}
            value={formState.country}
            items={countries}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>{t("EditProfile.Player.Title")}</Text>
      <View
        style={{
          marginBottom: 30,
          paddingVertical: 20,
          paddingHorizontal: 20,
          backgroundColor: colors.greyDarkSemiTransparent,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Player.DominantHand.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "dominantHand")}
            value={formState.dominantHand}
            items={translateOptions(dominantHandOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: colors.greyLight }}>
            {t("EditProfile.Player.Backhand.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "backhand")}
            value={formState.backhand}
            items={translateOptions(backhandOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
      </View>
      <View style={styles.wrapperSendButton}>
        <Button
          onPress={onSubmit}
          title={t("EditProfile.SendButton")}
          accessibilityLabel={t("EditProfile.SendButton")}
          disabled={compareObj}
        />
      </View>
    </ScrollView>
  );
};

export default EditProfile;
