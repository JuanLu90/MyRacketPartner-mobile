// DEPENDENCIES
import { useEffect, useState, useMemo } from "react";
const {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
} = require("react-native");

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { matchesAction, newMatchAction } from "store/slices/matchesSlice";

// COMPONENTS
import BottomSheetModal from "components/Modals/BottomSheetModal/BottomSheetModal";

// HOOKS
import useSearchUsers from "hooks/getUsersHook";

// STYLES
import styles from "./AddMatchModal.styled";

// IMAGES
import UserDefaultImg from "images/user-default.png";
import PlusIcon from "images/svg-components/PlusIcon";
import MinusIcon from "images/svg-components/MinusIcon";

// UTILS
import { colors } from "utils/stylesUtil";

// FUNCTION
const AddMatchModal = (props) => {
  const dispatch = useDispatch();

  const { isOpen, closeModal } = props;

  const {
    user: { id, profileImage, username },
  } = useSelector((state) => state.auth);

  const matchInfoInitialState = useMemo(
    () => ({
      matchDate: "2023-09-05 00:00:00",
      user1ID: id,
      user2ID: null,
      sets: [
        {
          winnerID: null,
        },
        {
          winnerID: null,
        },
        {
          winnerID: null,
        },
      ],
      tournamentID: null,
    }),
    [id],
  );

  const [selectUserisActive, setSelectUserisActive] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [matchInfoState, setMatchInfoState] = useState(matchInfoInitialState);

  const [query, setQuery] = useState("");
  const { users, loading, error } = useSearchUsers(query);

  const onSubmit = async () => {
    try {
      await dispatch(newMatchAction(matchInfoState)).unwrap();
      dispatch(matchesAction()).unwrap();

      closeModal();
    } catch (error) {
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" }),
      // ).unwrap();
    }
  };

  const handleChange = (value) => {
    setQuery(value);
  };

  const handleChangeResult = (value, name, playerOrder) => {
    setMatchInfoState((prevState) => {
      const newSets = [...prevState.sets];
      newSets[name] = {
        ...prevState.sets[name],
        [`user${playerOrder}Score`]: value ? Number(value) : null,
      };

      return {
        ...prevState,
        // player1ID: user.id,
        // player2ID: playerSelected.playerID,
        sets: newSets,
      };
    });
  };

  const handleSelectUser = (user) => {
    setUserSelected(user);
    setMatchInfoState((prevState) => ({
      ...prevState,
      user2ID: user.userID,
    }));
    setSelectUserisActive(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setMatchInfoState(matchInfoInitialState);
      setSelectUserisActive(false);
    }
  }, [isOpen, matchInfoInitialState]);

  useEffect(() => {
    setQuery("");
  }, [selectUserisActive]);

  return (
    <BottomSheetModal
      title="Add a result"
      isOpen={isOpen}
      closeModal={closeModal}
      onSubmit={onSubmit}
    >
      <View style={{ padding: 10 }}>
        <View style={styles.wrapperInfoResult}>
          <View style={styles.usersWrapper}>
            <View
              style={[
                styles.userStyled,
                selectUserisActive && { opacity: 0.3 },
              ]}
            >
              <Image
                source={
                  profileImage
                    ? {
                        uri: profileImage,
                      }
                    : UserDefaultImg
                }
                style={styles.userDefaultIcon}
              />
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {username}
              </Text>
            </View>
            <View style={styles.userStyled}>
              {userSelected?.userID ? (
                <>
                  <Image
                    source={
                      userSelected?.profileImage
                        ? {
                            uri: userSelected?.profileImage,
                          }
                        : UserDefaultImg
                    }
                    style={styles.selectedUser}
                    onPress={() => setSelectUserisActive(!selectUserisActive)}
                  />
                  <Pressable
                    onPress={() => handleSelectUser({})}
                    style={styles.unselectUser}
                  >
                    <MinusIcon pathFill={colors.white} />
                  </Pressable>
                </>
              ) : (
                <Pressable
                  onPress={() => setSelectUserisActive(!selectUserisActive)}
                  style={styles.notSelectedUser}
                >
                  <PlusIcon pathFill={colors.white} />
                </Pressable>
              )}
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {userSelected?.userName ?? "Add player"}
              </Text>
            </View>
          </View>

          {!selectUserisActive ? (
            <View style={styles.wrapperResult}>
              <View style={styles.result}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 0, 1)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 0, 2)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
              </View>
              <View style={styles.result}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 1, 1)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 1, 2)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
              </View>
              <View style={styles.result}>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 2, 1)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => handleChangeResult(value, 2, 2)}
                  placeholder="0"
                  placeholderTextColor={colors.greyLightSemiTransparent}
                  // value={userState?.firstName}
                />
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, paddingLeft: 30 }}>
              <TextInput
                style={styles.inputSearchUser}
                onChangeText={handleChange}
                placeholder="Search by username..."
                placeholderTextColor={colors.greyLight}
              />
              <View style={{ marginTop: 18 }}>
                {users.length > 0 &&
                  query &&
                  users?.map((user) => (
                    <Pressable
                      style={styles.option}
                      key={user.userID}
                      onPress={() => handleSelectUser(user)}
                    >
                      <Image
                        source={
                          user?.profileImage
                            ? {
                                uri: user?.profileImage,
                              }
                            : UserDefaultImg
                        }
                        style={styles.searchUserImage}
                      />
                      <View>
                        <Text
                          style={{ color: colors.white, fontWeight: "500" }}
                        >
                          {user.firstName ?? user.userName} {user.lastName}
                        </Text>
                        <Text style={{ color: colors.white, fontSize: 12 }}>
                          {user.email}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                {(!users.length || !query) && (
                  <Text style={{ color: colors.white, fontSize: 18 }}>
                    No users found
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default AddMatchModal;
