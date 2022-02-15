import { useState } from 'react';
import Dashboard from './Dashboard';
import Posts from './Posts';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import sidebarItems from '../constants/sidebarItems';
import './MasterPage.scss';

const MasterPage = () => {
  const name = 'John Doe';

  const [selectedSidebarIndex, setSelectedSidebarIndex] = useState(0);

  const onSidebarChange = (index) => {
    setSelectedSidebarIndex(index);
  };

  return (
    <div className="master-page">
      <Sidebar
        items={sidebarItems.map((e) => e.label)}
        onChange={onSidebarChange}
        selectedIndex={selectedSidebarIndex}
      />
      <div className="main-content-wrapper">
        <Header
          title={sidebarItems[selectedSidebarIndex].label}
          name={name}
        />
        <div className="main-content">
          {selectedSidebarIndex === 0 && <Dashboard />}
          {selectedSidebarIndex === 1 && <Posts />}
        </div>
      </div>
    </div>
  );
};

MasterPage.propTypes = {
};

MasterPage.defaultProps = {
};

export default MasterPage;
