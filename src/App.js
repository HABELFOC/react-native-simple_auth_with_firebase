import React, { Component } from 'react';
import { View, Keyboard } from 'react-native';
import firebase from 'firebase';
import { 
	APIKEY, 
	AUTHDOMAIN, 
	DATABASEURL, 
	PROJECTID,
	STORAGEBUCKET,
	MSGSENDERID
} from 'react-native-dotenv';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {

	state = {
		loginStatus: null
	};

	componentWillMount(){
		firebase.initializeApp({
			apiKey: APIKEY,
	    	authDomain: AUTHDOMAIN,
	    	databaseURL: DATABASEURL,
	    	projectId: PROJECTID,
	    	storageBucket: STORAGEBUCKET,
	    	messagingSenderId: MSGSENDERID
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({
					loginStatus: true
				});
			}else {
				this.setState({
					loginStatus: false
				});
			}
			
		});
	}


	userLogOut(){

		this.setState({
			loginStatus: null
		});

		firebase.auth().signOut()
		.then(() => {
			this.setState({
				loginStatus: false
			});
		});

	}


	renderLoginStatus() {	
		switch (this.state.loginStatus) {
			case true:
				return (
					<Card>
						<CardSection>
						<Button onPress={this.userLogOut.bind(this)}>Log Out</Button>
						</CardSection>
					</Card>
					);
			case false:
				return <LoginForm />;
			default:
				return <Spinner size="large" />;
		}
	}

	render() {
		return(
			<View style={styles.container}>
				<Header headerText="Authentication" />
				{this.renderLoginStatus()}
			</View>
		);
	}
}


const styles = {
	container: {
		flex: 1
	},
	logOutBtnStyle: {
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	}
};


export default App;