import BookFilter from './components/bookFilter';
import BookCards from './components/bookCards';

const HomePage = () => {
  return (
    <div className='columns'>
      <BookFilter />
      <BookCards />
    </div>
  );
};

export default HomePage;
