import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PuppyTeam = () => {
  let {id} = useParams();
  const [puppies, setPuppies] = useState([]);
  const [name, setName] = useState('');

  useEffect(() =>{
    const getTeams = async() => {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/teams');
      const jsonObj = await response.json();
      jsonObj.data.teams.forEach((team) => {
        if(team.id==id){
          setName(team.name)
          setPuppies(team.players)
        }
      })
    }
    getTeams();
  }, [])

  return (
    <>
    {
      puppies[0]?
      <div>
        <h1>{name}</h1>
        <ul>
        {
        puppies.map((pup) => {
                return (
                <div key={pup.id}>
                  <li>
                    <h2>{pup.name} the {pup.breed}</h2>
                  </li>
                  <Link to={`/details/${pup.id}`}>See Details</Link>
                  </div>
          )})
        }
        </ul>
      </div>
      :
      <p>No puppies here!</p>
    }
    
    
    </>
  )
}

export default PuppyTeam