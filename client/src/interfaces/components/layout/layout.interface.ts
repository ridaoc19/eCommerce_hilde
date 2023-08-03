import { ReactNode } from 'react';
import { IUser } from '../../sections/user.interface';

export namespace ILayout {
  export type LayoutProps = {
    children: ReactNode
  }
}

export namespace ISidebar {
  export type ItemRole = {
    id: number;
    value: string;
    type: string;
    svg: any;
    roles: IUser.UserData["roles"][]; // Aquí indicamos que roles es un array de roles permitidos
  };

}