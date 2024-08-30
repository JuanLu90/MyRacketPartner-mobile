// DEPENDENCIES
import { useEffect, useState, useMemo } from "react";
const {
  Text,
  View,
  StyleSheet,
  Image,
  Pressable,
  TextInput,
  Dimensions,
} = require("react-native");

// REDUX
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS
import BottomSheetModal from "./BottomSheetModal";
import PlusIcon from "images/svg-components/PlusIcon";

// HOOKS
import useSearchUsers from "hooks/getUsersHook";

// IMAGES
import UserDefaultImg from "images/user-default.png";

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
  console.log(matchInfoState);
  const onSubmit = async () => {
    try {
      await dispatch(newMatchAction(matchInfoState)).unwrap();

      setTimeout(() => {
        dispatch(matchesAction()).unwrap();
      }, 500);

      closeModal();
    } catch (error) {
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" }),
      // ).unwrap();
    }
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

  const { width } = Dimensions.get("window");

  const generalWidth = width;

  return (
    <BottomSheetModal
      title="Add a result"
      isOpen={isOpen}
      closeModal={closeModal}
      //   onSubmit={onSubmit}
    >
      <View>
        <View style={styles.wrapperInfoResult}>
          <View style={styles.usersWrapper}>
            <View style={styles.userStyled}>
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
                <Image
                  source={UserDefaultImg}
                  style={styles.userDefaultIcon}
                  onPress={() => setSelectUserisActive(!selectUserisActive)}
                />
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
            <View>
              <Text>aaaaaaaaaaa</Text>
            </View>
          )}
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  userDefaultIcon: {
    width: 65,
    height: 65,
    marginBottom: 8,
    borderRadius: 40,
  },
  wrapperInfoResult: {
    flex: 1,
    flexDirection: "row",
  },
  usersWrapper: {
    width: 100,
    gap: 25,
    overflow: "hidden",
  },
  userStyled: {
    flexDirection: "column",
    alignItems: "center",
  },
  userName: {
    color: colors.white,
  },
  notSelectedUser: {
    width: 60,
    height: 60,
    marginBottom: 7,
    padding: 16,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 40,
    borderStyle: "dashed",
  },
  input: {
    paddingVertical: 10,
    width: 40,
    color: colors.white,
    background: "transparent",
    fontSize: 30,
    border: "none",
    borderBottomWidth: 1,
    borderColor: colors.greyLight,
    textAlign: "center",
  },
  wrapperResult: {
    marginVertical: 15,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  result: {
    justifyContent: "space-between",
  },
});

export default AddMatchModal;
