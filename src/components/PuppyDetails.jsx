import { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PuppyDetails = ({details,setDetails}) => {
  let {id} = useParams();

  //Fetching specific player data
  useEffect(() => {
      const getPuppy = async() => {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players/${id}`);
        const jsonObj = await response.json();
        setDetails(jsonObj.data.player);
      }
      getPuppy();
    }, [id])

  return (
    <>
    {

      details.id?
      <div id='details'>
        <h1>{details.name}</h1>
        <h2>the {details.breed}</h2>
        <p>On the {details.status}</p>
        <img src={details.imageUrl}></img>
        {
          details.team?
          <Link to={`/team/${details.team.id}`}>{details.name}'s Team</Link>:
          <></>
        }
        <Link to={`/`}>Puppy List</Link>
      </div>
      :
      <p>LOADING...</p>
        
    }
      
    </>
    
  )
}

export default PuppyDetails