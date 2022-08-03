export const newFormData = (payload: {[key: string]: any}) => {
  const _formData = new FormData();

  Object.keys(payload).forEach(key => {
    if (key.includes('photo')) {
      _formData.append(key, {
        uri: payload[key],
        type: 'image/jpg',
        name: 'checkin.jpg',
      });
    } else {
      console.log(key, payload[key]);
      _formData.append(key, payload[key]);
    }
  });
  console.log('kijfklwe', _formData);
  return _formData;
};

export const defaultParams = {
  client_auth: 1,
  __code: 'native',
};
