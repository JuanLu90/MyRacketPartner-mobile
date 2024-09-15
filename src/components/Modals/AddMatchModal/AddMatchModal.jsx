// DEPENDENCIES
import { useEffect, useState, useMemo } from "react";
import { Text, View, Image, Pressable, TextInput } from "react-native";
import { useTranslation } from "react-i18next";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  editMatchAction,
  matchDetailsAction,
  matchesAction,
  newMatchAction,
} from "store/slices/matchesSlice";

// COMPONENTS
import BottomSheetModal from "components/Modals/BottomSheetModal/BottomSheetModal";

// HOOKS
import useSearchUsers from "hooks/useFetchUsers";

// STYLES
import styles from "./AddMatchModal.styled";

// IMAGES
import UserDefaultImg from "images/user-default.png";
import PlusIcon from "images/svg-components/PlusIcon";
import MinusIcon from "images/svg-components/MinusIcon";
import WarningIcon from "images/svg-components/WarningIcon";

// UTILS
import { colors } from "utils/stylesUtil";
import { validateAddResult } from "utils/validationUtil";

// FUNCTION
const AddMatchModal = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { isOpen, closeModal, matchInfo } = props;

  const {
    user: { id, profileImage, username },
  } = useSelector((state) => state.auth);

  const isEditing = matchInfo?.user1?.id;

  const sets = [
    matchInfo?.sets[0] && { ...matchInfo?.sets[0] },
    matchInfo?.sets[1] && { ...matchInfo?.sets[1] },
    matchInfo?.sets[2] && { ...matchInfo?.sets[2] },
  ].filter(Boolean);

  const matchInfoInitialState = useMemo(
    () => ({
      matchID: matchInfo?.id,
      matchDate: matchInfo?.date ?? "2023-09-05 00:00:00",
      user1ID: matchInfo?.user1?.id ?? id,
      user2ID: matchInfo?.user2?.id,
      sets: [...sets],
      tournamentID: null,
    }),
    [id, matchInfo, sets],
  );

  const [selectUserisActive, setSelectUserisActive] = useState(false);
  const [userSelected, setUserSelected] = useState({});
  const [matchInfoState, setMatchInfoState] = useState(matchInfoInitialState);

  const [query, setQuery] = useState("");
  const [errors, setErrors] = useState([]);
  const { users, loading, error } = useSearchUsers(query);

  const handleChange = (value) => {
    setQuery(value);
  };

  const onSubmit = async () => {
    const validationErrors = validateAddResult(matchInfoState, t);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length !== 0) return;

    try {
      if (isEditing) {
        await dispatch(editMatchAction(matchInfoState)).unwrap();
      } else {
        await dispatch(newMatchAction(matchInfoState)).unwrap();
      }

      if (isEditing) {
        dispatch(matchDetailsAction(matchInfo?.id)).unwrap();
      } else {
        dispatch(matchesAction()).unwrap();
      }

      closeModal();
    } catch (error) {
      // await dispatch(
      //   toastAction({ message: error.message, type: "ERROR" }),
      // ).unwrap();
    }
  };

  const handleChangeResult = (value, name, playerOrder) => {
    setErrors([]);
    setMatchInfoState((prevState) => {
      const newSets = [...prevState.sets];
      newSets[name] = {
        ...prevState.sets[name],
        [`user${playerOrder}Score`]: value ? Number(value) : null,
      };

      return {
        ...prevState,
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
    setErrors([]);
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

  const textInputGeneral = (value1, value2) => (
    <TextInput
      style={[
        styles.input,
        (errors[0]?.code === value1 ||
          errors[0]?.code === 5 ||
          errors[0]?.code === 6 ||
          errors[0]?.code === 7) && {
          borderBottomWidth: 2,
          borderColor: colors.orange,
          color: colors.orange,
        },
      ]}
      onChangeText={(value) => handleChangeResult(value, value1, value2)}
      placeholder="0"
      placeholderTextColor={colors.greyLightSemiTransparent}
      value={matchInfoState.sets[value1]?.[`user${value2}Score`]?.toString()}
    />
  );
  return (
    <BottomSheetModal
      title={
        isEditing ? t("AddResultModal.TitleEdit") : t("AddResultModal.TitleAdd")
      }
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
              {userSelected?.userID || matchInfoState?.user2ID ? (
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
                  style={[
                    styles.notSelectedUser,
                    errors[0]?.code === 4 && { borderColor: colors.orange },
                  ]}
                >
                  <PlusIcon
                    pathFill={
                      errors[0]?.code === 4 ? colors.orange : colors.white
                    }
                  />
                </Pressable>
              )}
              <Text
                style={styles.userName}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {matchInfo?.user2?.name ??
                  userSelected?.userName ??
                  t("AddResultModal.AddPlayer")}
              </Text>
            </View>
          </View>

          {!selectUserisActive ? (
            <View style={styles.wrapperResult}>
              <View style={styles.result}>
                {textInputGeneral(0, 1)}
                {textInputGeneral(0, 2)}
              </View>
              <View style={styles.result}>
                {textInputGeneral(1, 1)}
                {textInputGeneral(1, 2)}
              </View>
              <View style={styles.result}>
                {textInputGeneral(2, 1)}
                {textInputGeneral(2, 2)}
              </View>
            </View>
          ) : (
            <View style={{ flex: 1, paddingLeft: 30 }}>
              <TextInput
                style={styles.inputSearchUser}
                onChangeText={handleChange}
                placeholder={t("AddResultModal.SearchBy")}
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
                    {t("AddResultModal.NoUsers")}
                  </Text>
                )}
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={{ height: 20, marginTop: 10 }}>
        {errors.length > 0 && (
          <View style={styles.wrapperErrorMessage}>
            <WarningIcon
              width={25}
              height={25}
              marginRight={10}
              pathFill={colors.orange}
            />
            <Text style={styles.textErrorMessage}>{errors[0]?.message}</Text>
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
};

export default AddMatchModal;
