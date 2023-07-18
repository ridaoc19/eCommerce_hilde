export namespace User {

  type EmailType = 'registre' | 'reset' | 'firstNotificationRegistre' | 'secondNotificationRegistre' | 'firstNotificationReset' | 'secondNotificationReset'
  export interface Content {
    name: string;
    lastName: string;
    email: string;
    password?: string;
    type: EmailType
  }
}
