import {StyleSheet, View} from 'react-native';
import {SelectItem} from '@/components/SelectItem';
import {IC_CAMERA, IC_CHECKIN, IC_LOCATION} from '@/assets';
import * as React from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {useCallback, useEffect, useState} from 'react';
import {checkPermission, PERMISSIONS_TYPE} from '@/utils/permissions';
import {CheckinActiveScreen} from '@/screens/Checkin/CheckinActiveScreen';
import Modal from 'react-native-modal';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const CheckinScreen = () => {
  const [isPermission, setPermission] = useState();

  const [isClient, setClient] = useState(false);

  const [isCamera, setCamera] = useState(false);

  const [isLocation, setLocation] = useState(false);

  const [isCheckin, setCheckin] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const onBackdrop = useCallback(() => {
    setModalVisible(false);
  }, []);

  const onSelectClient = useCallback(() => {
    setModalVisible(true);
  }, []);

  const onPermission = useCallback(
    async (type: string, isRequest?: boolean) => {
      const _permission = await checkPermission(type, isRequest);

      type === 'camera' ? setCamera(_permission) : setLocation(_permission);
      setPermission((prev: any) => ({
        ...prev,
        [type]: _permission,
      }));
    },
    [],
  );

  const onPickClient = useCallback(() => {
    setClient(true);
    setModalVisible(false);
  }, [isClient, modalVisible]);

  // useEffect(() => {
  //   setCamera(isCamera);
  // }, [isCamera]);
  //
  // useEffect(() => {
  //   setLocation(isCamera);
  // }, [isLocation]);

  useEffect(() => {
    setCheckin(isClient && isCamera && isLocation);
  }, [isClient, isCamera, isLocation]);

  console.log('isCheckin', isCheckin);

  console.log('isCamera', isCamera);

  console.log('isLocation', isLocation);

  console.log('isClient', isClient);

  return (
    <View style={[styles.scene, styles.checkin]}>
      <Modal
        style={styles.modal}
        isVisible={modalVisible}
        hasBackdrop={true}
        statusBarTranslucent={true}
        onBackdropPress={onBackdrop}>
        <CenteredView>
          <ModalView>
            <InputContactContainer>
              <NoteSelectContainer>
                <NoteText>Select checkin client</NoteText>
              </NoteSelectContainer>
              <SelectButton onPress={onPickClient}>
                <TitleText>Mobile Client</TitleText>
              </SelectButton>
              <SelectButton onPress={onPickClient}>
                <TitleText>47 Nguyễn Tuân</TitleText>
              </SelectButton>
              <SelectButton onPress={onPickClient}>
                <TitleText>WFH</TitleText>
              </SelectButton>
              <SelectButton onPress={onPickClient}>
                <TitleText>47 Nguyễn Tuân - dự phòng</TitleText>
              </SelectButton>
            </InputContactContainer>
          </ModalView>
        </CenteredView>
      </Modal>
      {isCheckin ? (
        <CheckinActiveScreen />
      ) : (
        <>
          <NoteContainer>
            <TextNote>
              Để có thể sử dụng tính năng checkin bạn vui lòng chọn thao tác
              Anable/disable
            </TextNote>
          </NoteContainer>
          <SelectContainer>
            <SelectItem
              title="Checkin client"
              icon={IC_CHECKIN}
              clientCheckin={'Mobile Checkin'}
              onPress={onSelectClient}
              keyName="Checkin"
              active={isClient}
            />
            <SelectItem
              title="Camera"
              icon={IC_CAMERA}
              keyName="Camera"
              onPress={async () => {
                await onPermission(PERMISSIONS_TYPE.camera, true);
              }}
              active={isCamera}
            />
            <SelectItem
              title="Location"
              icon={IC_LOCATION}
              keyName="Location"
              onPress={async () =>
                await onPermission(PERMISSIONS_TYPE.location, true)
              }
              active={isLocation}
            />
          </SelectContainer>
        </>
      )}
    </View>
  );
};

const NoteContainer = styled.View`
  height: 64px;
  justify-content: center;
`;

const TextNote = styled.Text`
  font-weight: 400;
  font-size: 15px;
  line-height: 18px;
  padding-left: 16px;
  color: ${Colors.oldSilver};
`;

const SelectContainer = styled.View`
  flex: 1;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },

  checkin: {
    backgroundColor: Colors.white,
    marginTop: 8,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
    padding: 0,
  },
});

const NoteSelectContainer = styled.View`
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

const TitleText = styled.Text`
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  color: ${Colors.black};
`;

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
