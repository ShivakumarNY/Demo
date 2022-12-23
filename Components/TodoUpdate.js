import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {createList, editItem} from './Redux1/Form/Action';

import {useNavigation} from '@react-navigation/native';

function TodoUpdate(props) {
  const {Items} = props.route.params;
  // console.log(Items.msg);

  const [title, setTitle] = useState(Items.title);
  const [msg, setMsg] = useState(Items.msg);
  const dispatch = useDispatch();
  const select = useSelector(state => state);
  const navigation = useNavigation();
  const new1 = {
    date: Items.date,
    time: Items.time,
    title: title,
    msg: msg,
    img: Items.img,
  };
  const handleUpdate = () => {
    dispatch(editItem(Items, new1));
    navigation.navigate('List');
  };

  return (
    <View style={styles.main}>
      <View style={styles.title}>
        <Text style={styles.Text1}>title</Text>
        <TextInput
          defaultValue={Items.title}
          onChangeText={title => {
            setTitle(title);
          }}
          style={styles.titleInput}></TextInput>
      </View>
      <View style={styles.msg}>
        <Text style={styles.Text1}>massage</Text>
        <TextInput
          defaultValue={Items.msg}
          onChangeText={msg => {
            setMsg(msg);
          }}
          style={styles.msgInput}></TextInput>
      </View>
      <Pressable onPress={handleUpdate} style={styles.submit}>
        <Text style={styles.Text1}>Update </Text>
      </Pressable>
    </View>
  );
}

export default TodoUpdate;
const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100%',
    backgroundColor: 'rgb(245, 159, 159)',
  },
  date: {
    backgroundColor: 'powderblue',
    height: 35,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    borderRadius: 15,
  },
  submit: {
    backgroundColor: 'green',
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 530,
    borderRadius: 10,
  },
  time: {
    backgroundColor: 'powderblue',
    height: 35,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 90,
    borderRadius: 15,
  },
  title: {
    backgroundColor: 'azure',
    height: 35,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 150,
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
    top: 280,
    //borderRadius: 15,
    borderTopEndRadius: 25,
    borderTopLeftRadius: 25,
  },
  msgInput: {
    backgroundColor: 'azure',
    height: 200,
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
});
