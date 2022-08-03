import React, {memo} from 'react';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
import moment from 'moment';

interface Props {
  date?: any;
}

export const HeaderCalendar = memo((props: Props) => {
  const {date} = props;

  const _date = moment(date);

  const month = (_date.month() + 1).toString();

  const year = _date.year().toString();

  return (
    <HeaderContainer>
      <DateHeader>
        Tháng {month}/{year}
      </DateHeader>
      <DateTextHeader>(Danh sách lịch sử chấm công)</DateTextHeader>
    </HeaderContainer>
  );
});

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
