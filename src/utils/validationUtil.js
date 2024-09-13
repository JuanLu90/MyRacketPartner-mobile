export const validateEmail = (email) => {
  var reg =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(email);
};

export const validatePassword = (password) => {
  var reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,12}$/;
  return reg.test(password);
};

export const validateEditProfile = (values, t) => {
  const { firstName, lastName, height, weight } = values;
  const errors = {};

  if (!firstName) errors.firstName = t("EditProfile.Validations.NoFirstName");
  else if (firstName.length < 3 || firstName.length > 16)
    errors.firstName = t("EditProfile.Validations.InvalidFirstName");
  if (!lastName) errors.lastName = t("EditProfile.Validations.NoLastName");
  else if (lastName.length < 6 || lastName.length > 30)
    errors.lastName = t("EditProfile.Validations.InvalidLastName");
  if ((height && height < 50) || height > 250)
    errors.height = t("EditProfile.Validations.InvalidHeight");
  if ((weight && weight < 2) || weight > 300)
    errors.weight = t("EditProfile.Validations.InvalidWeight");

  return errors;
};

export const validateLogin = (values, t) => {
  const { email, password } = values;
  const errors = {};

  if (!email) errors.email = t("Login.Validations.NoEmail");
  else if (!validateEmail(email))
    errors.email = t("Login.Validations.InvalidEmail");

  if (!password) errors.password = t("Login.Validations.NoPassword");
  else if (!validatePassword(password))
    errors.password = t("Login.Validations.InvalidPassword");

  return errors;
};

export const validateRegister = (values, t) => {
  const { userName, email, password, confirmPassword } = values;
  const errors = {};

  if (!userName) errors.userName = t("Register.Validations.NoUsername");
  else if (userName?.length < 3 || userName?.length > 20) {
    errors.userName = t("Register.Validations.InvalidUsername");
  }

  if (!email) errors.email = t("Register.Validations.NoEmail");
  else if (!validateEmail(email))
    errors.email = t("Register.Validations.InvalidEmail");

  if (!password) errors.password = t("Register.Validations.NoPassword");
  else if (!validatePassword(password))
    errors.password = t("Register.Validations.InvalidPassword");

  if (!confirmPassword)
    errors.confirmPassword = t("Register.Validations.NoConfirmPassword");
  else if (confirmPassword !== password) {
    errors.confirmPassword = t("Register.Validations.InvalidConfirmPassword");
  }

  return errors;
};

export const validateAddResult = (match, t) => {
  const errors = [];

  if (!match.user2ID)
    errors.push({
      code: 4,
      message: t("AddResultModal.Validations.NoRival"),
    });

  if (!match.sets.length)
    errors.push({
      code: 5,
      message: t("AddResultModal.Validations.MoResult"),
    });

  let user1SetsWon = 0;
  let user2SetsWon = 0;

  match.sets.forEach((set, index) => {
    const { user1Score, user2Score } = set;

    if (
      user1Score > 7 ||
      user2Score > 7 ||
      user1Score < 0 ||
      user2Score < 0 ||
      (user1Score === 7 && user2Score > 6) ||
      (user2Score === 7 && user1Score > 6) ||
      (user1Score === 7 && user2Score < 5) ||
      (user2Score === 7 && user1Score < 5) ||
      (user1Score === 6 && user2Score > 4 && user2Score < 7) ||
      (user2Score === 6 && user1Score > 4 && user1Score < 7) ||
      (user1Score < 6 && user2Score < 6) ||
      (user2Score < 6 && user1Score < 6)
    ) {
      errors.push({
        code: index,
        message: t("AddResultModal.Validations.InvalidSet", {
          index: index + 1,
        }),
      });
    }

    if (user1Score > user2Score) {
      user1SetsWon++;
    } else if (user2Score > user1Score) {
      user2SetsWon++;
    }

    if (
      index === 1 &&
      (user1SetsWon === 2 || user2SetsWon === 2) &&
      (match.sets[2]?.user1Score || match.sets[2]?.user2Score)
    ) {
      errors.push({
        code: 7,
        message: t("AddResultModal.Validations.InvalidSetsOrder"),
      });
    }
  });

  if (user1SetsWon === 3 || user2SetsWon === 3) {
    errors.unshift({
      code: 6,
      message: t("AddResultModal.Validations.MaxSets"),
    });
  }

  return errors;
};

export const validateSuggestions = (values, t) => {
  const { suggestions } = values;
  const errors = {};

  if (!suggestions)
    errors.suggestions = t("Suggestions.Validations.NoSuggestions");
  else if (suggestions.length < 6 || suggestions.length > 300)
    errors.suggestions = t("Suggestions.Validations.InvalidSuggestions");

  return errors;
};
