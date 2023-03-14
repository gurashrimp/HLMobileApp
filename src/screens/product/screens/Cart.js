import { StyleSheet, Text, View, Image, Pressable, FlatList, Dimensions, Modal, ToastAndroid, SafeAreaView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProductContext } from '../ProductContext';
import { UserContext } from '../../user/UserContext';
import { SelectList } from 'react-native-dropdown-select-list'
import { IP } from "../../../utils/constants";

const CheckOutModal = (props) => {
  const { isShowModal, setIsShowModal, cart } = props;
  const { userID, onCheckOut } = useContext(UserContext);
  const { resetCart } = useContext(ProductContext);
  // console.log('userid', userID)
  const data = [
    {
      key: "1",
      value: 'Tiền mặt',
      icon: () => <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/639/639365.png' }} style={{ width: 18, height: 18 }} />
    },
    {
      key: 2,
      value: "Ví điện tử Momo",
      icon: () => <Image source={{ uri: 'https://developers.momo.vn/v3/assets/images/square-8c08a00f550e40a2efafea4a005b1232.png' }} style={{ width: 18, height: 18 }} />
    }
  ];
  const total = props.hi

  const [selected, setSelected] = React.useState("");
  const handleCheckOut = () => {
    if (selected == 0) {
      ToastAndroid.show('Bạn chưa chọn phương thức thanh toán', ToastAndroid.BOTTOM);
    } else if (selected == 2) {
      ToastAndroid.show('Chức năng này hiện đang bảo trì', ToastAndroid.BOTTOM);
    } else {
      if (selected == 1) {
        mycheckOut();
      }
    }
  }
  async function mycheckOut() {
    console.log('run checkout');
    const data = {
      cart, total, payment_id: Number(selected), userID
    }

    const res = await onCheckOut(userID, data);
    console.log(res)
    if (res) {
      if (res.message) {
        ToastAndroid.show(res.message, ToastAndroid.BOTTOM);
        setIsShowModal(false);
        resetCart()
      }
    }
  }

  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };
  //aubinh
  return (
    <Modal animationType='slide'
      transparent={true}
      visible={isShowModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Xác nhận thanh toán</Text>
          <View style={{marginVertical:15}}>
          <Text style={{ fontStyle: 'italic' }}>Tổng tiền: <Text style={{ fontWeight: 'bold', fontSize: 18 }}> {numberWithComma(total)} </Text></Text>
          </View>
          <View style={{height:100, width:200}}>
          <SelectList
            setSelected={(val) => setSelected(val)}
            data={data}
            save="key"
            search={false}
            dropdownShown={false}
            defaultOption={{ key: '0', value: 'Phương thức thanh toán' }}
            onSelect={() => console.log(selected)}
            />
            </View>
          <View style={styles.btnPair}>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckOut} >
            <Text style={styles.checkoutText}>Đồng ý</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.checkoutButton, backgroundColor:'#FFF', borderColor: '#FE5045', borderWidth:2}} onPress={() => setIsShowModal(false)}>
          <Text  style={{...styles.checkoutText, color:'#FE5045'}}>Hủy bỏ</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  )
}
const DeleteModal = (props) => {
  const { isShowDeleteModal, setIsShowDeleteModal, resetCart } = props;
  // console.log(props);
  return (
    <Modal animationType='slide'
      transparent={true}
      visible={isShowDeleteModal}
    >
      <View style={styles.modalContainer}>
        <View style={{...styles.modalView, height: '25%'}}>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Xóa giỏ hàng hiện tại</Text>
          <View style={{marginVertical:15}}/>
          <View style={{height:100, width:200}}>
            </View>
          <View style={styles.btnPair}>
          <TouchableOpacity style={styles.checkoutButton} onPress={resetCart} >
            <Text style={styles.checkoutText}>Đồng ý</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.checkoutButton, backgroundColor:'#FFF', borderColor: '#FE5045', borderWidth:2}} onPress={() => setIsShowDeleteModal(false)}>
          <Text  style={{...styles.checkoutText, color:'#FE5045'}}>Hủy bỏ</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>

    </Modal>
  )
}

