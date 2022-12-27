//  Компонент переключения  //
import './ToggleSwitch.css';

const ToggleSwitch = ({ status, onColor, handleToggleClick, name }) => {
  return (
    <>
      <input
        checked={status}
        onChange={handleToggleClick}
        className='search__toggleswitch'
        id={`toggleswitch`}
        type='checkbox'
      />
      <label
        style={{ background: status && onColor }}
        className='search__toggleswitch-label'
        htmlFor={`toggleswitch`}
      >
        <span className={`search__toggleswitch-button`} />
        <p className='search__toggleswitch-caption'>{name}</p>
      </label>
    </>
  );
}

export default ToggleSwitch;
