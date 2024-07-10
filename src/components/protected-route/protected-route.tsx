import { ProtectedRouteProps } from './type';
import { FC } from 'react';
import { Preloader } from '@ui';
import { Navigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  isAuthChecked as isAuthCheckedSelector,
  user as userSelector
} from '../../services/slices/authSlice';

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  onlyUnAuth,
  children
}) => {
  const location = useLocation();
  const isAuthChecked = useSelector(isAuthCheckedSelector);
  const user = useSelector(userSelector);

  if (!isAuthChecked) {
    // пока идёт чекаут пользователя, показываем прелоадер
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // если пользователь на странице авторизации и данных в хранилище нет, то делаем редирект
    return <Navigate replace to='/login' state={{ from: location }} />; // в поле from объекта location.state записываем информацию о URL
  }

  if (onlyUnAuth && user) {
    // если пользователь на странице авторизации и данные есть в хранилище
    // при обратном редиректе получаем данные о месте назначения редиректа из объекта location.state
    // в случае если объекта location.state?.from нет — а такое может быть, если мы зашли на страницу логина по прямому URL
    // мы сами создаём объект c указанием адреса и делаем переадресацию на главную страницу
    const from = location.state?.from || { pathname: '/' };

    return <Navigate replace to={from} />;
  }

  return children;
};
