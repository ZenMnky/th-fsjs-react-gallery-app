import React, { Component } from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import Files
import './css/index.css';
import apiKey from './config.js';

// Import Components
import SearchForm from './Components/SearchForm';
import Nav from './Components/Nav';
import PhotoContainer from './Components/photos/PhotoContainer';
import NotFound from './Components/NotFound';


export default class App extends Component {

    constructor(){
        super();
        this.state = {
            loading: true,
            searchTerm: '', 
            photos: [], // for searched images
            monkey: [], // default images to show upon mounting
            mountains: [], // default images to show upon mounting
            overlanding: [] // default images to show upon mounting
            
        };
    }
    
    // Retreive and store pre-made, default search routes
    componentDidMount() {
        this.performSearch('monkey');
        this.performSearch('mountains');
        this.performSearch('overlanding');
    }


    performSearch = (query) => {
        // this.setState({loading: true});

        axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1&per_page=24`)
            .then(response => {
                // If query is one of the defaults, then display the relative stored-data from state
                // If not, store the new photo data in the photos key and update the value of state's 'searchTerm' key
                if (query === 'monkey' || query === 'mountains' || query === 'overlanding'){
                    this.setState({
                        [query]: response.data.photos.photo,
                        loading: false
                    })
                } else {
                    this.setState({
                        photos: response.data.photos.photo,
                        searchTerm: [query],
                        loading: false
                    })
                }   
            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
            });
    }

    /**
     * Prop passing method to rendered components based off of the following article:
     * https://stackoverflow.com/questions/43351752/react-router-changes-url-but-not-view
     */
    render() {
            
        return (
        <div className='container'>
            <Router>
                <div>
                    <SearchForm onSearch={this.performSearch} />
                    <Nav />
                </div>
                
                    <Switch>
                        {/* Home Route */}
                        <Route exact path='/' render={ (props) => 
                            <h2>Search for photos</h2> }
                        />

                        {/* Premade Search Routes */}
                        <Route path='/mountains' render={ (props) => {
                            return (
                                <PhotoContainer 
                                    {...props}  
                                    searchTerm='mountains' 
                                    data={this.state.mountains} 
                                    loading={this.state.loading}
                                />)
                            } } 
                        />
                        <Route path='/overlanding' render={ (props) => {
                            return (
                                <PhotoContainer 
                                    {...props}
                                    searchTerm='overlanding' 
                                    data={this.state.overlanding} 
                                    loading={this.state.loading}
                                />)
                            } } 
                        />
                        <Route path='/monkey' render={ (props) => {
                            return (
                                <PhotoContainer 
                                    {...props}
                                    data={this.state.monkey} 
                                    searchTerm='monkey' 
                                    loading={this.state.loading}
                                />)
                            } } 
                        />

                        {/* Dynamic Search Route */}
                        <Route path={'/search/:searchTerm'} render={ ({match}) => {
                                this.performSearch(match.params.searchTerm)

                                return( 
                                    <PhotoContainer 
                                        
                                        data={this.state.photos}
                                        searchTerm={this.state.searchTerm}
                                        loading={this.state.loading}
                                    />)
                            }} />
                            
                        {/* Error/Not-Found Route(s) */}
                        <Route component={NotFound} />
                    </Switch>                          
            </Router>
        </div>
            
        );
    }
}