import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  getOrders,
  isLoading as isLoadingSelector
} from '../../services/slices/ordersSlice';
import { Preloader } from '@ui';
import { loadOrders } from '../../services/thunks/ordersThunks';
import { user as userSelector } from '../../services/slices/authSlice';

export const ProfileOrders: FC = () => {
  const isLoading = useSelector(isLoadingSelector);
  const orders: TOrder[] = useSelector(getOrders);
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  useEffect(() => {
    if (user) dispatch(loadOrders());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
