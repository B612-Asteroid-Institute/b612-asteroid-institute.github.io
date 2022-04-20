import React, { useState, useEffect } from 'react';
import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { csv } from "d3-fetch"


const SampleObjectPicker = (props: any) => {

  const { sampleObjects, setSampleObjects } = props

  const { register, control, setValue, formState, trigger } = useFormContext();
  const { errors } = formState

  useEffect(() => {
    async function fetchSampleObj() {
      let data = await csv("data/sample_objects.csv");
      setSampleObjects(data)
    }
    fetchSampleObj();
  }, []);


  let sampleObjectsFormatted: { [key: string]: any } = {
    // "Pick a Sample Object": {
    //   "x": 0.0,
    //   "y": 0.0,
    //   "z": 0.0,
    //   "vx": 0.0,
    //   "vy": 0.0,
    //   "vz": 0.0,
    //   'mjd_tdb': 0.0,
    //   "q": 0.0,
    //   "e": 0.0,
    //   "i": 0.0,
    //   "an": 0.0,
    //   "ap": 0.0,
    //   "tp": 0.0,
    //   "mjd_tdbCom": 0.0,
    //   "a": 0.0,
    //   "eKep": 0.0,
    //   "iKep": 0.0,
    //   "anKep": 0.0,
    //   "apKep": 0.0,
    //   "ma": 0.0,
    //   "mjd_tdbKep": 0.0,
    // }
  }
  Object.keys(sampleObjects).filter(item => item !== "columns").map((key: any, index) => {
    // console.log(sampleObjects[key])
    const row = sampleObjects[key]
    // console.log(row)
    sampleObjectsFormatted[row.obj_id] = {
      "x": row.x,
      "y": row.y,
      "z": row.z,
      "vx": row.vx,
      "vy": row.vy,
      "vz": row.vz,
      'mjd_tdb': row.mjd_tdb,
      "q": row.q,
      "e": row.e,
      "i": row.i,
      "an": row.raan,
      "ap": row.ap,
      "tp": row.tp,
      "mjd_tdbCom": row.mjd_tdb,
      "a": row.a,
      "eKep": row.e,
      "iKep": row.i,
      "anKep": row.raan,
      "apKep": row.ap,
      "ma": row.M,
      "mjd_tdbKep": row.mjd_tdb,
    }
  })
  //
  const sampleObjectOnChangeHandler = (value: string) => {
    if (value !== 'default') {
      const sampleObj = sampleObjectsFormatted[value]
      Object.keys(sampleObj).map((key, index) => {
        // @ts-ignore
        setValue(key, sampleObj[key], { shouldTouch: true })
      })
      // We want to reset all existing validation
      trigger()
    }
  }


  return (

    <Controller
      control={control}
      name="sampleObjectPicker"
      render={({ field: { onChange, value, ref } }) => (
        <FormControl fullWidth>
          <InputLabel id="selectLabel">Pick a Sample Object</InputLabel>
          <Select
            labelId="selectLabel"
            value={value}
            label={"Pick a Sample Object"}
            id="select"
            fullWidth
            onChange={(value) => {
              onChange(value)
              sampleObjectOnChangeHandler(value.target.value)
            }}
          >
            <MenuItem value={"default"}>None</MenuItem>
            {Object.keys(sampleObjectsFormatted).map((key, index) => {
              return <MenuItem value={key}>{key}</MenuItem>
            })}
          </Select>
        </FormControl>
      )}
    />
  )
}

export default SampleObjectPicker