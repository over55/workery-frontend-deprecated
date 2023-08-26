import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  AtomEffect
} from 'recoil';
import { recoilPersist } from 'recoil-persist'


// Control whether the hamburer menu icon was clicked or not. This state is
// needed by 'TopNavigation' an 'SideNavigation' components.
export const onHamburgerClickedState = atom({
  key: 'onHamburgerClicked', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

// Control what message to display at the top as a banner in the app.
export const topAlertMessageState = atom({
  key: 'topBannerAlertMessage',
  default: "",
});

// Control what type of message to display at the top as a banner in the app.
export const topAlertStatusState = atom({
  key: 'topBannerAlertStatus',
  default: "success",
});

// https://github.com/polemius/recoil-persist
const { persistAtom } = recoilPersist()

export const currentUserState = atom({
  key: 'currentUser',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const ADD_CUSTOMER_STATE_DEFAULT = {
    type: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneType: 0,
    otherPhone: "",
    otherPhoneType: 0,
    isOkToText: false,
    isOkToEmail: false,
    postalCode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    country: "",
    hasShippingAddress: false,
    shippingName: "",
    shippingPhone: "",
    shippingCountry: "",
    shippingRegion: "",
    shippingCity: "",
    shippingAddressLine1: "",
    shippingAddressLine2: "",
    shippingPostalCode: "",
    tags: [],
    comments: [],
    gender: "",
    joinDate: null,
    birthDate: null,
    howHearAboutUsItemID: ""
}

export const addCustomerState = atom({
  key: 'addCustomer',
  default: ADD_CUSTOMER_STATE_DEFAULT,
  effects_UNSTABLE: [persistAtom],
});
