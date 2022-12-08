//  Компонент переключения  //
import './ToggleSwitch.css';

const ToggleSwitch = ({ status, onColor, handleToggleClick, name }) => {
  return (
    <>
      <input
        checked={status}
        onChange={handleToggleClick}
        className='toggleswitch'
        id={`toggleswitch`}
        type='checkbox'
      />
      <label
        style={{ background: status && onColor }}
        className='toggleswitch__label'
        htmlFor={`toggleswitch`}
      >
        <span className={`toggleswitch__button`} />
        <p className="toggleswitch__caption">{name}</p>
      </label>
    </>
  );
}

export default ToggleSwitch;
