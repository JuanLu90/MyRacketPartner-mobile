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
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "myracketpartner-commons";
import { useTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";

// COMPONENTS

// IMAGES
import UserDefaultImg from "../images/user-default.png";

// UTILS
import { formatDate, normalizeDate } from "../utils/dateUtil";
import { genderOptions, translateOptions } from "../utils/typesUtil";

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

  const handleChangeBirthdate = (date) => {
    setUserState((prevState) => ({
      ...prevState,
      // birthdate: formatDateMySql(date),
      birthdate: normalizeDate(date),
    }));
  };

  const handleChangeGender = (value) => {
    setUserState((prevState) => ({
      ...prevState,
      gender: value,
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

  if (!isAdmin) return;

  // const InfoItem = ({ label, value }) => (
  //   <View style={styles.infoItem}>
  //     <Text style={styles.infoLabel}>{label}</Text>
  //     <Text style={styles.infoValue}>{value ?? "-"}</Text>
  //   </View>
  // );

  const { width } = Dimensions.get("window");

  const generalWidth = width - 65;

  return (
    <ScrollView>
      <Text style={styles.sectionTitle}>{t("EditProfile.Personal.Title")}</Text>
      <View
        style={{
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
          {/* 
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                borderColor: colors.greyDark,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
                marginBottom: 20,
              },
            ]}
            onChangeText={(value) => handleChange(value, "Birthdate")}
            value={userState?.Birthdate}
          />*/}
        </View>
        <View>
          <Text style={{ color: colors.greyLight, marginBottom: 7 }}>
            {t("EditProfile.Personal.Gender.Title")}
          </Text>
          <RNPickerSelect
            onValueChange={handleChangeGender}
            items={translateOptions(genderOptions, t)}
            style={{
              inputIOS: { ...styles.inputSelect, width: generalWidth },
              inputAndroid: { ...styles.inputSelect, width: generalWidth },
            }}
            darkTheme
            doneText="OK"
          />
          {/*
          <TextInput
            style={[
              styles.input,
              {
                width: generalWidth,
                borderColor: colors.greyDark,
                // borderColor: errorState.email ? colors.orange : colors.greyDark,
                marginBottom: 20,
              },
            ]}
            onChangeText={(value) => handleChange(value, "firstName")}
            value={userState?.firstName}
          />*/}
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
    marginBottom: 10,
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
});

export default EditProfile;
