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
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';
import { csv } from "d3-fetch"


const SampleObjectPicker = (props: any) => {

    const { sampleObjects, setSampleObjects } = props
  
    const { register, control, setValue, formState } = useFormContext();
    const { errors } =  formState
  
    useEffect(() => {
        async function fetchSampleObj() {
          let data = await csv("data/sample_objects.csv");
          setSampleObjects(data)
        }
        fetchSampleObj();
      }, []);
    
    
      let sampleObjectsFormatted: { [key: string]: any } = {
        // "1": {
        //   "desInput": '!!OID FORMAT x y z xdot ydot zdot H t_0 INDEX N_Pasljs fjlwefwke AR MOID COMPCODE\nS0000001a  CAR 3.1814935923872047 -1.7818842866371896 0.5413047375097928 0.003965128676498027 0.006179760229698789 0.003739659079259056 10.315000000000 56534.00089159205 1 6 -1 MOPS'
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
          "vz":row.vz,
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
        setValue(key, sampleObj[key])
      })
    }
    }


    return (

        <Controller
            control={control}
            name="sampleObjectPicker"
            render={({ field: { onChange, value, ref } }) => (
                <Select
                    value={value}
                    label="a"
                    fullWidth
                    onChange={(value) => {
                        onChange(value)
                        sampleObjectOnChangeHandler(value.target.value)
                    }}
                >
                    <MenuItem value={"default"}>Pick a Sample Object</MenuItem>

                    {Object.keys(sampleObjectsFormatted).map((key, index) => {
                        return <MenuItem value={key}>{key}</MenuItem>
                    })}
                </Select>
            )}
        />
    )
}

export default SampleObjectPicker