import { useAxios } from '../assets/custom_hooks/useAxios';
import Doctors from '../components/Doctors';

const url = 'https://my-json-server.typicode.com/shams-shimul/sqh-doctor-list/doctors';

// for testing with local data, comment off 1st url and activate 2nd url
// const url = 'data.json';

const Home = () => {
  const { doctors } = useAxios(url);
  return (
    <div className="row">
      <Doctors doctors={doctors} />
    </div>
  )
}

export default Home;