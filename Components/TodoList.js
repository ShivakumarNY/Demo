import React, {useState, useEffect, useCallback} from 'react';
import {debounce} from 'lodash';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Button,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {clearList, createItem} from './Redux1/Form/Action';
import {useNavigation} from '@react-navigation/native';
import {Searchbar} from 'react-native-paper';
import {TextInput} from 'react-native-gesture-handler';

function TodoList() {
  const dispatch = useDispatch();
  const select = useSelector(state => state);
  const navigation = useNavigation();
  const [startDate, setStartDate] = useState(null);
  const [Index, setIndex] = useState(null);
  const [Items, setItems] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  // const [filteredData, setFilteredData] = useState(select.list);
  const [reduxData, setReduxData] = useState(select.list);
  const [openFilter, setOpenFilter] = useState(false);
  const [Sort, setSort] = useState(select.list);

  useEffect(() => {
    const date = new Date();
    if (startDate === null) {
      setStartDate(
        date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate(),
      );
    }
  }, []);

  const getPreviousDate = () => {
    const currentDayInMilli = new Date(startDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const previousDayInMilli = currentDayInMilli - oneDay;
    const previousDate = new Date(previousDayInMilli);
    const data1 = new Date(previousDate);
    setStartDate(
      data1.getFullYear() +
        '-' +
        (data1.getMonth() + 1) +
        '-' +
        data1.getDate(),
    );
    // console.log({ StartDate });
  };
  const getNextDate = () => {
    const currentDayInMilli = new Date(startDate).getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const nextDayInMilli = currentDayInMilli + oneDay;
    const nextDate = new Date(nextDayInMilli);

    const data2 = new Date(nextDate);
    setStartDate(
      data2.getFullYear() +
        '-' +
        (data2.getMonth() + 1) +
        '-' +
        data2.getDate(),
    );
  };

  //= const res = filteredData.slice(0).sort((a, b) => a.time.localeCompare(b.time));

  const massage = Sort.map((items, index) =>
    startDate === items?.date ? (
      <View style={styles.item}>
        <Text style={styles.title}>{items.title}</Text>
        <ImageBackground
          style={styles.dotImg1}
          source={{
            uri: items.img
              ? items.img
              : 'https://reactnative.dev/img/tiny_logo.png',
          }}>
          <Text style={styles.msgText}>{items.msg}</Text>
          <Text style={styles.time}>{items.time}</Text>
        </ImageBackground>

        <Pressable
          onPress={() => {
            setIndex(index);
            setItems(items);
            setShowModal(true);
          }}
          style={styles.dotPress}>
          <Image
            source={{
              uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB7CAMAAABjGQ9NAAAAYFBMVEX///8AAABPT0/8/Pz4+Ph+fn68vLwEBAS1tbXLy8u4uLjw8PCZmZlqamr09PTj4+N3d3ehoaHb29sVFRXq6uooKCgiIiKMjIzR0dGqqqoQEBBDQ0MyMjLCwsJZWVmEhIS2hLfFAAABw0lEQVRoge2ay3aDIBRFEVR8BqUao0bz/39ZMSZBmHYdVtu7h042IMI9CGMEQRAEQRAEQfwNhE7T9BbjvSwe58hwr0q0XD3Nhj5HigXTX5EFVH65R9KWK6B7iM7uGqfurpGDhrkXVx1VMPfgmGW0wtyN128OcycB3ZXnxk30m+fOYO54dtR9B3Oz1FpbpER+Ytt6XlvubaYBN1LBGLdG/HoxT4B85noC9W49F6yr1v7rygcN7vTRgLIs470dBEEQxC/FrOEqezTJqAV+L1H1UT2sN6hX7FXTmxYqP6mNHDfsQtk5VGIDeO3GEly/lZcNcB3Pzsl/Y4C5H45ZArPgf83Ao+fG5QPtuReYW6zOGdd8gblN+D+5C5xasDbQ295pX182Xs1Y/krgM3DAd7a6ReQD5zxZ0MGfIAiC+HFEHORYUbA4bfjMm7HE7yVFf+yhU7s3BYhdJq9Yt/V3Tkrk79CtaHFK5BGnNjXyiTvu37+fDVKYu/XcDcwdMguGzMAhs3/huXFnHmpyxxx4tui+8BW4pnZOx3HXPNixqL4jeIHdx/LPFZcpQ9cPXfK80jTVOkDpUi5tVRXA2wYEQRAEQRBB+AZ8tA5nsixpxgAAAABJRU5ErkJggg==',
            }}
            style={styles.dotImg}
          />
          <Modal isVisible={showModal}>
            <View style={styles.modal}>
              <Pressable
                style={styles.modal1}
                onPress={() => {
                  navigation.navigate('Update', {Items: Items});
                  setShowModal(false);
                }}>
                <Text style={styles.modal2}>Edit</Text>
              </Pressable>
              <Pressable
                style={styles.modal1}
                onPress={() => {
                  // console.log(Index);
                  dispatch(clearList(Index));
                  setShowModal(false);
                }}>
                <Text style={styles.modal2}>Clear</Text>
              </Pressable>
            </View>
          </Modal>
        </Pressable>
      </View>
    ) : null,
  );

  const searchFilterFunction = text => {
    console.log(text);
    if (text) {
      const newData = reduxData.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      // setFilteredData(newData);
      setSort(newData);
      setSearch(text);
    } else {
      setSort(reduxData);
      // setFilteredData(reduxData);
      setSearch(text);
    }
  };
  return (
    <View style={styles.main}>
      <View style={styles.head}>
        <Pressable onPress={getPreviousDate} style={styles.BackImg}>
          <Text style={styles.BackImgText}>back</Text>
        </Pressable>
        <Text style={styles.date}>{startDate}</Text>
        <Pressable onPress={getNextDate} style={styles.NextImg}>
          <Text style={styles.BackImgText}>next</Text>
        </Pressable>
      </View>
      <TextInput
        style={styles.search}
        placeholder="Search Here"
        onChangeText={text => {
          searchFilterFunction(text);
        }}
        value={search}
      />
      <Pressable
        onPress={() => {
          setOpenFilter(true);
        }}
        style={styles.sortPreassble}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/31/31063.png',
          }}
          style={styles.dotImg10}
        />
      </Pressable>
      <Modal isVisible={openFilter}>
        <View style={styles.modalsort}>
          <View style={styles.buttonStyle1}>
            <Text style={styles.modal2}>Sort Based On Time</Text>
          </View>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              setSort(
                Sort.slice(0).sort((a, b) => a.time.localeCompare(b.time)),
              );
              setOpenFilter(false);
            }}>
            <Text style={styles.modal2}> Ascending</Text>
          </Pressable>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              setSort(
                Sort.slice(0).sort((a, b) => b.time.localeCompare(a.time)),
              );
              setOpenFilter(false);
            }}>
            <Text style={styles.modal2}>Decending</Text>
          </Pressable>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              setSort(Sort);
              setOpenFilter(false);
            }}>
            <Text style={styles.modal2}>default</Text>
          </Pressable>
        </View>
      </Modal>
      <View style={styles.View2}>
        <ScrollView>{massage}</ScrollView>
      </View>
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

