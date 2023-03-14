import { StyleSheet, Text, View, SafeAreaView, Dimensions, Image, FlatList, TouchableOpacity, StatusBar,ToastAndroid } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { UserContext } from "../../user/UserContext";
import { IP } from "../../../utils/constants";

const OrderDetail = (props) => {
  const {
    navigation,
    route: {
      params: { id },
    },
  } = props;
  const { userID, onGetOneOrder, onCancelOrder, onReceiveOrder } = useContext(UserContext);
  const [order, setOrder] = useState([]);
  const [list, setList] = useState([]);
  const [user, setUser] = useState([]);
  const [code, setCode] = useState('');
  const [codename, setCodename] = useState('');
  useEffect(()=>{
    (async function getOrderDetail(){
      const res = await onGetOneOrder(userID, id);
      if(res){
        setOrder(res.order);
        if(order.status){
          setCode(order.status.code);
          setCodename(order.status.name);
        }
        setList(res.list);
        setUser(res.user)
      }
    })();
  }, [list]);

  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };

  const OrderItem = ({ item }) => {
    const numberWithComma = x => {
      try {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <View key={item._id} style={styles.itemContainer}>
        <View style={styles.leftPart}>
          <Text style={{marginLeft: 20}}>{item.quantity}</Text>
          <Text style={{marginHorizontal: 10}}>x</Text>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: convertIP(item.image) }}
          />
          <View style={styles.info}>
            <Text numberOfLines={1} style={styles.name}>
              {item.name}
            </Text>
            <Text style={styles.size}>
              Giá : {numberWithComma(item.price)} đ
            </Text>
            
          </View>
        </View>
      </View>
    );
  };

  function convertIP(image) {
    image = image.replace("localhost", IP);
    return image;
  }

  function GetCheckOut(number){
    let result = '';
    if(number==1){
      result = 'Tiền mặt'
    } else {
      result = 'Ví điện tử'
    }
    return result;
  }
  
  async function CancelOrder() {
    const res = await onCancelOrder(userID, order._id);
    if(res){
      ToastAndroid.show('Hủy đơn hàng thành công', ToastAndroid.BOTTOM);
      navigation.goBack();
    } else {
      ToastAndroid.show('Lỗi khi hủy đơn hàng', ToastAndroid.BOTTOM);
    }
  }

  async function ReceiveOrder() {
    const res = await onReceiveOrder(userID, order._id);
    if(res){
      navigation.goBack();
    } else {
      ToastAndroid.show('Không nhận được hàng', ToastAndroid.BOTTOM);
    }
  }

  return (
    <>
    <SafeAreaView style={{flex:1, marginTop:StatusBar.currentHeight*1.2}}>
        <View style={styles.container}>
          <View>
            <Text style={styles.txtTitle}>Thông tin hóa đơn</Text>
            <View style={styles.orderContainer}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Tổng tiền:</Text>
                <Text>{numberWithComma(order.total)} đ</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Hình thức thanh toán:</Text>
                <Text>{GetCheckOut(order.payment_id)}</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>Trạng thái hiện tại:</Text>
                  
                <Text style={{color: code == 1 ? 'blue' : code == 2 ? '#FE5045' : code == 3 ? 'green' : 'red'}}>
                  {codename}
                </Text>
                  
              </View>
            </View>
            <Text style={styles.txtTitle}>Thông tin khách hàng</Text>
            <View style={styles.userContainer}>
                  <Text>Tên khách hàng:   {user.name}</Text>
                  <Text style={styles.sđt}>Điện thoại:   {user.phone}</Text>
                  <Text>Địa chỉ nhận hàng:   {user.address}</Text>
            </View>
            <Text style={styles.txtTitle}>Đơn hàng của bạn</Text>
                <View style={styles.productContainer}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={list}
                renderItem={OrderItem}
                keyExtractor={(item,index) => index.toString()}
                />
                </View>
                </View>
        </View>
            {
              code == 1 ?
              <TouchableOpacity onPress={()=>CancelOrder()} style={styles.button}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Hủy</Text>
              </TouchableOpacity>
              : (code==2) ?
              <TouchableOpacity onPress={()=>ReceiveOrder()} style={styles.button}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Nhận hàng</Text>
              </TouchableOpacity> 
              : <></> 
            }

        </SafeAreaView>
    </>
  )
}

export default OrderDetail

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingHorizontal:16
  },
  txtTitle:{
    fontSize: 16, 
    fontWeight:'600', 
    color:'#FE5045',
    marginTop:10
  },
  orderContainer:{
    backgroundColor: 'white', 
    padding: 8,
    justifyContent:'space-evenly', 
    height: Dimensions.get('screen').height*0.15},
  userContainer: {
    padding:8,
    backgroundColor: "white",
    height: Dimensions.get('screen').height*0.15,
    justifyContent:'space-evenly',
  },
  productContainer:{
    height: Dimensions.get('screen').height*0.4,
  },
  itemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
    borderWidth: 0.5,
    borderColor: "white",
    height: Dimensions.get('screen').height*0.1,
    borderWidth:1,
    borderBottomColor: "#000",
  },
  leftPart: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    height: 40,
    justifyContent: "space-between",
    marginLeft: 10
  },
  image: {
    height: 40,
    width: 40,
  },
  name: {
    fontWeight: "bold",
    width:200
  },
  checkContainer: {
    padding: 16,
    marginTop: 16,
    backgroundColor: 'white',
    borderTopStartRadius: 8,
    borderTopEndRadius: 8,
    shadowColor: "red",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#FE5045',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    position:'absolute',
    bottom: 10,
    width: '50%',
    alignSelf:'center'
  }
})