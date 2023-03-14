import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from '../ProductContext';
import { Searchbar } from 'react-native-paper';
const List = (props) => {
  const { navigation } = props;
  const { products, onGetProducts } = useContext(ProductContext);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await onGetProducts.getData;
      // console.log('response in list .js', response);
    }
    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    const { _id, image, name, price } = item;
    return (
      <Pressable style={styles.containerView} onPress={() => navigation.navigate('Detail', { _id: _id })} key={_id}>
        <View style={styles.ContainerItem}>
          <View style={styles.Product}>
            <View style={styles.ContainerImageItem}>
              <Image
                style={styles.imageItem}
                resizeMode="cover"
                source={{ uri: image }}
              ></Image>
            </View>
            <View style={styles.textItem}>

              <Text style={styles.descriptionProduct}>{name}</Text>
              <Text style={styles.priceproduct}>{price} $</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  const [input, setInput] = useState("");
  return (
    <View style={styles.Conatiner} onPress={()=>Keyboard.dismiss()}>
      <View style={styles.TitleView}>
        <View style={styles.Title}>
          <Image source={require("../../../assets/images/back.png")}></Image>
          <Text style={styles.TitleText}>         DANH SÁCH</Text>
          <Image source={require("../../../assets/images/bacham.png")}></Image>
        </View>
      </View>
      <TextInput style={styles.TextSearch}
        placeholder="Tìm kiếm sản phẩm"
        onChangeText={setInput}/>

      {
        products.lengt == 0 ?
          <Text style={styles.loading}>Đang tải dữ liệu, bạn đợi tí nhé</Text> :
          <FlatList
            style={styles.flatList}
            data={products.filter(item=>item.name.toLowerCase().includes(input.toLowerCase()))}
            numColumns={2}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
          ></FlatList>
      }
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  priceproduct: {
    color: "red",
    fontWeight: "600",
  },
  descriptionProduct: {
    fontSize: 14,
    fontWeight: "400",
  },
  flatList: {
    paddingHorizontal: 16,
  },
  textItem: {
    paddingHorizontal: 8,
    width: "100%",
    marginBottom: 8,
  },
  imageItem: {
    width: "100%",
    height: "80%",
    borderRadius: 16,
  },
  ContainerImageItem: {
    marginTop: 8,
    width: "100%",
    height: 160,
    alignItems: "center",
  },
  Product: {
    width: "100%",
    marginTop: 8,
    backgroundColor: "white",
    borderRadius: 16,
  },
  ContainerItem: {
    width: "96%",
  },
  containerView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  TextSearch: {
    width: "90%",
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: "900",
    alignSelf: 'center',
    marginVertical: 16,
    backgroundColor: "#fff",
    height: 60
  },
  Search: {
    flexDirection: "row",
    paddingHorizontal: 16,
    backgroundColor: "white",
    width: "100%",
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
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
