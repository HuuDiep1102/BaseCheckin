import React, {memo, useCallback} from 'react';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
import {ImageSourcePropType, TextInputProps} from 'react-native';

const STextInputContainer = styled.View`
  flex-direction: row;
  height: 44px;
  border-bottom-color: ${Colors.gray};
  border-bottom-width: 0.5px;
  align-items: center;
  margin-bottom: 26px;
  width: 80%;
`;
const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 12px;
  margin-top: 4px;
`;
const STextInput = styled.TextInput`
  font-weight: 400;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.24px;
  flex: 1;
  height: 44px;
  color: ${Colors.black};
`;

interface Props extends TextInputProps {
  icon: ImageSourcePropType;
  label: string;
  onChangeValue: (keyName: string, value: string) => void;
  keyName: string;
}

const CustomTextInput = (props: Props) => {
  const {icon, label, onChangeValue, keyName} = props;

  const onChange = useCallback(
    (text: string) => {
      onChangeValue(keyName, text);
    },
    [keyName, onChangeValue],
  );

  return (
    <STextInputContainer>
      <Icon source={icon} resizeMode={'stretch'} />
      <STextInput
        placeholder={label}
        placeholderTextColor={Colors.oldSilver}
        onChangeText={onChange}
        {...props}
      />
    </STextInputContainer>
  );
};

export default memo(CustomTextInput);
