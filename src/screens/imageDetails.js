import { View, Text, Image, Dimensions, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getDocs,
  query,
  collection,
  where,
} from 'firebase/firestore';
import {db} from '../utils/firebase';
import { useSelector } from 'react-redux';

const ImageDetails = () => {
  const theme = useSelector((state) => state.theme.activeTheme);
  const [user, setUser] = useState(null)
  const {
    params: { imageItem },
  } = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const q = query(collection(db, 'user'), where('id', '==', imageItem.userID));
    await getDocs(q).then(res => {
      const _user = res.docs.map(item => item.data());
      setUser(_user);
    });
  };


  useEffect(() => {
    navigation.setOptions({
      title: `${user?.[0]?.firstName} ${user?.[0]?.lastName} 's photo `,
    });
  }, [user]);


  return (
    <View style={[styles.imageContainer, { backgroundColor: theme.backgroundColor }]}>
      <Image style={styles.image} source={{uri: imageItem.photoURL}}/>
      <Text style={[styles.imageText, {color: theme.color}]}>Uploaded by {user?.[0]?.firstName + ' ' + user?.[0]?.lastName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
  },
  image: {
    width: Dimensions.get("screen").width,
    height: 300,
  },
  imageText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
    flex:1,
    alignSelf: 'center'
  }
});

export default ImageDetails