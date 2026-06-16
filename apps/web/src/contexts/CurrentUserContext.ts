//  Контекст текущего пользователя  //
//  Просто создаем и экспортируем  //
import React from 'react';
import type { User } from '@movies-explorer/shared';

export const CurrentUserContext = React.createContext<User>({
  name: '',
  email: '',
});
