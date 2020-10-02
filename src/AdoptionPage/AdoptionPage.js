import React from 'react';
import config from '../config';
export default class AdoptionPage extends React.Component {
  constructor(){
    super();
    this.state = {
      people : [],
      pets: {},
      OK: false,
      fullName: '',
      currentUser:''
    }
  }
  componentDidMount(){
    this.fetchData();

  };
  
  fetchData = () => {
    fetch(`${config.API_ENDPOINT}/api/pets`)
    .then(res => res.json())
    .then(res => this.setState({pets: res, OK: true}));
    fetch(`${config.API_ENDPOINT}/api/people`)
    .then(res => res.json())
    .then(res => this.setState({people: res}));
  }
  adopted = () => {
    fetch(`${config.API_ENDPOINT}/api/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({type: 'cats'})
    }).then(() => this.fetchData());
    fetch(`${config.API_ENDPOINT}/api/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({type: 'dogs'})
    }).then(() => this.fetchData());
  }
  
  petsPeopleAnimation = () => {
      setInterval(() => {
        fetch(`${config.API_ENDPOINT}/api/people`, {
          method: 'DELETE',
          header: {
            'content-type': 'application/json',
          }
        }).then(() => this.fetchData());
        this.adopted();
      }, 5000)
  }
  
  onSubmit = (event) => {
    event.preventDefault();
    let person = this.state.fullName;
    this.setState({currentUser: person})
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({person})
    }).then(() => this.fetchData());
    this.petsPeopleAnimation();
    
  }
  render(){
    let catPet = this.state.OK ? this.state.pets.cats[0] : '';
    let dogPet = this.state.OK ? this.state.pets.dogs[0] : '';
    let people = this.state.OK ?  this.state.people.map((person) => <li>{person}</li>): '';
    return(
      <h1>
        <h1>Next pets in line</h1>
        <div className='pets'>
            <div className='cat'>
              <img alt ='pet-img'src={catPet.imageURL}/>
              <h2>{catPet.name}</h2>
              <p>{catPet.description}</p>
              <p>{catPet.story}</p>
              <h4>Gender: {catPet.gender}</h4>
              <h4>Age: {catPet.age}</h4>
              <h4>Breed: {catPet.breed}</h4>
            </div>
            <div className='dog'>
               <img alt ='pet-img'src={dogPet.imageURL}/>
              <h2>{dogPet.name}</h2>
              <p>{dogPet.description}</p>
              <p>{dogPet.story}</p>
              <h4>Gender: {dogPet.gender}</h4>
              <h4>Age: {dogPet.age}</h4>
              <h4>Breed: {dogPet.breed}</h4>
          </div>
        <div>
          <h1>Queue of adopters</h1>
          <ol>{people}</ol>
         </div>
        <form onSubmit={this.onSubmit}>
          <h1>Adoption Form</h1>
          <label htmlFor='full-name'>Enter Full Name</label>
          <input onChange={(event) => this.setState({fullName: event.currentTarget.value})} type='text' id='full-name'/>
          <button>Join Queue</button>
        </form>
        </div>
      </h1>
    )
  }
}
