import CityTableView from '../list/CityTableView'; // Adjust the import path as necessary
import { Breadcrumb } from '../../../components/Breadcrumb'; // Ensure this path is correct

const CityList = () => {
  return (
    <div>
      <Breadcrumb />
      <CityTableView />
    </div>
  );
};

export default CityList;
