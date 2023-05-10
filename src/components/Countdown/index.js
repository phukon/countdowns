import { useCountdown } from './useCountdown';
import TimezoneSelect from 'react-timezone-select'
import Select from 'react-select'

const DECIMAL_PLACES = 6;

export function Countdown() {
  const {
    days,
    date,
    desc,
    timezone,
    handleDateChange,
    handleDescChange,
    handleTimezoneChange,
    countdownStyle,
    toggleCountdownStyle,
  } = useCountdown();

  if (days === null) {
    return null;
  }

  const integerDays = Math.floor(days);
  const fractionalDays = (days % 1).toFixed(DECIMAL_PLACES);

  const traditionalCountdown = () => {
    const hours = Math.floor((days % 1) * 24);
    const minutes = Math.floor((((days % 1) * 24) % 1) * 60);
    const seconds = Math.round(((((days % 1) * 24) % 1) * 60) % 1 * 60);
    return (
      <>
        <span className="text-5xl md:text-6xl">{integerDays}d </span>
        <span className="text-2xl md:text-4xl -ml-6 md:-ml-8 text-neutral-200 text-opacity-75">{hours}h </span>
        <span className="text-2xl md:text-4xl text-neutral-200 text-opacity-75">{minutes}m </span>
        <span className="text-2xl md:text-4xl text-neutral-200 text-opacity-75">{seconds}s</span>
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-no-repeat bg-center bg-cover relative" style={{ backgroundImage: "url('/static/img/bg.png')" }}>
      <div className="w-2/3 md:w-1/6 p-4 absolute top-4 md:top-4 md:right-4 backdrop-filter backdrop-blur-lg">
        <label className="block text-white text-md mb-2 font-apple2mono">
          set a countdown
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono">
          date
          <input type="date" value={date} onChange={handleDateChange} className="mt-1 ml-4 md:ml-0 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          description
          <input type="text" value={desc} onChange={handleDescChange} className="mt-1 w-full p-2 rounded text-black font-apple2mono" />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          timezone
          <TimezoneSelect
            className="text-black"
            value={timezone}
            onChange={handleTimezoneChange}
          />
        </label>
        <label className="block text-neutral-200 text-opacity-75 text-sm font-apple2mono mt-2">
          style
          <Select
            placeholder="select a style"
            defaultValue={{ value: 'fractional', label: 'fractional' }} // added default value
            onChange={toggleCountdownStyle}
            className="mt-1 w-full rounded text-black font-apple2mono"
            options={[
              { value: "fractional", label: "fractional" }, // changed to double quotes
              { value: "traditional", label: "traditional" }, // changed to double quotes
            ]}
          />
        </label>
      </div>

      <div className="text-center">
        <div className="text-5xl md:text-8xl text-white font-bold font-apple2mono">
          {countdownStyle === 'fractional' ? integerDays : ''}
          {countdownStyle === 'fractional' ? (
            <span className="text-2xl md:text-4xl text-neutral-200 text-opacity-75 font-normal -ml-2 md:-ml-4">.{fractionalDays.slice(2)}</span>
          ) : (
            traditionalCountdown()
          )}
        </div>
        <p className="text-sm md:text-2xl text-neutral-400 text-opacity-75 font-apple2mono mb-8">
          {countdownStyle === 'fractional' ? 'days' : ''} till {desc || (new Date().getFullYear() + 1)}
        </p>
      </div>
      <a href="https://www.ishanshah.me" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 left-4 opacity-75 text-white py-1 px-2 mb-24 md:mb-0 rounded text-xs">built by ishan</a>
      <a href="https://buildspace.so/home" target="_blank" rel="noopener noreferrer" className="absolute bottom-4 right-4 opacity-75 text-white py-1 px-2 mb-24 md:mb-0 rounded text-xs">inspired by buildspace</a>
    </div>
  );
}
