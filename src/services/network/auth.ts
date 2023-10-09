import { ResponseInterface } from '@app-model';
import { network } from '../../config/network.config';

/**
 *
 * @description Signin a fixme user
 * @function signIn
 * @property ISigninUser - payload
 * @returns Promise<ISession>
 */
export const login = async (payload: any): Promise<any> => {
  const response = await network.post<ResponseInterface<any>>(
    '/api/v1/auth/login',
    { ...payload },
  );

  return response;
};
