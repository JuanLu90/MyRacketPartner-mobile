// DEPENDENCIES
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";
import { useTranslation } from "react-i18next";

// COMPONENTS

// IMAGES
import UserDefaultImg from "../images/user-default.png";

// UTILS
import { formatDate } from "../utils/dateUtil";

// FUNCTION
const Profile = ({ userInfo }) => {
  const {
    userId,
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

  const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? "-"}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View style={styles.firstBlock}>
        <Image
          source={profileImage ? { uri: profileImage } : UserDefaultImg}
          style={styles.userProfileIcon}
        />
        <Text style={styles.nameInfo}>
          {userName} #{userId}
        </Text>
      </View>
      <View>
        <Text style={styles.sectionTitle}>{t("Profile.Personal.Title")}</Text>
        <View style={styles.wrapperInfo}>
          <InfoItem label={t("Profile.Personal.Name")} value={firstName} />
          <InfoItem label={t("Profile.Personal.Surname")} value={lastName} />
          <InfoItem label={t("Profile.Personal.Birthdate")} value={birthdate} />
          <InfoItem label={t("Profile.Personal.Gender")} value={gender} />
          <InfoItem label={t("Profile.Personal.Place")} value="-" />
          <InfoItem label={t("Profile.Personal.Phone")} value="-" />
          <InfoItem label={t("Profile.Personal.Email")} value={email} />
        </View>
      </View>
      <View>
        <Text style={styles.sectionTitle}>{t("Profile.Account.Title")}</Text>
        <View style={styles.wrapperInfo}>
          <InfoItem label={t("Profile.Account.Id")} value={`#${userId}`} />
          <InfoItem label={t("Profile.Account.Username")} value={userName} />
          <InfoItem
            label={t("Profile.Account.CreationDate")}
            value={formatDate(createDate)}
          />
          <InfoItem label={t("Profile.Account.Password")} value="********" />
        </View>
      </View>
      <View>
        <Text style={styles.sectionTitle}> {t("Profile.Player.Title")}</Text>
        <View style={styles.wrapperInfo}>
          <InfoItem label={t("Profile.Player.Mainhand")} value={dominantHand} />
          <InfoItem label={t("Profile.Player.Backhand")} value={backhand} />
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
});

export default Profile;
