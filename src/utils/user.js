import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';
import analytics from '@react-native-firebase/analytics';
import firestore from '@react-native-firebase/firestore';

import rootStore from '../utils/rootStore';

async function onSignOut() {
  await Promise.all([auth().signOut(), analytics().resetAnalyticsData()]);
}

async function onSignIn() {
  let user = auth().currentUser;
  console.log(user);
  await Promise.all([
    analytics().setUserId(user.uid),
    crashlytics().setUserId(user.uid),
    crashlytics().setUserEmail(user.email),
  ]);
  const documentSnapshot = await firestore()
    .collection('users')
    .doc(user.uid)
    .get();
  let settings = documentSnapshot.data();
  if (settings) {
    await rootStore.dispatch({
      type: 'UPDATE_USER_SETTINGS',
      settings,
    });
  }
}

export {onSignIn, onSignOut};
