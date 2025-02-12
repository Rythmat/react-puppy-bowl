import { useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";

const Registration = ({puppies}) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [image, setImage] = useState('');
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getTeams = async() => {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/teams');
      const jsonObj = await response.json();
      setTeams(jsonObj.data.teams);
    }

    getTeams();
  }, [])
  


  const assignTeam = () => {
    return teams[0].players.length>teams[1].players.length?teams[1].id:teams[0].id;
  }



  const handleSubmit = async(event) => {
    event.preventDefault();
    const onTeam = assignTeam();

    try {
      const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players',
       {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ name: name, breed: breed, imageUrl: image,teamId: onTeam })
        }
      )
      const jsonObj = await response.json();
      if(jsonObj.success){
        const playerId = jsonObj.data.newPlayer.id;
        navigate(`/details/${playerId}`)

      }else{
        throw new Error('Invalid Inputs!')
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
 
    <div id="register">
      <form onSubmit={handleSubmit}>
      <h2>Sign Up Your Pup!</h2>
      <label>
          Puppy's Name:  <input type="text" placeholder="Name..." onChange={(event)=>{setName(event.target.value)}}/>
        </label>
        <label>
          Puppy's Breed:  <input type="text" placeholder="Breed..." onChange={(event)=>{setBreed(event.target.value)}}/>
        </label>
        <label>
          Link to an Image of Your Puppy:  <input type="url"  placeholder='Link here...'onChange={(event)=>{setImage(event.target.value)}}/>
        </label>
        <button>Submit</button>
        {
            error?
            <p id='error'>{error}</p>:
            <></>
        }
      </form>
    </div>
    
    </>
  )

}

export default Registration