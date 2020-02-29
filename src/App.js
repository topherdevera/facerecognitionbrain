import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app =new Clarifai.App({
	apiKey: 'ffac2d06c3464f3a91133d3d44f37056'
});

const particlesOptions = {
	particles: {
	    number: {
	        value: 100,
	        density: {
	            enable: true,
	            value_are: 800
	        }
	    }
	}
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			input: '',
			imageUrl: '',
			route: 'signin',
			isSignedIn: 'false'
		}
	}

	onInputChange = (event) => {
		this.setState({ input: event.target.value });
	}

	onButtonSubmit = () => {
		this.setState({ imageUrl: this.state.input })
		app.models
			.predict(
				 Clarifai.FACE_DETECT_MODEL,
				 this.state.input)
			.then(
		    function(response) {
		      console.log(response);
		    },
		    function(err) {
		      // there was an error
		    }
		  );
	}

	onRouteChange = (route) => {
		this.setState({route: route});
	}

	render() {
		return (
		    <div className="App">	
		    	<Particles className='particles'
					    params={particlesOptions} 
				/>
				    <Navigation onRouteChange={this.onRouteChange}/>
				    { this.state.route === 'home'  
				    	?<div>
				      		<Logo />
						    <Rank />
						    <ImageLinkForm 
							   	onInputChange={this.onInputChange} 
						      	onButtonSubmit={this.onButtonSubmit} 
				        />
				            <FaceRecognition imageUrl={this.state.imageUrl}/>
		            	</div>
		            	:(
		            		this.state.route === 'signin'
			            	?<Signin onRouteChange={this.onRouteChange} />
					      	:<Register onRouteChange={this.onRouteChange} />
				      	)			    	
		            }
		    </div>
  		);	
	}
}
 
export default App;
