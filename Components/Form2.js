import React from 'react';
import {View, Text, Button, Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

const Form2 = () => {
  const navigation = useNavigation();
  const Selector = useSelector(state => state);
  console.log('Selector==>', Selector);

  return (
    <View style={styles.mainView}>
      <Text style={styles.login}>Login Details</Text>
      <View style={styles.emailView1}>
        <Text style={styles.Text1}>Email</Text>
      </View>
      <View style={styles.emailView2}>
        <Text style={styles.Text2}>{Selector.list.email}</Text>
      </View>
      <View style={styles.passView1}>
        <Text style={styles.Text1}>Password</Text>
      </View>
      <View style={styles.passView2}>
        <Text style={styles.Text2}>{Selector.list.password}</Text>
      </View>
      <View style={styles.numView1}>
        <Text style={styles.Text1}>Number</Text>
      </View>
      <View style={styles.numView2}>
        <Text style={styles.Text2}>{Selector.list.number}</Text>
      </View>
      <View style={styles.genderView1}>
        <Text style={styles.Text1}>Gender</Text>
      </View>
      <View style={styles.genderView2}>
        <Text style={styles.Text2}>{Selector.list.gender}</Text>
      </View>
      {/*<View style={styles.dobView1}>
      <Text style={styles.Text1}>date</Text>
    </View>
    <View style={styles.dobView2}>
      <Text style={styles.Text2}>{Selector.list.date}</Text>
    </View>
  */}
      <Pressable
        style={styles.PreassableBack}
        onPress={() => {
          navigation.goBack();
        }}>
        <Text style={styles.BackText}>back</Text>
      </Pressable>
    </View>
  );
};
export default Form2;

const styles = StyleSheet.create({
  login: {
    fontSize: 40,
    marginLeft: 85,
    marginTop: 30,
  },
  mainView: {
    backgroundColor: 'rgb(223, 242, 245)',
    height: '100%',
  },
  Text1: {
    fontSize: 20,
  },
  Text2: {
    fontSize: 20,
    marginLeft: 10,
  },
  emailView1: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    top: 110,
    right: 300,
  },

  emailView2: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 280,
    justifyContent: 'center',

    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 110,
    right: 15,
  },
  passView1: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    top: 165,
    right: 300,
  },

  passView2: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 280,
    justifyContent: 'center',

    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 165,
    right: 15,
  },
  numView1: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    top: 225,
    right: 300,
  },

  numView2: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 280,
    justifyContent: 'center',

    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 225,
    right: 15,
  },
  genderView1: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    top: 280,
    right: 300,
  },

  genderView2: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 280,
    justifyContent: 'center',

    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 280,
    right: 15,
  },
  dobView1: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderTopLeftRadius: 25,
    position: 'absolute',
    top: 335,
    right: 300,
  },

  dobView2: {
    backgroundColor: 'powderblue',
    height: 45,
    width: 280,
    justifyContent: 'center',

    borderBottomEndRadius: 25,
    borderTopEndRadius: 25,
    position: 'absolute',
    top: 335,
    right: 15,
  },

  PreassableBack: {
    backgroundColor: 'green',
    height: 40,
    width: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 375,
    right: 140,
  },
  BackText: {
    fontSize: 20,
  },
});
