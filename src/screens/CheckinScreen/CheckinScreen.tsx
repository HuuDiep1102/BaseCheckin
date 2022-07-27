import {StyleSheet, View} from 'react-native';
import {SelectItem} from '@/components/SelectItem';
import {IC_CAMERA, IC_CHECKIN, IC_LOCATION} from '@/assets';
import * as React from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

export const CheckinScreen = () => (
  <View style={[styles.scene, styles.checkin]}>
    <NoteContainer>
      <TextNote>
        Để có thể sử dụng tính năng checkin bạn vui lòng chọn thao tác
        Anable/disable
      </TextNote>
    </NoteContainer>
    <SelectContainer>
      <SelectItem title="Checkin client" icon={IC_CHECKIN} />
      <SelectItem title="Camera" icon={IC_CAMERA} />
      <SelectItem title="Location" icon={IC_LOCATION} />
    </SelectContainer>
  </View>
);

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
});
