import { useNavigate } from "react-router-dom"

const Teams = () => {
  const navigate = useNavigate();
  return (
    <div id="teams">
      <div id="ruff" onClick={()=>{navigate('/team/3678')}}>
        <h1>Ruff</h1>
      </div>
      <div id="fluff" onClick={()=>{navigate('/team/3679')}}><h1>Fluff</h1></div>
    </div>
  )
}

export default Teams