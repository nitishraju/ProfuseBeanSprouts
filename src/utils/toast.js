import {Toast} from 'native-base';
import appColors from './appColors';
import NavigationService from './navigationService';

let closeToast = () => (Toast.toastInstance = null);

let hideToast = () => Toast.hide();

export default (
  message,
  backgroundColor = appColors.accent,
  duration = 3000,
  screen,
) => {
  return Toast.show({
    text: message,
    textStyle: {color: appColors.white},
    style: {backgroundColor: backgroundColor},
    duration: duration,
    position: 'bottom',
    buttonText: screen !== undefined ? 'Go' : '',
    onClose: reason => {
      if (reason === 'user' && screen !== undefined) {
        // this.hideToast();
        NavigationService.resetAndNavigate(screen);
      }
    },
  });
};

export {hideToast, closeToast};
