import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Picker,
  StyleSheet,
  StatusBar,
  RefreshControl
} from "react-native";
import InputBox from "../components/InputBox";


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };

    this.inputUsername = null;
  }

  handleInput = (key, text) => {
    this.setState({ [key]: text });
  };

  submitLogin = () => {
    if (this.state.username == "admin" && this.state.password == "admin") {
      alert("Login berhasil");
    } else {
      alert("Login gagal");
    }
  };

  render() {
    return (
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => console.warn("refresh")}
          />
        }
      >
        <StatusBar hidden={false} />
        
        <Text style={styles.header}>
            Halo, Selamat Datang!
        </Text>
        <Text style={{ paddingBottom:20 }}>
          Sudah ke kebun hari ini? {"\n"}
          Ayo ke kebun dan mulai aktivitasmu di hari yang hujan ini!
        </Text>
        <Text>Username</Text>
        <TextInput
          placeholder="Username"
          onChangeText={text => this.handleInput("username", text)}
          style={styles.input}
          value={this.state.username}
          label="Username"
        />
        <Text style={{ paddingTop: 10}}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={this.state.password}
          onChangeText={text => this.handleInput("password", text)}
          secureTextEntry={true}
          label="Password"
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={this.submitLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <Text style={styles.forget}>Lupa kata sandi?</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  content: {
    margin:20
  },
  button: {
    backgroundColor: "#1cbc9b",
    padding: 12,
    alignSelf: "center",
    width: 450,
    marginTop:15,
    borderWidth: 1,
    borderColor: '#1cbc9b'
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },
  header:{
    fontWeight: 'bold',
    fontSize: 25,
    marginBottom:20
  },
  input: {
    borderWidth: 1,
    borderColor: "#1cbc9b",
  },
  forget:{
    alignSelf: "center",
    color: '#1cbc9b',
    paddingTop: 10,
    fontWeight: 'bold'
  }
});
