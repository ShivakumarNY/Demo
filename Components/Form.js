import React, {useState} from 'react';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-date-picker';
import faorm2 from './Form2';
import {useDispatch, useSelector} from 'react-redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Pressable,
  Button,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {createList} from './Redux1/Form/Action';

function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [number, setNumber] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [userOption, setUserOption] = useState(null);
  const [select, setSelect] = useState(null);
  const data = [{value: 'MALE'}, {value: 'FEMALE'}];
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      createList({
        email: email,
        password: password,
        number: number,
        gender: userOption,
        date: date,
      }),
    );
    isEnabled
      ? (setEmail(''),
        setNumber(''),
        setPassword(''),
        setUserOption(null),
        navigation.navigate('Form2'))
      : alert('please turn on the terms');
    {
      isEnabled ? setIsEnabled(previousState => !previousState) : null;
    }
  };

  return (
    <ScrollView>
      <Text style={styles.text}>Email</Text>
      <TextInput
        onChangeText={email => {
          setEmail(email);
        }}
        defaultValue={email}
        placeholder="Enter Email"
        style={styles.input}></TextInput>
      <Text style={styles.text}>Password</Text>
      <TextInput
        onChangeText={pass => {
          setPassword(pass);
        }}
        textContentType="password"
        maxLength={8}
        defaultValue={password}
        placeholder="Enter Password"
        style={styles.input}></TextInput>
      <Text style={styles.text}>Moblie No</Text>
      <TextInput
        onChangeText={No => {
          setNumber(No);
        }}
        maxLength={10}
        defaultValue={number}
        keyboardType="numeric"
        placeholder="Enter Number"
        style={styles.input}></TextInput>
      <Text style={styles.gender1}>Gender</Text>
      <RadioButton
        setUserOption={setUserOption}
        userOption={userOption}
        data={data}
      />

      <Text style={styles.text}>Date of birth</Text>
      <Pressable style={styles.date} onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>open</Text>
      </Pressable>

      <DatePicker
        mode="date"
        modal
        open={open}
        date={date}
        onConfirm={d => {
          setOpen(false);
          setDate(d);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <Text style={styles.text}>Terms</Text>
      <Switch
        style={styles.text1}
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? 'gold' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => setIsEnabled(previousState => !previousState)}
        value={isEnabled}
      />

      <Pressable style={styles.Pressable} onPress={() => handleLogin()}>
        <Text style={styles.PressableText}>login</Text>
      </Pressable>
    </ScrollView>
  );
}
/////////////////////////////////////////////////////////////////
function RadioButton({data, userOption, setUserOption}) {
  return (
    <View>
      {data.map(item => {
        return (
          <Pressable onPress={() => setUserOption(item.value)}>
            <Text style={styles.gender2}>* {item.value}</Text>
          </Pressable>
        );
      })}
      {userOption ? (
        <Text style={styles.gender3}> GENDER : {userOption}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  date0: {marginTop: 15},
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 15,
  },
  input: {
    paddingLeft: 15,
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    backgroundColor: 'darkgray',
    borderRadius: 20,
    width: 350,
    marginTop: 5,
  },
  gender1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  gender2: {
    color: 'black',
    fontWeight: '400',
    fontSize: 15,
    marginLeft: 20,
  },
  gender3: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    marginLeft: 20,
    marginTop: 7,
  },

  text1: {
    marginTop: 5,
    height: 40,
    width: 42,
    backgroundColor: 'rgb(243, 134, 134)',
    marginLeft: 20,
  },
  Pressable: {
    height: 35,
    width: 100,
    backgroundColor: 'cornflowerblue',
    borderRadius: 10,
    marginLeft: '41%',
    fontSize: 30,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  date: {
    height: 25,
    width: 100,
    backgroundColor: 'darkseagreen',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  PressableText: {
    fontSize: 25,
  },
  dateText: {
    fontSize: 15,
  },
});
export default Form;
