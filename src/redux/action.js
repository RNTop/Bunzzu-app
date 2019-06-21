import * as AuthActions from './auth/AuthActions'
import * as QrDataActions from './qrdata/QrDataActions'
import * as EditProfileActions from './editprofile/EditProfileActions'
export const ActionCreators = Object.assign({},
  AuthActions, 
  QrDataActions,
  EditProfileActions
)
