export namespace IModalConfirm {
  export enum ButtonNameConfirm {
    Confirm = 'confirm',
    Cancel = 'cancel'
  }
  export interface Props {
    message: string;
    handleOnClick: (data: React.MouseEvent<HTMLButtonElement>) => void,
    Confirm: 'confirm',
    Cancel: 'cancel'
  }
}