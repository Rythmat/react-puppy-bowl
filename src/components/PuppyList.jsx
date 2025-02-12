import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PuppyList = ({puppies, setPuppies}) => {
  const [query, setQuery] = useState('');



//Use effect to fetch all the player data
  useEffect(() =>{
    const getPuppies = async() => {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players');
      const jsonObj = await response.json();
      setPuppies(jsonObj.data.players);
    }
    getPuppies();
  }, [])

  return (
    <>
      {
        puppies[0]?
        <div id="roster">
          <h1>Our Roster</h1>
          <label>Filter Puppies: <input type="text" onChange={(event)=>setQuery(event.target.value)} placeholder="Search..."></input></label>
          <ul id='puppies'>
          {
            puppies.filter((pup)=>{return pup.name.toLowerCase().indexOf(query)>-1;}).map((pup) => {
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
        <p>Loading...</p>

      }
    </>
  )

}

export default PuppyList 