export default TodoList;
const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    borderRadius: 15,
    width: 250,
  },
  buttonStyle1: {
    alignItems: 'center',
    backgroundColor: '#b34d4d',
    padding: 5,
    marginVertical: 10,
    marginBottom: 20,
    borderRadius: 5,
    width: 250,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalsort: {
    // flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 200,
    right: 25,
    backgroundColor: 'rgb(201, 248, 248)',
    height: 240,
    width: 300,
    borderRadius: 30,
  },
  sortPreassble: {
    backgroundColor: 'white',
    width: 50,
    height: 48,
    position: 'absolute',
    borderRadius: 15,
    top: 68,
    right: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    paddingLeft: 30,
    position: 'absolute',
    top: 68,
    left: 20,
    width: 280,
    borderRadius: 20,
    backgroundColor: 'azure',
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
  modal: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    position: 'absolute',
    top: 200,
    right: 25,
    backgroundColor: 'rgb(201, 248, 248)',
    height: 170,
    width: 300,
    borderRadius: 30,
  },
  modal1: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(84, 206, 84)',
    height: 70,
    width: 100,
    borderRadius: 10,
  },
  modal2: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    color: 'black',
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    height: 250,
    width: 300,
    backgroundColor: 'white ',
    borderWidth: 1,
  },
  title: {
    color: 'black',
    fontSize: 25,
    position: 'absolute',
    top: 0,
  },
  time: {
    color: 'white',
    fontSize: 17,
    position: 'absolute',
    top: 190,
    right: 5,
  },

  msgText: {
    color: 'white',
    fontSize: 17,
    margin: 7,
  },
  dotPress: {
    height: 35,
    width: 35,
    borderRadius: 10,
    color: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
  },

  dotImg: {
    height: 34,
    width: 34,
    borderRadius: 10,
    color: 'red',
  },
  dotImg10: {
    height: 40,
    width: 40,
    borderRadius: 10,
    color: 'red',
  },

  dotImg1: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 36,
    height: 212,
    width: 298,
    borderRadius: 20,
    position: 'absolute',
  },

  main: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(245, 159, 159)',
  },
  View2: {
    display: 'flex',
    //flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 520,
    width: 350,
    backgroundColor: 'azure',
    borderRadius: 20,
    position: 'absolute',
    top: 120,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 65,
    width: 350,
    backgroundColor: 'azure',
    borderRadius: 20,
    position: 'absolute',
    top: 0,
  },
  BackImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  BackImgText: {
    color: 'black',
    fontSize: 18,
  },
  NextImg: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: 'lightgreen',
  },
  date: {
    fontSize: 25,
    color: 'black',
  },
});
