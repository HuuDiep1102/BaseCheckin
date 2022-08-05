import React, {memo} from 'react';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';

interface Props {
  date?: any;
}

export const HeaderCalendar = ({date}: Props) => {
  const _date = new Date(date);

  const month = _date.getMonth() + 1;
  const year = _date.getFullYear();

  return (
    <HeaderContainer>
      <DateHeader>
        Tháng {month}/{year}
      </DateHeader>
      <DateTextHeader>(Danh sách lịch sử chấm công)</DateTextHeader>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  height: 64px;
  justify-content: center;
  align-items: center;
`;

const DateHeader = styled.Text`
  font-weight: 500;
  font-size: 18px;
  line-height: 22px;
  color: ${Colors.black};
`;

const DateTextHeader = styled.Text`
  font-weight: 400;
  font-size: 13px;
  line-height: 18px;
  color: ${Colors.oldSilver};
`;
