// DEPENDENCIES
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { colors } from "myracketpartner-commons";
import { useTranslation } from "react-i18next";

// COMPONENTS
import Screen from "./Screen";
import EditProfile from "../components/EditProfile";

// IMAGES
import UserDefaultImg from "../images/user-default.png";

// UTILS
import { calculateAge, formatDate } from "../utils/dateUtil";
import { getCountry } from "../utils/countriesUtil";
// import { getFlagImage } from "../utils/countriesUtil";

// FUNCTION
const Profile = ({ userInfo, userIdPath, userId }) => {
  const {
    email,
    firstName,
    lastName,
    userName,
    gender,
    birthdate,
    createDate,
    profileImage,
    dominantHand,
    backhand,
  } = userInfo;

  const { t } = useTranslation();

  const [editProfileActive, setEditProfileActive] = useState(false);

  const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? "-"}</Text>
    </View>
  );

  const isAdmin = userId === userIdPath;
  const defaultValue = (value) => value ?? "-";

  return (
    <ScrollView>
      <Screen>
        <View style={styles.firstBlock}>
          <Image
            source={profileImage ? { uri: profileImage } : UserDefaultImg}
            style={styles.userProfileIcon}
          />
          <Text style={styles.nameInfo}>
            {userName} #{userId}
          </Text>
        </View>
        {/* <EditProfile /> */}

        {isAdmin && (
          <View style={styles.wrapperButtons}>
            {editProfileActive ? (
              <Pressable
                style={styles.button}
                onPress={() => setEditProfileActive(false)}
              >
                <Text style={{ color: "white", fontSize: 17 }}>Volver</Text>
              </Pressable>
            ) : (
              <Pressable
                style={styles.button}
                onPress={() => setEditProfileActive(true)}
              >
                <Text style={{ color: "white", fontSize: 17 }}>
                  Editar perfil
                </Text>
              </Pressable>
            )}
          </View>
        )}

        <View>
          <View style={styles.userInfo}>
            <View
              style={[
                styles.userInfoChild,
                { backgroundColor: colors.greyLightSemiTransparent },
              ]}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {t("Profile.Age")}
              </Text>
              <View>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  {calculateAge(birthdate)} ({formatDate(birthdate)})
                </Text>
              </View>
            </View>
            <View
              style={[
                styles.userInfoChild,
                { backgroundColor: colors.greyLightSemiTransparent },
              ]}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {t("Profile.Height")}
              </Text>
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {defaultValue(userInfo?.height)}
                {userInfo?.height && " cm"}
              </Text>
            </View>
            <View
              style={[
                styles.userInfoChild,
                { backgroundColor: colors.greyLightSemiTransparent },
              ]}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {t("Profile.Weight")}
              </Text>
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {defaultValue(userInfo?.weight)}
                {userInfo?.weight && " kg"}
              </Text>
            </View>
            <View
              style={[
                styles.userInfoChild,
                { backgroundColor: colors.greyLightSemiTransparent },
              ]}
            >
              <Text style={{ color: colors.white, fontSize: 18 }}>
                {t("Profile.Country")}
              </Text>
              <View style={styles.countryInfo}>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  <Image
                    source={getCountry(userInfo.country)?.flag}
                    style={{ width: 25, height: 15, marginRight: 10 }}
                  />
                  {getCountry(userInfo.country)?.name}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Screen>
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
  wrapperButtons: {
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  button: {
    color: "#ffffff" /* Color del texto blanco */,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 4 /* Bordes redondeados */,
    borderWidth: 2,
    borderColor: "#ffffff",
    margin: "auto",
  },
  userInfo: {
    marginBottom: 55,
  },
  userInfoChild: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 12,
  },
  countryInfo: {
    display: "flex",
  },
});

export default Profile;
