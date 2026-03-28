import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";

export const GenericSelect = <TChoice extends number | string | undefined>(
  { choices, title, defaultChoice, callback = (() => { }), value, styling }:
    {
      choices: TChoice[],
      title: string,
      callback: Dispatch<SetStateAction<TChoice>>,
      defaultChoice: TChoice,
      value?: TChoice,
      styling?: string
    }) => {
  const [selected, setSelected] = useState(value ? value : defaultChoice);
  const onClick = (event: ChangeEvent<HTMLSelectElement>) => {
    callback(event.target.value === 'default'
      ? undefined as TChoice
      : event.target.value as TChoice);
    setSelected(event.target.value as TChoice);
  }
  // useEffect(() => console.log('select', selected), [selected]);

  return (
    <div className=" pl-3 pb-2 absolute top-14 z-50">
      <div className="backdrop-blur-xl avatar  p-4  rounded col-span-4 " >
        <p className="text-lg text-asl-color-text-100">{title}</p>
        <select
          name="dataLayerPicker"
          className={`select select-bordered rounded-sm select-sm text-asl-color-text-100 h-10 
                      focus:border-deep-sky-500 focus:outline-none focus:ring-0   
                      hover:bg-deep-sky-500 focus:bg-dark-grey-200 hover:text-hadopelagic 
                      focus:text-asl-color-text-100 w-16 sm:w-16 md:w-32 lg:w-48 xl:w-64 2xl:w-80 ${styling} `}
          onChange={onClick}
          value={selected}
          data-testid="year-picker"
        >
          {defaultChoice && <option key={'default'} value={'default'}>{defaultChoice}</option>}
          {choices && choices.map(d => (<option key={d} className=" p-1" data-testid='select-option'>{d}</option>))}
        </select>
      </div>
    </div>
  )
}


