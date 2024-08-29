// DEPENDENCIES
import { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";

// REDUX
import { editUserInfoAction, userProfileAction } from "store/slices/usersSlice";

// IMAGES
import UserDefaultImg from "images/user-default.png";

// UTILS
import { formatDate, normalizeDate } from "utils/dateUtil";
import {
  backhandOptions,
  dominantHandOptions,
  genderOptions,
  translateOptions,
} from "utils/typesUtil";
import { countries } from "utils/countriesUtil";

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

  const [userState, setUserState] = useState(initialState);

  const handleChange = (value, name) => {
    setUserState((prevUser) => ({
      ...prevUser,
      [name]: value === "" ? null : value,
    }));
  };

  const handleChangeBirthdate = (_, date) => {
    setUserState((prevState) => ({
      ...prevState,
      // birthdate: formatDateMySql(date),
      birthdate: normalizeDate(date),
    }));
  };

  const onSubmit = async () => {
    // if (!validateState()) return;
    try {
      await dispatch(editUserInfoAction(userState)).unwrap();
      await dispatch(userProfileAction(userId)).unwrap();
      closeEditProfile();
      // await dispatch(toastAction(response)).unwrap();
    } catch (error) {
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" })
      // ).unwrap();
    }
  };

  const compareObj = JSON.stringify(initialState) === JSON.stringify(userState);

  // const InfoItem = ({ label, value }) => (
  //   <View style={styles.infoItem}>
  //     <Text style={styles.infoLabel}>{label}</Text>
  //     <Text style={styles.infoValue}>{value ?? "-"}</Text>
  //   </View>
  // );

  const { width } = Dimensions.get("window");

  const generalWidth = width - 65;

  // const [date, setDate] = useState(new Date(userState.birthdate));

  // const onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate;
  //   setDate(currentDate);
  // };
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
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Email")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                backgroundColor: colors.greyDark,
                opacity: 0.5,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "email")}
            value={userInfo?.email}
            editable={false}
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Name")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "firstName")}
            value={userState?.firstName}
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Lastname")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "lastName")}
            value={userState?.lastName}
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Birthdate")}
          </Text>
          <DateTimePicker
            testID="dateTimePicker"
            value={userState.birthdate}
            mode="date"
            onChange={handleChangeBirthdate}
            display="default"
            style={{ ...styles.inputSelect, width: generalWidth }}
          />
          {/* <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "birthdate")}
            value={formatDate(userState?.birthdate)}
            onPress={() => console.log("aaaaaa")}
            editable={false}
          /> */}
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Gender.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "gender")}
            value={userState.gender}
            items={translateOptions(genderOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Height")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "height")}
            value={String(userState?.height)}
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Weight")}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,

                // borderColor: errorState.email ? colors.orange : colors.greyDark,
              },
            ]}
            onChangeText={(value) => handleChange(value, "weight")}
            value={String(userState?.weight)}
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("Profile.Country")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "country")}
            value={userState.country}
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
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Player.DominantHand.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "dominantHand")}
            value={userState.dominantHand}
            items={translateOptions(dominantHandOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Player.Backhand.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={(value) => handleChange(value, "backhand")}
            value={userState.backhand}
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

const styles = StyleSheet.create({
  firstBlock: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 30,
  },
  userProfileIcon: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  nameInfo: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.white,
  },
  wrapperInfo: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.greyDarkSemiTransparent, // Adjust based on your theme
  },
  sectionTitle: {
    marginVertical: 10,
    paddingHorizontal: 22,
    fontSize: 20,
    fontWeight: "bold",
    color: colors.white,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  infoLabel: {
    color: colors.greyLight,
    fontSize: 16,
  },
  infoValue: {
    color: colors.white,
    fontSize: 16,
  },
  input: {
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.greyDark,
  },
  inputSelect: {
    height: 45,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: colors.white,
    borderWidth: 1,
    borderColor: colors.greyDark,
  },
  wrapperSendButton: {
    marginBottom: 20,
  },
});

export default EditProfile;
