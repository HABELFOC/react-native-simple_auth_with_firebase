import React, { Component } from 'react';
import { Text, Keyboard } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

/*
this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
*/

class LoginForm extends Component {

	state = {
		email: '',
		password: '',
		error: '',
		loading: false
	};

	// helper function

	onButtonPress(){

		Keyboard.dismiss();

		const { email, password } = this.state;

		this.setState({ error: '', loading: true});

		firebase.auth().signInWithEmailAndPassword(email, password)
		.then(this.onLoginSuccess.bind(this))
		.catch(() => firebase.auth().createUserWithEmailAndPassword(email, password))
		.then(this.onLoginSuccess.bind(this))
		.catch(this.onLoginFail.bind(this));
	}


	onLoginFail(){
		this.setState({
			error: 'Authentication Failed',
			loading: false
		});
	}

	onLoginSuccess(){
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	renderButton() {
		if (this.state.loading){
			return <Spinner size={"small"} />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				LOGIN
			</Button>
		);
	}

	// end of helper function


	render() {
		return (
			<Card>
				<CardSection>
					<Input
					returnKeyLabel='Next'
					placeholder={'user@gmail.com'}
					label='Email'
					maxLength={80}
					value={this.state.email}
					onChangeText={email => this.setState({ email })}
					underlineColorAndroid={'android'}
					/>
				</CardSection>
				<CardSection>
					<Input 
					returnKeyLabel='Go'
					secureTextEntry
					label={'Password'}
					placeholder={'password'}
					value={this.state.password}
					onChangeText={password => this.setState({ password })}
					underlineColorAndroid={'android'}
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>
					{this.state.error}
				</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>	
			</Card>
		);
	}
}


const styles = {
	errorTextStyle: {
		color: 'red',
		fontSize: 18,
		textAlign: 'center'
	}
};



export default LoginForm;