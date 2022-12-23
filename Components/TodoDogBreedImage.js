import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TodoDogBreedImage() {
  const navigation = useNavigation();
  const select = useSelector(state => state);
  console.log('select>>>>>', select.list2);
  let solve;
  if (select.list2 != null) {
    solve = select?.list2?.map(items => {
      //  console.log(items);
      return (
        <Image
          source={{
            uri: items,
          }}
          style={styles.Img}
        />
      );
    });
  }

  return (
    <View style={styles.main}>
      <ScrollView style={styles.ScrollView}>{solve}</ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.touchable1}>
        <Text style={styles.touchableText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.touchable2}>
        <Text style={styles.touchableText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  Img: {
    borderWidth: 3,
    height: 300,
    width: '100%',
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'white',
  },
  ScrollView: {
    width: '100%',
    marginBottom: 116,
  },
  touchable1: {
    borderWidth: 1,
    width: 300,
    flexDirection: 'row',
    position: 'absolute',
    top: 665.5,
    left: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    height: 60,
    width: '50%',
  },
  touchable2: {
    borderWidth: 1,
    width: 300,
    flexDirection: 'row',
    position: 'absolute',
    top: 665.5,
    right: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    height: 60,
    width: '50%',
  },
  touchableText: {
    resizeMode: 'contain',
    color: 'black',
    fontSize: 25,
  },
});
export default TodoDogBreedImage;
