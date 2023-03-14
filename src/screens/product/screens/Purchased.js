import { StyleSheet, FlatList, Text, View, TouchableOpacity, useWindowDimensions, SafeAreaView,  Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from "../../user/UserContext";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
export const SuccessRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetSuccessOrders } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function SuccessOrders () {
      const res1 = await onGetSuccessOrders(userID);
        if(res1){
          setOrders(res1);
        }
    })()
  }, [orders]);

  const SetTime = (time) => {
    return String(time).slice(0, 21).replace('T', ' ');
  }
  function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}

const numberWithComma = x => {
  try {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } catch (error) {
    console.log(error);
  }
};

  const renderItem1 = ({item}) => {
    return (
      <View style={{...styles.item, borderColor:'green'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'green'}}>{item.status.name}</Text>
            <FontAwesome name="check" size={24} color="green" style={{marginLeft:16}}/>
          </View>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Thời gian : </Text>{SetTime(convertTZ(item.createdAt),"Asia/Jakarta" )}</Text>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Cập nhật lúc : </Text>{SetTime(convertTZ(item.updatedAt),"Asia/Jakarta" )}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontWeight:'600'}}>$ <Text style={{fontWeight:'600'}}>{numberWithComma(item.total)} đ</Text></Text>
            <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
          </View>
        </View>
        <TouchableOpacity style={{...styles.btnChiTiet, borderColor:'green'}} onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
          <Text style={{color: 'green'}}>Chi tiết</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  return(
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          {
            orders.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orders}
              renderItem={renderItem1}
              keyExtractor={item => item._id}
            /> :
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/4814/4814852.png'}}/>
              <Text>Bạn chưa có đơn hàng nào</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Text style={{color: '#FE5045'}}>Đặt ngay</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  )
};

export const CancelRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetCancelOrders } = useContext(UserContext);
  const [orders1, setOrders1] = useState([]);

  useEffect(() => {
    (async function CancelOrders () {
      const res1 = await onGetCancelOrders(userID);
        if(res1){
          setOrders1(res1);
        }
    })()
  }, [orders1]);

  const SetTime = (time) => {
    return String(time).slice(0, 21).replace('T', ' ');
  }
  function convertTZ(date, tzString) {
    return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {timeZone: tzString}));   
}
  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };
  const renderItem2 = ({item}) => {
    return (
      <View style={{...styles.item, borderColor:'red'}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{color: 'red'}}>{item.status.name}</Text>
          <FontAwesome name="ban" size={24} color="red" style={{marginLeft:16}}/>
        </View>
        <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Thời gian : </Text>{SetTime(convertTZ(item.createdAt),"Asia/Jakarta" )}</Text>
        <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Cập nhật lúc : </Text>{SetTime(convertTZ(item.updatedAt),"Asia/Jakarta" )}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{fontWeight:'600'}}>$ <Text style={{fontWeight:'600', textDecorationLine:'line-through'}}>{numberWithComma(item.total)} đ</Text></Text>
          <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
        </View>
      </View>
      <TouchableOpacity style={{...styles.btnChiTiet, borderColor:'red'}} onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
        <Text style={{color: 'red'}}>Chi tiết</Text>
      </TouchableOpacity>
    </View>
    );
  };
  
  return(
    <SafeAreaView>
      <View>
        <View style={styles.container}>
          {
            orders1.length > 0 ?
            <FlatList
              showsVerticalScrollIndicator={false}
              data={orders1}
              renderItem={renderItem2}
              keyExtractor={item => item._id}
            /> :
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 200}}>
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/4814/4814852.png'}}/>
              <Text>Bạn chưa có đơn hàng nào</Text>
              <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
                <Text style={{color: '#FE5045'}}>Đặt ngay</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    </SafeAreaView>
  )
};


const Purchased = (props) => {
  const {navigation} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'success', title: 'Đã giao hàng' },
    { key: 'canceled', title: 'Đã hủy' },
  ]);
  
  const renderScene = SceneMap({
    success: () => SuccessRoute({navigation}),
    canceled: () => CancelRoute({navigation}),
  });

  return (
    <>
    <View style={{marginTop:30}}/>
    <TabView
      navigationState={{ index, routes, navigation }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => (
        <TabBar
          {...props}
          renderLabel={({ route, color }) => (
            <Text style={{ color: 'black', margin: 8 }}>
              {route.title}
            </Text>
          )}
          style={{backgroundColor: 'white'}}
        />
      )}
    />
    </>
  )
}

export default Purchased

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    height: 38,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  item: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  touch: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  btnChiTiet:{
    padding:6, 
    borderRadius: 10,
    borderWidth:2,
    marginLeft:14,
    position: "absolute",
    top: 20,
    right:10
  },
  btnChiTiet2:{
    padding:6, 
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginLeft:14,
    position: "absolute",
    top: 20,
    right:10
  }
})