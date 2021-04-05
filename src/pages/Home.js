import { useAxios } from '../assets/custom_hooks/useAxios';
import Doctors from '../components/Doctors';

const url = 'data.json';

const Home = () => {
  const { doctors } = useAxios(url);
  return (
    <div className="row">
      <Doctors doctors={doctors} />
    </div>
  )
}

export default Home;