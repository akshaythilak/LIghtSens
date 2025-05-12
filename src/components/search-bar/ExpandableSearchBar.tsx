import SearchIcon from '../../svg/search-normal.svg?react';
import './ExpandableSearchBar.css';

const ExpandableSearchBar = () => {
  const handleExpand = () => {
    const search = document.querySelector('.search-input');
    search?.classList.toggle('search-expanded');
  };
  return (
    <div className="absolute right-5">
      <input className="search-input" type="search" placeholder="Search keyword" />
      <button className="search-wrapper" onClick={handleExpand}>
        <SearchIcon width={25} height={25} />
      </button>
    </div>
  );
};

export default ExpandableSearchBar;
