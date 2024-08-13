// DEPENDENCIES
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Stack, useLocalSearchParams } from "expo-router";
import { colors } from "myracketpartner-commons";

// REDUX
import { userProfileAction } from "../../src/redux/slices/usersSlice";

// COMPONENTS
import ProfileComponent from "../../src/pages/Profile";

// FUNCTION
const ProfileId = () => {
  const { profileId } = useLocalSearchParams();
  const userId = profileId;

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.users.userInfo || {});

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        await dispatch(userProfileAction(userId)).unwrap();
      } catch (error) {
        console.log(error);
      }
    };
    // if (!createDate) {
    //   getUserInfo();
    // }
    getUserInfo();
  }, [dispatch, userId]);

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: colors.green },
          headerTintColor: colors.primary,
          headerLeft: () => {},
          headerRight: () => {},
          headerTitle: `${userInfo.userName} - Profile`,
        }}
      />
      <ProfileComponent userInfo={{ ...userInfo, userId }} />
    </>
  );
};
export default ProfileId;
