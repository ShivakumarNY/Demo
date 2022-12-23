import React, {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {createList} from './Redux1/Form/Action';

import {useNavigation} from '@react-navigation/native';

import DateTimePicker from '@react-native-community/datetimepicker';

function TodoCreate() {
  const date1 = new Date();
  const [date, setDate] = useState(
    date1.getFullYear() + '-' + (date1.getMonth() + 1) + '-' + date1.getDate(),
  );
  // console.log(date);
  const [time, setTime] = useState(date1.getHours() + ':' + date1.getMinutes());
  const [title, setTitle] = useState('');
  const [msg, setMsg] = useState('');
  const [mydate, setMyDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(null);
  // console.log();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate || mydate;
    setMyDate(currentDate);
    setShow(false);
    {
      show1
        ? setDate(
            currentDate.getFullYear() +
              '-' +
              (currentDate.getMonth() + 1) +
              '-' +
              currentDate.getDate(),
          )
        : setTime(currentDate.getHours() + ':' + currentDate.getMinutes());
    }
  };

  const handleCreate = () => {
    dispatch(
      createList({
        date: date,
        time: time,
        title: title,
        msg: msg,
        img: filePath,
      }),
    );
    navigation.goBack();
  };
  ////////////////////////////////////IMAGE PICKER//////////////////////////////////////////////////
  const [filePath, setFilePath] = useState(
    'https://reactnative.dev/img/tiny_logo.png',
  );
  const [showModal, setShowModal] = useState(false);

  const captureImage = type => {
    let options = {
      mediaType: type,
      maxWidth: 150,
      maxHeight: 150,
      quality: 4,
      // includeBase64: true,
      saveToPhotos: true,
      presentationStyle: 'fullScreen',
    };
    launchCamera(options, response => {
      // console.log('Response = ', response);

      setFilePath(response.assets[0].uri);
    });
  };

  const chooseFile = type => {
    let options = {
      mediaType: type,
      maxWidth: 150,
      maxHeight: 150,
      presentationStyle: 'fullScreen',
      quality: 4,
    };
    launchImageLibrary(options, response => {
      setFilePath(response.assets[0].uri);
    });
  };
  const handleChooseImage = () => {
    chooseFile('photo'), setShowModal(false);
  };
  const handleLaunchCamera = () => {
    captureImage('photo'), setShowModal(false);
  };
  //////////////////////////////////////////////////////////////////////////////////////
  return (
    <View style={styles.main}>
      <Pressable
        style={styles.date}
        onPress={() => {
          setShow1(true);
          setShow(true);
        }}>
        <Text style={styles.Text12}>{date}</Text>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkY6KyEOT00X_CvEFMvSp2koCaK4HN65-rGw&usqp=CAU',
          }}
          style={styles.dotImg}
        />
      </Pressable>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={mydate}
          mode={show1 ? 'date' : 'time'}
          is24Hour={true}
          onChange={changeDate}
        />
      )}
      <Pressable
        style={styles.time}
        onPress={() => {
          setShow1(false);
          setShow(true);
        }}>
        <Text style={styles.Text123}>{time}</Text>
        <Image
          source={{
            uri: 'data:image/png;base64,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',
          }}
          style={styles.dotImg}
        />
      </Pressable>
      <View style={styles.title}>
        <Text style={styles.Text1}>title</Text>
        <TextInput
          onChangeText={title => {
            setTitle(title);
          }}
          style={styles.titleInput}></TextInput>
      </View>
      <View style={styles.msg}>
        <Text style={styles.Text1}>massage</Text>
        <TextInput
          onChangeText={msg => {
            setMsg(msg);
          }}
          style={styles.msgInput}></TextInput>
      </View>
      <Pressable
        onPress={() => {
          setShowModal(true);
        }}
        style={styles.ImagePressable}>
        <Text style={styles.ImageText}>Take photo</Text>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42SiqLNqHLLKsiQ49_qRSreuvd27_-jrClg&usqp=CAU',
          }}
          style={styles.dotImg1}
        />
      </Pressable>
      <Modal isVisible={showModal}>
        <View style={styles.modal}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={handleLaunchCamera}>
            <Text style={styles.textStyle}>Launch Camera</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={handleChooseImage}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <TouchableOpacity style={styles.submit} onPress={handleCreate}>
        <Text style={styles.Text1}>Create </Text>
      </TouchableOpacity>
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

export default TodoCreate;
const styles = StyleSheet.create({
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 5,
    marginVertical: 10,
    width: 250,
    borderRadius: 15,
  },
  modal: {
    // flex: 1,
    flexDirection: 'column',
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
  ImagePressable: {
    flexDirection: 'row',
    position: 'absolute',
    top: 430,
    borderRadius: 15,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgb(208, 228, 228)',
    height: 45,
    width: 195,
  },
  ImageText: {
    // marginLeft: 30,
    color: 'black',
    fontSize: 25,
  },
  dotImg: {
    height: 30,
    width: 30,
    borderRadius: 10,
    color: 'red',
  },
  dotImg1: {
    height: 34,
    width: 34,
    borderTopWidth: 3,
    borderRadius: 20,
    borderWidth: 1.3,
    borderColor: 'gold',
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
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(245, 159, 159)',
  },
  date: {
    flexDirection: 'row',
    backgroundColor: 'azure',
    height: 35,
    width: 180,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 25,
    borderRadius: 15,
  },
  submit: {
    backgroundColor: 'green',
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 565,
    borderRadius: 10,
  },
  time: {
    flexDirection: 'row',
    backgroundColor: 'azure',
    height: 35,
    width: 180,
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 75,
    borderRadius: 15,
  },
  title: {
    backgroundColor: 'azure',
    height: 35,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 125,
    //borderRadius: 15,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },
  titleInput: {
    backgroundColor: 'azure',
    height: 50,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 35,
    borderRadius: 15,
    fontSize: 20,
    color: 'black',
  },
  msg: {
    backgroundColor: 'azure',
    height: 35,
    width: 115,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 225,
    //borderRadius: 15,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },
  msgInput: {
    backgroundColor: 'azure',
    height: 150,
    width: 300,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 35,
    borderRadius: 15,
    fontSize: 20,
    color: 'black',
  },
  Text1: {
    fontSize: 25,
    color: 'black',
  },
  Text12: {
    fontSize: 22,
    color: 'black',
  },
  Text123: {
    marginLeft: 45,
    fontSize: 22,
    color: 'black',
  },
});
