import { Link, useNavigate} from "react-router-dom";
import { useState} from 'react';


const NavBar = ({puppies,setDetails}) => {
  const [search,setSearch] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    let id = puppies.reduce((pupId,pup)=>{return pup.name.toLowerCase()==search.toLowerCase()?pup.id:pupId},null);
    if(id){
      setDetails({});
      navigate(`/details/${id}`);
      setError(null);
    }else{
      setError('This puppy is not on the roster!')
    }
  }

  return (
    <>
      <div id="navbar">
          <Link to='/'>Home</Link>
          <Link to='/team'>Teams</Link>
          <Link to='/register'>Register</Link>
          <Link to='/report'>Report</Link>
          <div id="searchbar">
            <label>Pull up a player: <input type='text' placeholder="Puppy's Name" onChange={(event)=>{setSearch(event.target.value)}}></input><button onClick={handleSearch}>Find Player</button></label>
            {
              error?
              <p id="error">{error}</p>:
              <></>
            }
          </div>
          
      </div>
    </>
  )

}

export default NavBar;