import firebase from 'react-native-firebase'

const UploadPicture = (picture) => {
  const imageRef = firebase.storage().ref('images/food').child(`${ (new Date()).getTime()}`);
  return imageRef.put(picture, {contentType: 'application/octet-stream'})
  .then(() => imageRef.getDownloadURL())
}

export default UploadPicture;
