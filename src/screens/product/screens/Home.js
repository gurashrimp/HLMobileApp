import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
  RefreshControl,
  StatusBar,
  Dimensions
} from "react-native";
import { IP } from "../../../utils/constants";
import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../ProductContext";
const Home = (props) => {
  const { navigation } = props;
  const { products, onGetProducts } = useContext(ProductContext);
  const [sort, setSort] = useState('asc')
  const [productsLoaded, setProductsLoaded] = useState(false);
  //refresh
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false)
      setProductsLoaded(false)
    })
  }, []);

  //format number
  const numberWithComma = x => {
    try {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    } catch (error) {
      console.log(error);
    }
  };

  //get img local
  function convertIP(image) {
    try {
      image = image.replace("localhost", IP);
      return image;
    } catch (error) {
      console.log(error)
    }
  }

  //first time load data
  useEffect(() => {
    async function fetchData() {
      const response = await onGetProducts(sort);
      setProductsLoaded(true)
    }
    fetchData();
  }, [productsLoaded]);

  const handleSort = async () => {
    if (sort === 'asc') {
      setSort('desc')
      return await onGetProducts('desc')
    } else {
      setSort('asc')
      return await onGetProducts('asc')
    }
  }

  const header = () => {
    return (
      <>
        <View style={styles.ContainerTitle}>
          <View style={styles.Title}>
            <Text style={styles.TitleText}>LapTop Shop</Text>
            <Image
              style={styles.ImageTitle}
              source={require("../../../assets/images/danhmuc.png")}
            ></Image>
          </View>

          <View style={styles.Poster}>
            <Image
              style={styles.ImagePoster}
              source={require("../../../assets/images/poster.jpg")}
            ></Image>
            <View style={styles.New}>
              <Text style={styles.TextNew}>Mới</Text>
            </View>
          </View>
          <View style={styles.Brand}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              <View style={styles.BrandItem}>
                <Image
                  style={styles.BrandImage}
                  source={require("../../../assets/images/hp.png")}
                ></Image>
              </View>
              <View style={styles.BrandItem}>
                <Image
                  style={styles.BrandImage}
                  source={require("../../../assets/images/lenovo.png")}
                ></Image>
              </View>
              <View style={styles.BrandItem}>
                <Image
                  style={styles.BrandImage}
                  source={require("../../../assets/images/asus.jpg")}
                ></Image>
              </View>
              <View style={styles.BrandItem}>
                <Image
                  style={styles.BrandImage}
                  source={require("../../../assets/images/dell.png")}
                ></Image>
              </View>
              <View style={styles.BrandItem}>
                <Image
                  style={styles.BrandImage}
                  source={require("../../../assets/images/dell.png")}
                ></Image>
              </View>
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSort}>
          <Text style={{ fontWeight: "600", fontSize: 16, marginVertical: 8, color: '#F8774A' }}>{sort == 'asc' ? 'Giảm dần' : 'Tăng dần'}</Text>
        </TouchableOpacity>
      </>
    )
  }

  const renderItem = ({ item }) => {
    const { _id, image, name, price } = item;
    // let nPrice=new Intl.NumberFormat('en-CA',{style:'decimal'}).format(price);
    return (
      <>
        <Pressable
          style={styles.containerView}
          onPress={() => navigation.navigate("Detail", { _id: _id })}
        >
          <View style={styles.ContainerItem}>
            <View style={styles.Product}>
              <View style={styles.ContainerImageItem}>
                <Image
                  style={styles.imageItem}
                  resizeMode={"cover"}
                  source={{ uri: convertIP(image) }}
                />
              </View>
              <View style={styles.textItem}>
                <Text style={styles.descriptionProduct} numberOfLines={2}>{name}</Text>
                <Text style={styles.priceproduct}>{numberWithComma(price)} đ</Text>
              </View>
            </View>
          </View>
        </Pressable>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.Container}>
      <View>
        <FlatList
          ListHeaderComponent={header}
          style={styles.flatList}
          data={products}
          numColumns={2}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => Math.random()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  button: {
    alignSelf: "flex-end",
    backgroundColor: '#fff',
    width: 100,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 6,
  },
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
  },
  imageItem: {
    width: "90%",
    height: "80%",
    borderRadius: 16,
  },
  ContainerImageItem: {
    marginTop: 8,
    width: "100%",
    height: 150,
    alignItems: "center",
  },
  Product: {
    width: "100%",
    marginTop:20,
    height:Dimensions.get('screen').height*0.3,
    backgroundColor: "#fff",
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
  BrandImage: {
    width: 60,
    height: 60,
  },
  BrandItem: {
    width: 60,
    height: 80,
    backgroundColor: "white",
    marginHorizontal: 16,
    justifyContent: "center",
  },
  Brand: {
    width: "100%",
    height: 80,
    backgroundColor: "white",
    marginVertical: 4,
  },
  TextNew: {
    color: "red",
    fontSize: 16,
    fontWeight: "500",
  },
  New: {
    marginTop: -184,
    marginLeft: 16,
    width: 60,
    height: 24,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  ImagePoster: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  Poster: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    marginTop: 8,
  },

  ImageTitle: {
    right: 8,
    position: "absolute",
  },
  TitleText: {
    fontSize: 24,
    color: "white",
    fontWeight: "500",
  },
  Title: {
    paddingHorizontal: 8,
    marginTop: 40,
    flexDirection: "row",
  },

  ContainerTitle: {
    paddingHorizontal: 0,
  },
  Container: {
    flex: 1,
    backgroundColor: "#FE5045",
    marginTop: StatusBar.currentHeight
  },
});

