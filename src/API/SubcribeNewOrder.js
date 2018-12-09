import firebase from 'react-native-firebase';

const SubcribeNewOrder = (cb) => {
  return firebase.database().ref('/order').on('value', snapshot => {
    if(snapshot.val()){
      let val = snapshot.val();
      let orders = Object.keys(val).map(i => val[i]);
      let order = orders.find(i => i.Deliver === "");
      if(order){
          cb();
      }

    }
  })
}
export default SubcribeNewOrder;
