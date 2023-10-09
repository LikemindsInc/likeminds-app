import { DEVICE_FULL_WIDTH } from '../constants';

const size = {
  font6: DEVICE_FULL_WIDTH * (6 / 365),
  font8: DEVICE_FULL_WIDTH * (8 / 365),
  font10: DEVICE_FULL_WIDTH * (10 / 365),
  font12: DEVICE_FULL_WIDTH * (12 / 365),
  font14: DEVICE_FULL_WIDTH * (14 / 365),
  font16: DEVICE_FULL_WIDTH * (16 / 365),
  font20: DEVICE_FULL_WIDTH * (20 / 365),
  font24: DEVICE_FULL_WIDTH * (24 / 365),
  font28: DEVICE_FULL_WIDTH * (28 / 365),
  font32: DEVICE_FULL_WIDTH * (32 / 365),
  font18: DEVICE_FULL_WIDTH * (18 / 365),
  font40: DEVICE_FULL_WIDTH * (40 / 365),
  font34: DEVICE_FULL_WIDTH * (34 / 365),
  font38: DEVICE_FULL_WIDTH * (38 / 365),
  font13: DEVICE_FULL_WIDTH * (13 / 365),
  font15: DEVICE_FULL_WIDTH * (15 / 365),
};

const weight = {
  full: '900',
  semi: '600',
  low: '400',
  bold: 'bold',
  normal: 'normal',
};

export default { size, weight };
