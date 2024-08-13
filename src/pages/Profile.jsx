// DEPENDENCIES
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { colors } from "myracketpartner-commons";

// COMPONENTS
import Screen from "./Screen";

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

  const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value ?? "-"}</Text>
    </View>
  );

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
        <View>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.wrapperInfo}>
            <InfoItem label="Name" value={firstName} />
            <InfoItem label="Surname" value={lastName} />
            <InfoItem label="Birthdate" value={birthdate} />
            <InfoItem label="Gender" value={gender} />
            <InfoItem label="Place" value="-" />
            <InfoItem label="Telephone" value="-" />
            <InfoItem label="Email" value={email} />
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.wrapperInfo}>
            <InfoItem label="User ID" value={`#${userId}`} />
            <InfoItem label="Username" value={userName} />
            <InfoItem label="Creation Date" value={createDate} />
            <InfoItem label="Password" value="********" />
          </View>
        </View>
        <View>
          <Text style={styles.sectionTitle}>Player Information</Text>
          <View style={styles.wrapperInfo}>
            <InfoItem label="Lefty/Righty" value={dominantHand} />
            <InfoItem label="Backhand" value={backhand} />
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
