import { CustomTabDataType } from '../../types/type';
import ActionButtons from '../buttoncontrols/ActionButtons';
import SearchResetButtons from '../buttoncontrols/SearchResetButtons';
import CommonTable from '../common-table/commonTable';
import { CustomSelect } from '../form-controls/CustomSelect';
import ExpandableSearchBar from '../search-bar/ExpandableSearchBar';
import { CustomTabPanel } from '../tabs/customTabPanel';

export const CustomTabData = ({
  value,
  index,
  MenuList,
  Lectronic,
  handleChange,
  searchResetButtons,
  resultsTabButtons,
  userData,
  userColumns,
  enableActionBtn = true,
  enableOutlieBtn = true,
}: CustomTabDataType) => {
  return (
    <CustomTabPanel value={value} padding={0} index={index}>
      <div className="flex flex-row bg-white px-2 pt-2 mb-1.5 relative">
        <CustomSelect
          MenuList={MenuList}
          value={Lectronic}
          handleSelect={handleChange}
          inputLabel="Lectronic"
          width={160}
          height={37}
        />
        {enableOutlieBtn && <SearchResetButtons buttons={searchResetButtons} />}
        <ExpandableSearchBar />
      </div>
      <div className="bg-white h-full p-2.5">
        {enableActionBtn && <ActionButtons buttons={resultsTabButtons} />}
        <CommonTable
          rowKey="id"
          showCheckbox={true}
          data={userData}
          columns={userColumns}
          onSelectionChange={(selectedRows) => console.log('Selected:', selectedRows)}
          onSortChange={(sortData) => console.log('Sorted by:', sortData)}
        />
      </div>
    </CustomTabPanel>
  );
};
