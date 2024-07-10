import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { user as userSelector } from '../../services/slices/authSlice';

export const AppHeader: FC = () => {
  const user = useSelector(userSelector);
  return <AppHeaderUI userName={user?.name} />;
};
