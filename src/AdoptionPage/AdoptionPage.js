import React from 'react';
import config from '../config';
import './AdoptionPage.css'
export default class AdoptionPage extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      pets: {},
      OK: false,
      fullName: '',
      currentUser: '',
      confirmation: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  };
  fetchData = () => {
    fetch(`${config.API_ENDPOINT}/api/pets`)
      .then(res => res.json())
      .then(res => this.setState({ pets: res, OK: true }));
    fetch(`${config.API_ENDPOINT}/api/people`)
      .then(res => res.json())
      .then(res => this.setState({ people: res }));
  };

  deletePets = () => {
    try {
      if(this.state.pets.cats.length >= 1){
        fetch(`${config.API_ENDPOINT}/api/pets`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ type: 'cats' })
        }).then(() => this.fetchData());
      if(this.state.pets.dogs.length >= 1){
        fetch(`${config.API_ENDPOINT}/api/pets`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({ type: 'dogs' })
        }).then(() => this.fetchData());
      }
      }
    } catch (error) {
      console.log(error)
    }
  };

  petsPeopleAnimation = () => {
    let timerId = setInterval(() => {
        fetch(`${config.API_ENDPOINT}/api/people`, {
          method: 'DELETE',
          header: {
            'content-type': 'application/json',
          }
        }).then(() => this.fetchData());
        this.deletePets();
        if (this.state.people[1] === this.state.currentUser) {
          clearInterval(timerId);
          this.addRandomUsers();
        } else if(this.state.pets.cats.length === 1 || this.state.pets.dogs.length === 1){
          clearInterval(timerId);
          console.log('clear animation line 61')
        }
      }, 5000);
    }


  addRandomUsers = () => {
    const randomUsers = [
      'Ursula K. Le Guin', 'Charles Dickens', 'Michael Jordan', 'Beyoncé', 'Jay-Z', 'Fred', 'Moses', 'Leo Tolstoy', 'Rebel Wilson', 'Susan B. Anthony', 'Fraser', 'Charlie Chaplin', 'Hugo Weaving', 'Charlie Brown', 'Magnesium Sulfate', 'Steve Jobs', 'Willy Wonka', 'Tarzan', 'Karl Marx', 'Margot Robbie'
    ];
      let timerId = setInterval(() => {
        fetch(`${config.API_ENDPOINT}/api/people`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            person: randomUsers[Math.floor((Math.random() * 20))]
          })
        }).then(() => this.fetchData());
        if (this.state.people.length > 4) {
          clearInterval(timerId);
        }
      }, 5000);
  };

  onSubmit = (event) => {
    event.preventDefault();
    let person = this.state.fullName;
    this.setState({ currentUser: person });
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ person })
    }).then(() => this.fetchData());
    this.petsPeopleAnimation();
  };

  handleAdoptCat = () => {
    fetch(`${config.API_ENDPOINT}/api/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ type: 'cats' })
    }).then(() => this.fetchData());
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'DELETE',
      header: {
        'content-type': 'application/json',
      }
    }).then(() => this.fetchData());
    this.setState({
      confirmation: true,
    });
  };

  handleAdoptDog = () => {
    fetch(`${config.API_ENDPOINT}/api/pets`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ type: 'dogs' })
    }).then(() => this.fetchData());
    fetch(`${config.API_ENDPOINT}/api/people`, {
      method: 'DELETE',
      header: {
        'content-type': 'application/json',
      }
    }).then(() => this.fetchData());
    this.setState({
      confirmation: true,
    });
  };

  render() {
    let catPet = this.state.OK ? this.state.pets.cats[0] : '';
    let dogPet = this.state.OK ? this.state.pets.dogs[0] : '';
    let people = this.state.OK ? this.state.people.map((person, i) => <li key={i++}>{person}</li>) : '';
    const { currentUser } = this.state;
    if(this.state.OK === true){
      return (
        <div className='adoption-page'>
          <h1>Next Pets Up for Adoption</h1>
          {this.state.confirmation && <h1>Congratulations on adopting your new pet!</h1>}
          <div className='pets'>
            <div className='cat'>
              {catPet
              ? 
              <><h1>Cats</h1>
              <img alt='pet-img' src={catPet.imageURL} />
              <h2>{catPet.name}</h2>
              <p>{catPet.description}</p>
              <p>{catPet.story}</p>
              <h4>Gender: {catPet.gender}</h4>
              <h4>Age: {catPet.age}</h4>
              <h4>Breed: {catPet.breed}</h4>
              {(this.state.people[0] === currentUser) && <button onClick={() => this.handleAdoptCat()}>Adopt Me!</button>}</>
              : <h1>No cats to adopt</h1>}
              
            </div>
            <div className='dog'>
              {dogPet? 
              <><h1>Dogs</h1>
              <img alt='pet-img' src={dogPet.imageURL} />
              <h2>{dogPet.name}</h2>
              <p>{dogPet.description}</p>
              <p>{dogPet.story}</p>
              <h4>Gender: {dogPet.gender}</h4>
              <h4>Age: {dogPet.age}</h4>
              <h4>Breed: {dogPet.breed}</h4>
              {(this.state.people[0] === currentUser) && <button onClick={() => this.handleAdoptDog()}>Adopt Me!</button>}</> 
              : <h1>No dogs to adopt</h1>}
              
            </div>
          </div>
          <div className='adopters-list'>
            <h1>Adoption Queue</h1>
            <ol>{people}</ol>
          </div>
          <form onSubmit={this.onSubmit}>
            <h1>Join Adoption Queue</h1>
            <label htmlFor='full-name'>Enter Full Name</label>
            <input onChange={(event) => this.setState({ fullName: event.currentTarget.value })} type='text' id='full-name' />
            <button>Join</button>
          </form>
        </div>
      );
    } else{
      return <div>Loading...</div>
    }
  }
}

