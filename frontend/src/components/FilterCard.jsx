import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Chennai", "Mumbai"],
  },
  {
    fitlerType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Data Scientist",
      "Data Analyst",
      "Software Devloper",
      "Graphics Designer",
      "UI/UX Designer"
    ],
  },
  {
    fitlerType: "Salary",
    array: [
      "0-40k",
      "42k-1lakh",
      "1lakh to 5lakh",
      "6lakh-10lakh",
      "10lakh-20lakh",
    ],
  },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className='w-full p-4 rounded-md bg-white text-black border border-gray-200 shadow-md dark:bg-muted dark:text-white dark:border-gray-600'>
            <h1 className='font-bold text-lg mb-2'>Filter Jobs</h1>
            <hr className='mb-4 border-gray-300 dark:border-gray-600' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index} className="mb-4">
                            <h2 className='font-semibold text-gray-800 dark:text-gray-200 mb-2'>{data.fitlerType}</h2>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div key={itemId} className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId} className='text-gray-700 dark:text-gray-300'>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    )
}

export default FilterCard
