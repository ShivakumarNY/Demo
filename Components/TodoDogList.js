import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createImage} from './Redux1/Form/Action';
import Unorderedlist from 'react-native-unordered-list';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function TodoDogList() {
  const select = useSelector(state => state);
  const main = Object.entries(select.list3).map(item => {
    return item;
  });
  // console.log('main>>>>>', main);
  const [List, setList] = useState(main);
  const [Item, setItem] = useState(null);
  const [Item1, setItem1] = useState(false);
  const [search, setSearch] = useState('');
  const [Sort, setSort] = useState(List);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  async function fetchText1(value) {
    //  console.log(value);
    let response = await fetch(`https://dog.ceo/api/breed/${value}/images`);
    let data = await response.json();
    // console.log('data.massage', data.message);
    dispatch(createImage(data.message));
  }
  async function fetchText2(value1, value2) {
    const i = `https://dog.ceo/api/breed/${value1}/${value2}/images`;
    let response = await fetch(i);
    let data = await response.json();
    dispatch(createImage(data.message));
  }

  const handleBreedImages = value => {
    fetchText1(value);
    navigation.navigate('dogImage');
  };
  const searchFilterFunction = text => {
    if (text) {
      const newData = List?.filter(function (item) {
        const itemData = item[0] ? item[0].toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setSort(newData);
      setSearch(text);
    } else {
      setSort(List);
      setSearch(text);
    }
  };
  let res = '';
  if (Sort !== null) {
    res = Sort?.map((items, index) => {
      return (
        <View style={styles.breedView}>
          <TouchableOpacity
            onPress={() => {
              handleBreedImages(items[0]);
            }}>
            <Text style={styles.breedName}>
              {index + 1 + ') '}
              {items[0].toUpperCase()}
            </Text>
          </TouchableOpacity>

          {items[1].length > 0 ? (
            <TouchableOpacity
              onPress={() => {
                setItem(index);
                setItem1(!Item1);
              }}
              style={styles.subBrredNo}>
              <Text style={styles.subBrredNoText}>{items[1].length}</Text>
            </TouchableOpacity>
          ) : null}

          <View style={styles.innerView0}>
            {Item === index && Item1 === true
              ? items[1].map(item => {
                  return (
                    <Unorderedlist style={styles.innerView1}>
                      <TouchableOpacity
                        onPress={() => {
                          fetchText2(items[0], item),
                            navigation.navigate('dogImage');
                        }}>
                        <Text style={styles.innerView}>{item}</Text>
                      </TouchableOpacity>
                    </Unorderedlist>
                  );
                })
              : null}
          </View>
        </View>
      );
    });
  }
  // console.log(view);

  return (
    <View style={styles.main}>
      <TextInput
        onChangeText={text => {
          searchFilterFunction(text);
        }}
        value={search}
        placeholder="Search"
        style={styles.touchable1}></TextInput>
      <ScrollView style={styles.ScrollView}>{res}</ScrollView>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home');
        }}
        style={styles.touchable}>
        <Text style={styles.touchableText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  innerView: {
    marginTop: 12,
    fontSize: 20,
  },
  innerView1: {
    // backgroundColor: 'white',
    fontSize: 40,
    //marginTop: 10,
    marginLeft: 40,
    color: 'rgb(54, 51, 51)',
  },
  subBrredNoText: {
    fontSize: 25,
  },

  ScrollView: {
    width: '100%',
    marginBottom: 116,
    marginTop: 60,
  },
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(245, 159, 159)',
  },
  breedView: {
    paddingLeft: 10,
    minHeight: 60,
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 30,
    width: 300,
    marginTop: 10,
    backgroundColor: 'beige',
  },
  subBrredNo: {
    backgroundColor: 'rgb(88, 162, 187)',
    borderRadius: 20,
    position: 'absolute',
    right: -0.2,
    top: 0,
    height: 60,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breedName: {
    color: 'black',
    fontSize: 25,
  },
  touchable: {
    width: 300,
    flexDirection: 'row',
    position: 'absolute',
    top: 665.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgreen',
    height: 60,
    width: '98%',
  },
  touchable1: {
    width: '100%',
    position: 'absolute',
    top: 0,
    borderRadius: 30,
    backgroundColor: 'white',
    height: 55,
    width: '97%',
    paddingLeft: 30,
  },
  touchableText: {
    resizeMode: 'contain',
    color: 'black',
    fontSize: 25,
  },
});
export default TodoDogList;
