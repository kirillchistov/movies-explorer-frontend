//  Компонент переключения фильтра короткометражек  //
import './ToggleSwitch.css';

const ToggleSwitch = ({ handleToggleSwitch, status, onColor, name }) => {
  return (
    <>
      <input
        className='search__toggleswitch'
        id={`toggleswitch`}
        type='checkbox'
        onChange={handleToggleSwitch}
        checked={status}
      />
      <label
        className='search__toggleswitch-label'
        style={{ background: status && onColor }}
        htmlFor={`toggleswitch`}
      >
        <span className={`search__toggleswitch-button`} />
        <p className='search__toggleswitch-caption'>{name}</p>
      </label>
    </>
  );
}

export default ToggleSwitch;