const CartItem = (props) => {
  const { cart } = props;
  const { updateCart } = useContext(ProductContext);
  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };
  function convertIP(image) {
    try {
      image = image.replace("localhost", IP);
      return image;
    } catch (error) {
      console.log('convertip fail', error)
    }
  }
  const renderItem = ({ item }) => {
    const { product, quantity, price, checked } = item;
    return (

      <View style={styles.itemContainer}>
        <View style={styles.checkedContainer}>
          {
            checked == true ?
              <FontAwesome name="check-square" size={24} color="black" /> :
              <FontAwesome name="square-o" size={24} color="black" />
          }

        </View>
        <View style={styles.imagesContainer}>
          <Image style={styles.images} resizeMode='cover' source={{ uri: convertIP(product.image) }} />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text>{product.name}</Text>
          </View>
          <View>
            <Text style={styles.price}>{numberWithComma(product.price * quantity)}đ</Text>
          </View>
          <View style={styles.quantityAction}>
            <Text onPress={() => updateCart(product, quantity - 1, price, true)} style={styles.removeAction}>-</Text>
            <Text style={styles.quantity}>{quantity}</Text>
            <Text onPress={() => updateCart(product, quantity + 1, price, true)} style={styles.addAction}>+</Text>

          </View>
        </View>

      </View>)
  }

  return (
    <FlatList
      data={cart}
      renderItem={renderItem}
      keyExtractor={item => Math.random()}
      style={styles.flatlistContainer}
      showsVerticalScrollIndicator={false}
    />
  )
}


const Cart = (props) => {
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const { cart, resetCart } = useContext(ProductContext);
  const isShowCheckout = () => {
    const items = cart.filter(item => item.checked == true) || [];
    let total = 0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      total += element.quantity * element.price;
    }
    return { isShown: true, total: total };
  }

  const clearCart = () => {
    resetCart();
    setIsShowDeleteModal(false);
    ToastAndroid.show('Xóa giỏ hàng thành công', ToastAndroid.CENTER);
  }


  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
    <View style={styles.container}>
    <View style={styles.TitleView}>
          <View style={styles.Title}>
            <Image source={require("../../../assets/images/back.png")}></Image>
            <Text style={styles.TitleText}>GIỎ HÀNG</Text>
        <FontAwesome onPress={() => setIsShowDeleteModal(true)} name="trash-o" size={24} color="white" />
          
          </View>
        </View>
      <View>
        {
          cart.length == 0 ?
            <View style={styles.emtyContainer}>
              <Text style={styles.emty}>Giỏ hàng của bạn đang trống</Text>
            </View> :
            <CartItem cart={cart} />
        }
      </View>
      <View style={styles.checkoutContainer}>
        {
          isShowCheckout().isShown == true ?
            <>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tạm tính</Text>
                <Text style={styles.totalText}>{numberWithComma(isShowCheckout().total)}đ</Text>
              </View>
              <View>
                <Pressable onPress={() => setIsShowModal(true)} style={styles.buttonContainer} >
                  <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
                  <MaterialIcons style={styles.buttonText} name="keyboard-arrow-right" size={24} color="black" />
                </Pressable>
              </View>
            </> : <></>
        }

      </View>
      <CheckOutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} hi={isShowCheckout().total} cart={cart} />
      <DeleteModal isShowDeleteModal={isShowDeleteModal} setIsShowDeleteModal={setIsShowDeleteModal} resetCart={clearCart} />
    </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,.7)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    width: '90%',
    height: 360,
  },
  btnPair:{
    justifyContent:'space-between',
    flexDirection: "row",
    position: "absolute",
    bottom:15
  },
  checkoutButton: {
    backgroundColor: '#FE5045',
    height: 40,
    borderRadius: 4,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutText: {
    color: 'white',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#007537',
    margin: 10,
    height: 50,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  
  deleteText: {
    color: 'white',
    fontSize: 16
  },
  cancel: {
    color: 'black',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    fontSize: 16
  },
  flatlistContainer: {
    maxHeight: Dimensions.get('window').height - 200
  },
  buttonText: {
    color: 'white',
  },
  checkoutContainer: {
    paddingHorizontal: 28,
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  totalText: {
    opacity: 0.6
  },
  buttonContainer: {
    height: 50,
    backgroundColor: '#FE5045',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 16,
    width: '100%',
  },
  trash: {
    position: 'absolute',
    right: 24,
  },

  addAction: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 27.5,
    height: 27.5,
    textAlign: 'center',
    lineHeight: 20.5,
    color: 'black',
    marginHorizontal: 3,
  },
  quantity: {
    marginHorizontal: 30,
    marginTop: 4
  },
  removeAction: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 27.5,
    height: 27.5,
    textAlign: 'center',
    lineHeight: 20.5,
    color: 'black',
    marginHorizontal: 3,
  },
  quantityAction: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: "center",
    marginTop: 10,
    marginRight: 50
  },
  price: {
    fontSize: 16,
    color: '#007537'
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  checkedContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',

  },
  imagesContainer: {
    height: 77,
    width: 77,
    borderRadius: 8,

  },
  images: {
    width: '80%',
    height: '80%',
    borderRadius: 16,
    marginLeft:8
  },
  infoContainer: {
    marginLeft: 15,
  },
  emtyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    textTransform: 'uppercase'
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  TitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "500",
  },
  Title: {
    marginTop: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  TitleView: {
    height: 120,
    backgroundColor: "#FE5045",
    width: "100%",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingHorizontal: 16,
  },
  Conatiner: {
    flex: 1,
    width: "100%",
    height: "100%",
  },

});
