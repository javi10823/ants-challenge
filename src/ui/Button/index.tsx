import React, {FC} from 'react';
import {Text} from 'react-native';
import {ButtonStyle} from './styles';

interface Props {
  onPress: () => void;
  buttonText: string;
  disabled?: boolean;
}

const Button: FC<Props> = ({onPress, buttonText, disabled}) => (
  <ButtonStyle disabled={disabled} onPress={onPress}>
    <Text>{buttonText}</Text>
  </ButtonStyle>
);

export default Button;
