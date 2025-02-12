import { useState, useEffect } from "react";

const Ban = () => {
  const [player, setPlayer] = useState(null);
  const [puppies,setPuppies] = useState([])


  useEffect(() => {
    const getPuppies = async() => {
      const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players`);
      const jsonObj = await response.json();
      setPuppies(jsonObj.data.players);
    }
    getPuppies();
  }, [])

  const getPuppyId = (puppyName) => {
    return puppies.reduce((id, puppy) => {return puppy.name==puppyName?puppy.id:id},null);
  }

  const deletePlayer = async(event) => {
    event.preventDefault();
    if(!player){
      return;
    }
    console.log(`deleting ${player}`)
    try {
      const response = await fetch(
        `https://fsa-puppy-bowl.herokuapp.com/api/2501-FTB-ET-WEB-FT/players/${getPuppyId(player)}`,
        {
          method: 'DELETE',
        }
      );
      const result = await response.json();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {
        puppies?
        <div id="report">
          <h2>We take sportsman-like conduct very seriously, and any puppy that is found to be breaking rules will immediately be banned!</h2>
          <form onSubmit={deletePlayer}>
            <label>Select which puppy you are reporting: </label>
            <select onChange={(event)=>{setPlayer(event.target.value)}}>
              <option value='none'>None</option>
              {  
                puppies.map((pup) => {
                  return (
                    <option key={pup.id} value={pup.name}>{pup.name}</option>
                  )})
              }
            </select>
            <button>Submit</button>
          </form>
        </div>:
        <>
          <p>One moment please...</p>
        </>
      }
        
    </>
  )
}

export default Ban