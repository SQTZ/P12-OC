import meditation from '../assets/meditation.svg';
import natation from '../assets/natation.svg';
import velo from '../assets/velo.svg';
import muscu from '../assets/muscu.svg';

const Sidebar = () => {
  return (
    <div className="sidebar">
      
      <div className="nav-icons">
        <button className="icon-button">
          <img src={meditation} alt="Running" />
        </button>
        <button className="icon-button">
          <img src={natation} alt="Swimming" />
        </button>
        <button className="icon-button">
          <img src={velo} alt="Cycling" />
        </button>
        <button className="icon-button">
          <img src={muscu} alt="Muscle" />
        </button>
      </div>
      
      <div className="copyright">
        <p>Copyright, SportSee 2023</p>
      </div>
    </div>
  );
};

export default Sidebar;
