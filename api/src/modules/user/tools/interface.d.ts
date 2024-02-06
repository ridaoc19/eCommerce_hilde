export namespace User {

  type EmailType = 'registre' | 'reset' | 'firstNotificationRegistre' | 'secondNotificationRegistre' | 'firstNotificationReset' | 'secondNotificationReset'| 'validateEmail'|'firstNotificationEmail' | 'secondNotificationEmail'
  export interface Content {
    _id?: string;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    type: EmailType
  }
}
