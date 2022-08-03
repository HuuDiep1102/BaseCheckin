import {Fetch} from '@/utils/fetch';
import {syncAllHistory} from '@/store/history/index';
import {newFormData} from '@/utils';
import axios from 'axios';

export const requestGetHistory = async (params: any) => {
  // const formData = newFormData(params);
  const formData = new FormData();
  console.log('params', params);

  Object.keys(params).forEach(key => {
    if (key.includes('photo')) {
      formData.append(key, {
        uri: params[key],
        type: 'image/jpg',
        name: 'checkin.jpg',
      });
    } else {
      formData.append(key, params[key]);
    }
  });

  const {data} = await axios.post(
    'https://checkin.base.vn/ajax/api/me/logs?',
    JSON.stringify(params),
    {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    },
  );

  console.log('data', data);
  if (!data) {
    return [];
  }

  await syncAllHistory(data.logs);

  return data.logs.map((item: any) => item.date);
};
