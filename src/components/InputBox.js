import React, { Component } from "react";
import { Platform, Animated, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.View``;

const Row = styled.View`
  ${({ isEditable, backgroundColor }) =>
    isEditable
      ? ""
      : "background-color: " + (backgroundColor || "#ECECEC") + ";"}
  border-radius: ${({ isBordered }) => (isBordered ? 4 : 0)}px;
  border-width: ${({ isBordered }) => (isBordered ? 1 : 0)};
  border-color: ${({ isError, borderColor }) =>
    isError ? "#e74c3c" : borderColor};
  flex-direction: row;
  align-items: center;
  padding-horizontal: ${({ isBordered }) => (isBordered ? 20 : 0)}px;
`;

const Input = styled.TextInput`
  font-size: ${({ fontSize }) => fontSize}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  color: ${({ fontColor, editable }) => (editable ? fontColor : "#C2C2C2")};
  flex: 1;
  border-bottom-width: ${Platform.OS === "android" ? "0" : "1"};
  border-bottom-color: ${({ isError }) => (isError ? "#e74c3c" : "#ccc")};
  ${Platform.OS === "android" ? "" : "padding-vertical: 5px"};
  text-align: ${({ align }) => align};
  ${({ icon }) => (icon ? "padding-left: 30px;" : "")};
`;

const Label = styled.Text`
  font-family: Poppins-SemiBold;
  margin-left: ${Platform.OS === "android" ? "4px" : "0"};
  ${({ floatingEnable, isBordered }) => {
    let style = `margin-bottom: ${Platform.OS === "android" ? "-8px" : "0"};`;
    if (!floatingEnable && isBordered) {
      style = `margin-bottom: 4px;`;
      style += `font-size: 12px;`;
    }

    return style;
  }};
  ${({
    isError,
    isFocus,
    labelColor,
    valueInput,
    floatingEnable,
    isBordered
  }) => {
    let color = isFocus ? "#2BB673" : labelColor;
    if (!isFocus && valueInput) {
      color = "#4A4A4A";
    }
    if (!floatingEnable && isBordered) {
      color = `#585858`;
    }
    return `color: ${isError ? "#e74c3c" : color}`;
  }};
`;

const ErrorText = styled.Text`
  font-family: Poppins-Regular;
  font-size: 12px;
  color: #e74c3c;
  margin-left: 4px;
  margin-top: 4px;
`;

class InputBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFocus: false
    };

    this.animation = new Animated.Value(0);
  }

  render() {
    const {
      style,
      backgroundColor,
      label,
      labelColor,
      type,
      keyboardType,
      fontSize,
      fontWeight,
      fontColor,
      value,
      onChangeText,
      onBlur,
      onFocus,
      onShowHidePassword,
      onSubmitEditing,
      blurOnSubmit,
      isError,
      isMultiLine,
      isShowPassword,
      isEditable,
      isInvalid,
      errorText,
      placeholder,
      align,
      inputRef,
      returnKeyType,
      floatingEnable,
      icon,
      isBordered,
      isIconCheck
    } = this.props;
    const { isFocus } = this.state;
    let underlineColor = isFocus ? "#2BB673" : "#ccc";
    if (isBordered) {
      underlineColor = "transparent";
    }

    const moveLabel = this.animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [5, -5, -15]
    });

    if (value !== "") {
      Animated.timing(this.animation, {
        toValue: 1,
        duration: 200
      }).start();
    }

    let colorLabel = isFocus ? "#2BB673" : labelColor;
    let borderColor = isFocus ? "#2BB673" : "#ECECEC";
    if (!isFocus && value !== "") {
      colorLabel = "#4A4A4A";
    }
    let leftLabel = icon ? 25 : 0;
    if (isFocus || value !== "") {
      leftLabel = 0;
    }
    return (
      <Container style={style}>
        {label && floatingEnable && (
          <TouchableOpacity
            activeOpacity={1}
            onClick={() => {
              this.setState({ isFocus: true }, onFocus);
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 200
              }).start();
            }}
          >
            <Animated.Text
              style={{
                fontFamily: "Poppins-Regular",
                color: isError ? "#e74c3c" : colorLabel,
                position: "absolute",
                top: 10,
                left: leftLabel,
                fontSize: isFocus || value !== "" ? 12 : 14,
                marginLeft: Platform.OS === "android" ? 4 : 0,
                transform: [{ translateY: moveLabel }],
                zIndex: 99
              }}
            >
              {label}
            </Animated.Text>
          </TouchableOpacity>
        )}
        {label && !floatingEnable && (
          <Label
            isError={isError}
            floatingEnable={floatingEnable}
            isFocus={isFocus}
            isBordered={isBordered}
            labelColor={labelColor}
            valueInput={value}
            icon={icon}
          >
            {label}
          </Label>
        )}
        <Row
          isBordered={isBordered}
          isEditable={isEditable}
          backgroundColor={backgroundColor}
          borderColor={borderColor}
        >
          <Input
            innerRef={inputRef}
            secureTextEntry={type === "password" && !isShowPassword}
            onChangeText={text => onChangeText(text)}
            onBlur={() => {
              this.setState({ isFocus: false }, onBlur);
              if (value === "") {
                Animated.timing(this.animation, {
                  toValue: 0,
                  duration: 200
                }).start();
              }
            }}
            onFocus={() => {
              this.setState({ isFocus: true }, onFocus);
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 200
              }).start();
            }}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            value={value}
            keyboardType={keyboardType}
            underlineColorAndroid={
              isError && !isBordered ? "#2BB673" : underlineColor
            }
            autoCorrect={false}
            autoCapitalize="none"
            fontSize={fontSize}
            fontWeight={fontWeight}
            multiline={isMultiLine}
            placeholder={placeholder}
            isError={isError}
            editable={isEditable}
            align={align}
            fontColor={fontColor}
            returnKeyType={returnKeyType !== "done" ? returnKeyType : "done"}
            icon={icon}
            isBordered={isBordered}
          />
        </Row>

        {isError && <ErrorText>{errorText}</ErrorText>}
      </Container>
    );
  }
}

InputBox.propTypes = {
  backgroundColor: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  type: PropTypes.oneOf(["text", "password", "email", "money"]),
  keyboardType: PropTypes.string,
  value: PropTypes.string,
  fontSize: PropTypes.number,
  fontWeight: PropTypes.string,
  fontColor: PropTypes.string,
  onChangeText: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onShowHidePassword: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  blurOnSubmit: PropTypes.bool,
  isError: PropTypes.string,
  isMultiLine: PropTypes.bool,
  isShowPassword: PropTypes.bool,
  isEditable: PropTypes.bool,
  isInvalid: PropTypes.bool,
  errorText: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.array,
  align: PropTypes.string,
  inputRef: PropTypes.func,
  returnKeyType: PropTypes.string,
  floatingEnable: PropTypes.bool,
  icon: PropTypes.string,
  isBordered: PropTypes.bool,
  isIconCheck: PropTypes.bool
};

InputBox.defaultProps = {
  type: "text",
  fontSize: 14,
  fontWeight: "normal",
  align: "left",
  labelColor: "#333",
  fontColor: "#333",
  isEditable: true,
  blurOnSubmit: false,
  keyboardType: "default",
  floatingEnable: true,
  isBordered: false,
  isIconCheck: true,
  onBlur: () => {},
  onFocus: () => {}
};

export default InputBox;
