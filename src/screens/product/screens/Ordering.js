import { StyleSheet, FlatList, Text, View, TouchableOpacity, useWindowDimensions, SafeAreaView,  Image } from 'react-native'
import React, {useState, useEffect, useContext} from 'react'
import { UserContext } from "../../user/UserContext";
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

export const OrderingRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetPendingOrders } = useContext(UserContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async function PendingOrders () {
      const res1 = await onGetPendingOrders(userID);
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
      <View style={styles.item}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'blue'}}>{item.status.name}</Text>
          </View>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Thời gian : </Text>{SetTime(convertTZ(item.createdAt),"Asia/Jakarta" )}</Text>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Cập nhật lúc : </Text>{SetTime(convertTZ(item.updatedAt),"Asia/Jakarta" )}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontWeight:'600'}}>$ <Text style={{fontWeight:'600', color:'#FE5045'}}>{numberWithComma(item.total)} đ</Text></Text>
            <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnChiTiet} onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
          <Text style={{color: '#FE5045'}}>Chi tiết</Text>
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
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png'}}/>
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

export const ShippingRoute = (props) => {
  const {navigation} = props;
  const { userID, onGetShippingOrders } = useContext(UserContext);
  const [orders1, setOrders1] = useState([]);

  useEffect(() => {
    (async function PendingOrders1 () {
      const res1 = await onGetShippingOrders(userID);
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
      <View style={{...styles.item, backgroundColor:'#FE5045'}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#FFF', fontWeight:'600'}}>{item.status.name}</Text>
          </View>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Thời gian : </Text>{SetTime(convertTZ(item.createdAt),"Asia/Jakarta" )}</Text>
          <Text style={{marginTop: 10}}><Text style={{fontWeight:'600'}}>Cập nhật lúc : </Text>{SetTime(convertTZ(item.updatedAt),"Asia/Jakarta" )}</Text>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <Text style={{fontWeight:'600'}}>$ <Text style={{fontWeight:'600', color:'#FFF'}}>{numberWithComma(item.total)} đ</Text></Text>
            <Text style={{marginLeft: 10}}>({item.payment_id == 1 ? 'Tiền mặt' : 'Ví điện tử'})</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnChiTiet2} onPress={()=>navigation.navigate("OrderDetail", { id: item._id})}>
          <Text style={{color: '#FE5045'}}>Chi tiết</Text>
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
              <Image style={{width: 150, height: 150, resizeMode:'contain'}} source={{uri: 'https://cdn-icons-png.flaticon.com/512/1548/1548682.png'}}/>
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


const Ordering = (props) => {
  const {navigation} = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'ordering', title: 'Đang chờ giao hàng' },
    { key: 'shipping', title: 'Đang giao hàng' },
  ]);
  
  const renderScene = SceneMap({
    ordering: () => OrderingRoute({navigation}),
    shipping: () => ShippingRoute({navigation}),
  });

  return (
    <>
    <View style={{marginTop:30}}/>
    <TabView
    //  sceneContainerStyle={{backgroundColor:'red'}}
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

export default Ordering

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
    justifyContent: 'space-between'
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
    borderColor: "#FE5045",
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