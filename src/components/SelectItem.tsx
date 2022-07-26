import React, {memo, useCallback, useState} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import 'react-native-gesture-handler';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';

interface SelectItemProps {
  title: string;
  // devices: string;
  icon: any;
}
export const SelectItem = memo((props: SelectItemProps) => {
  const {title, icon} = props;

  const [isActive, setActive] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  // const onNaviCreateContactScreen = useCallback(() => {
  //   navigateToCreateContactScreen();
  // }, [navigateToCreateContactScreen]);

  const onBackdrop = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSelect = useCallback(() => {
    setActive(!isActive);
    setModalVisible(false);
  }, [isActive]);

  return (
    <Container>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={onBackdrop}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              <NoteContainer>
                <NoteText>Select checkin client</NoteText>
              </NoteContainer>
              <SelectButton onPress={onSelect}>
                <TitleText>Mobile Checkin</TitleText>
              </SelectButton>
              <SelectButton onPress={onSelect}>
                <TitleText>47 Nguyễn Tuân</TitleText>
              </SelectButton>
              <SelectButton onPress={onSelect}>
                <TitleText>WFH</TitleText>
              </SelectButton>
              <SelectButton onPress={onSelect}>
                <TitleText>47 Nguyễn Tuân - dự phòng</TitleText>
              </SelectButton>
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>

      <ItemContainer onPress={() => setModalVisible(true)}>
        <Icon source={icon} />
        <TextContainer>
          <TitleText>{title}</TitleText>
          {/*<DevicesText>{devices}</DevicesText>*/}
        </TextContainer>
        <ActiveText isActive={isActive}>
          {isActive ? 'Enable' : 'Disable'}
        </ActiveText>
      </ItemContainer>
    </Container>
  );
});

const Container = styled.View``;

const ItemContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 64px;
  border-bottom-color: ${Colors.gray2};
  border-bottom-width: 0.5px;
  margin-left: 16px;
`;

const Icon = styled.Image`
  width: 28px;
  height: 28px;
`;

const NoteContainer = styled.View`
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.oldSilver};
  height: 40px;
  justify-content: center;
`;

const NoteText = styled.Text`
  font-size: 20px;
  font-weight: 700;
  line-height: 20px;
  color: ${Colors.black};
`;

const TextContainer = styled.View`
  height: 64px;
  justify-content: center;
  align-items: flex-start;
  padding-left: 16px;
`;

const TitleText = styled.Text`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${Colors.black};
`;

const DevicesText = styled.Text`
  font-size: 13px;
  font-weight: 400;
  line-height: 15px;
  color: ${Colors.oldSilver};
`;

const ActiveText = styled.Text<{
  isActive: boolean | undefined;
}>`
  position: absolute;
  font-size: 15px;
  font-weight: 400;
  line-height: 18px;
  right: 16px;
  color: ${p => (p.isActive ? Colors.green2 : Colors.oldSilver)};
`;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
});

const CenteredView = styled.View`
  align-items: center;
  padding: 0 20px;
  padding-bottom: ${getBottomSpace()}px;
  background-color: ${Colors.white};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ModalView = styled.View`
  width: 110%;
  background-color: ${Colors.white};
  border-radius: 20px;
  padding-top: 10px;
  padding-left: 20px;
`;

const InputContactContainer = styled.View`
  background-color: ${Colors.white};
  border-radius: 15px;
  padding: 5px;
`;

const SelectButton = styled.TouchableOpacity`
  height: 40px;
  padding-top: 10px;
  border-bottom-width: 0.5px;
  border-bottom-color: ${Colors.oldSilver};
`;

const ContactIcon = styled.TouchableOpacity<{
  isActive: boolean | undefined;
}>`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border-width: ${p => (p.isActive ? 0 : 0.5)}px;
  border-color: ${Colors.gray};
  justify-content: center;
  align-items: center;
  background-color: ${p => (p.isActive ? Colors.yellowOrange : Colors.white)};
`;
