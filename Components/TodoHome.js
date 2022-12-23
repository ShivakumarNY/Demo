import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {createData} from './Redux1/Form/Action';
function TodoHome() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  async function fetchText() {
    let response = await fetch('https://dog.ceo/api/breeds/list/all');
    let data = await response.json();
    console.log('fetch/>...............................>', data);
    dispatch(createData(data.message));
  }
  const fetchUser = async () => {
    const url = 'https://dog.ceo/api/breeds/list/all';
    const response = await axios.get(url);
    console.log('Axios.....>>>>>>>>>>>>>>>', response.data);
    dispatch(createData(response.data.message));
  };
  return (
    <View style={styles.main}>
      <Pressable style={styles.Pressable1}>
        <Text
          onPress={() => {
            navigation.navigate('Create');
          }}
          style={styles.Pressable1text}>
          Create
        </Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('List');
        }}
        style={styles.Pressable2}>
        <Text style={styles.Pressable1text}>List</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          fetchText();
          // fetchUser();
          navigation.navigate('dogList');
        }}
        style={styles.Pressable4}>
        <Text style={styles.Pressable1text}>Dog List</Text>
      </Pressable>
      <View style={styles.bottomView}>
        <Pressable
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.Pressable3}>
          <Text style={styles.Pressable1text}>Home</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('List');
          }}
          style={styles.Pressable3}>
          <Text style={styles.Pressable1text}>List</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate('Create');
          }}
          style={styles.Pressable3}>
          <Text style={styles.Pressable1text}>Create</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(245, 159, 159)',
  },

  bottomView: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 20,
    width: 380,
    height: 60,
    backgroundColor: 'rgb(245, 159, 159)',
    position: 'absolute',
    top: 640,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Pressable3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkgray',
    height: 45,
    width: 100,
    borderRadius: 20,
    margin: 15,
    borderWidth: 1,
    borderColor: 'gold',
  },

  Pressable1text: {
    fontSize: 20,
    color: 'black',
  },
  Pressable1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: 80,
    width: 220,
    borderRadius: 10,
    position: 'absolute',
    borderWidth: 2,
    borderColor: 'black',
    top: 80,
  },
  Pressable2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    height: 80,
    width: 220,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    position: 'absolute',
    top: 190,
  },
  Pressable4: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'mediumseagreen',
    height: 80,
    width: 220,
    borderWidth: 2,
    borderColor: 'darkslategray',
    borderRadius: 10,
    position: 'absolute',
    top: 400,
  },
});

export default TodoHome;
