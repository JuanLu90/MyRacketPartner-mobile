import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { colors } from "../utils/stylesUtil";

import { LogoIcon } from "../images/svg-components/LogoIcon";
import { MenuIcon } from "../images/svg-components/MenuIcon";
import UserDefaultImg from "../images/user-default.png";

const Header = () => {
  // const toggleMenu = () => {
  //   setIsOpen((prevIsOpen) => !prevIsOpen);
  // };

  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Si el clic no está dentro del menú, ciérralo
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Agregar el event listener cuando el componente se monta
    // document.addEventListener("mousedown", handleOutsideClick);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      // document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [wrapperRef]);

  // const handleMenuIconClick = (event) => {
  //   // Evitar que el menú se cierre cuando se hace clic en el icono del menú
  //   event.stopPropagation();
  //   toggleMenu();
  // };

  return (
    <View style={styles.wrapper} ref={wrapperRef}>
      <View style={styles.wrapperLogo}>
        {/* <LogoIconIcon onClick={() => navigate("/")} /> */}
        {/* <LogoIconImg onClick={() => console.log("LogoIconIcon")} /> */}
        <LogoIcon width={40} height={40} pathFill={colors.green} />
      </View>
      <View style={styles.rightContent}>
        {/* {id && (
              <UserDefaultIcon
                src={profileImage ?? UserDefaultImg}
                onClick={() => navigate("/profile")}
              />
            )} */}

        <TouchableOpacity onPress={() => console.log("UserDefaultIcon")}>
          <Image source={UserDefaultImg} style={{ width: 40, height: 40 }} />
        </TouchableOpacity>
        <View style={styles.wrapperMenu}>
          <View style={styles.wrapperMenuIcon}>
            <TouchableOpacity onPress={() => console.log("UserDefaultIcon")}>
              <MenuIcon width={40} height={40} pathFill={colors.green} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.dropdownWrapper}>
        <View style={styles.container}>
          <View style={styles.list}>
            {isOpen && (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => console.log("login")}
                >
                  <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>
                {/* <Separator /> */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => console.log("signup")}
                >
                  <Text style={styles.buttonText}>Sign up</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "sticky", // No hay equivalente directo en RN, manejar con otros estilos si es necesario
    top: 0, // No hay equivalente directo en RN
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    zIndex: 3,
  },
  logoIcon: {
    height: 40, // 2.5rem aproximadamente
    cursor: "pointer",
    fill: colors.green, // Necesitarás ajustar el SVG manualmente
  },
  wrapperLogo: {
    flex: 1,
    padding: 10,
  },
  userDefaultIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderRadius: 50,
    cursor: "pointer",
  },
  wrapperMenuIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    height: 40,
    cursor: "pointer",
    fill: colors.green, // Necesitarás ajustar el SVG manualmente
  },
  dropdownWrapper: {
    position: "absolute",
    top: 60,
    right: 0,
    width: 200,
    backgroundColor: colors.green,
    overflow: "hidden", // Manejando la animación con RN Animated
  },
  listItem: {
    display: "flex",
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  listItemText: {
    color: colors.primary,
  },
  separator: {
    width: "100%",
    opacity: 0.4,
    borderTopWidth: 2,
    borderTopColor: colors.greyDark,
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapperSelectLanguage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  languageOption: {
    marginHorizontal: 7,
    paddingVertical: 3,
    paddingHorizontal: 7,
    color: colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "transparent",
  },
  languageOptionSelected: {
    borderColor: "black",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    width: "80%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  separator: {
    height: 1,
    width: "80%",
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
});

export default Header;
