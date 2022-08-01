import {Fetch} from '@/utils/fetch';
import {syncAllHistory} from '@/store/history/index';
import {newFormData} from '@/utils';

export const requestGetHistory = async (params: any) => {
  const formData = newFormData(params);

  const {data} = await Fetch.post('checkin.base.vn/ajax/api/me/logs', formData);

  console.log('data', data);

  if (!data) {
    return [];
  }

  await syncAllHistory(data.logs);

  return data.logs.map((item: any) => item.date);
};
