import firebase from 'react-native-firebase';

const SubcribeNewOrder = (cb) => {
  return firebase.database().ref('/order').on('value', snapshot => {
    if(snapshot.val()){
      console.log(snapshot.val());
      cb();
    }
  })
}
export default SubcribeNewOrder;
