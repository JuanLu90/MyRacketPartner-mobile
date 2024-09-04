// DEPENDENCIES
import { useState } from "react";
import { View, Text, Image, ScrollView, Pressable } from "react-native";
import { colors } from "utils/stylesUtil";
import { useTranslation } from "react-i18next";

// COMPONENTS
import Screen from "../Screen/Screen";
import EditProfile from "./components/EditProfile";

// IMAGES
import UserDefaultImg from "images/user-default.png";
import HandIcon from "images/svg-components/HandIcon";

// STYLES
import styles from "./Profile.styled";

// UTILS
import { calculateAge, formatDate } from "utils/dateUtil";
import { getCountry } from "utils/countriesUtil";
import {
  getLabelForOptions,
  dominantHandOptions,
  backhandOptions,
} from "utils/typesUtil";
// import { getFlagImage } from "utils/countriesUtil";

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
            {firstName} {lastName}
          </Text>
          <Text style={styles.usernameInfo}>
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
        {editProfileActive ? (
          <EditProfile
            isAdmin={isAdmin}
            closeEditProfile={() => setEditProfileActive(false)}
            userId={userIdPath}
          />
        ) : (
          <View>
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

            <Text style={[styles.asPlayerTitle, { color: colors.white }]}>
              {t("Profile.AsPlayer")}
            </Text>

            <View style={[styles.playerBox, { borderColor: colors.greyDark }]}>
              <View style={styles.wrapperHandIcom}>
                <HandIcon />
              </View>
              <View style={styles.wrapperHandIcom}>
                <Text
                  style={{
                    color: colors.white,
                    paddingVertical: 7,
                    fontSize: 18,
                  }}
                >
                  {t("EditProfile.Player.DominantHand.Title")}
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    paddingVertical: 7,
                    fontSize: 18,
                  }}
                >
                  {t(
                    getLabelForOptions(
                      userInfo?.dominantHand,
                      dominantHandOptions,
                    ),
                  )}
                </Text>
              </View>
            </View>
            <View style={[styles.playerBox, { borderColor: colors.greyDark }]}>
              <View style={styles.wrapperHandIcom}>
                <HandIcon transform={[{ scaleX: -1 }]} />
              </View>
              <View>
                <Text style={{ color: colors.white, fontSize: 18 }}>
                  {t("EditProfile.Player.Backhand.Title")}
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontWeight: "bold",
                    paddingVertical: 7,
                    fontSize: 18,
                  }}
                >
                  {t(getLabelForOptions(userInfo?.backhand, backhandOptions))}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Screen>
    </ScrollView>
  );
};

export default Profile;
