import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import { AnyMessageParams } from 'yup/lib/types';
import axios from 'axios';

interface HorizonsSearchResult {
  fullName?: String
  orbitClassName?: String
  q?: number
  a?: number
  e?: number
  i?: number
  an?: number
  ap?: number
  tp?: number
  ma?: number
  mjd_tdb?: number
  message?: String
}


const SBDBSearchForm = (props: any) => {

  const { ControlledText, sampleObjects, setSampleObjects } = props

  const [searchResult, setSearchResult] = useState<HorizonsSearchResult>();
  const { control, getValues, formState, trigger, getFieldState, setValue } = useFormContext();
  const { errors } = formState


  const setFormFromSearchResult = () => {
    trigger()

    //TODO set an alternate on orbit.source
    //basically the returned orbital elements change depending on the type (main belt, comet, etc)
    setValue("coordinateSystem", 'cometary', { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("q", searchResult?.q, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("e", searchResult?.e, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("i", searchResult?.i, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("an", searchResult?.an, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("ap", searchResult?.ap, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("tp", searchResult?.tp, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("mjd_tdbCom", searchResult?.mjd_tdb, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    trigger()
  }

  const onSearch = async () => {
    setSearchResult(undefined)
    const searchStr = getValues("mbdbSearchInput")
    const querystr = `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${searchStr}&full-prec=true&soln-epoch=true`
    const req: any = await axios.get(querystr)

    console.log(req)
    if (req.status === 200 && "object" in req.data) {
      const foundObj: HorizonsSearchResult = {
        fullName: req.data.object.fullname,
        orbitClassName: req.data.object.orbit_class.name,
        q: req.data.orbit.elements[1].value,
        e: req.data.orbit.elements[0].value,
        i: req.data.orbit.elements[5].value,
        an: req.data.orbit.elements[3].value,
        ap: req.data.orbit.elements[4].value,
        tp: req.data.orbit.elements[2].value.slice(2),
        mjd_tdb: req.data.orbit.epoch.slice(2),
      }
      //alternate orbital element returns
      // if (req.status === 200 && "object" in req.data) {
      //   const foundObj: HorizonsSearchResult = {
      //     fullName: req.data.object.fullname,
      //     orbitClassName: req.data.object.orbit_class.name,
      //     a: req.data.orbit.elements[1].value,
      //     e: req.data.orbit.elements[0].value,
      //     i: req.data.orbit.elements[3].value,
      //     an: req.data.orbit.elements[4].value,
      //     ap: req.data.orbit.elements[5].value,
      //     ma: req.data.orbit.elements[6].value,
      //     mjd_tdb: req.data.orbit.epoch.slice(2),
      //   }
      setSearchResult(foundObj)
      setFormFromSearchResult()
    }
    if (req.status === 200 && "message" in req.data) {
      setSearchResult({ message: req.data.message })
    }

  }

  const searchDisabled = () => {
    return (getFieldState("mdbdSearchInput").isTouched && getValues("mdbdSearchInput").length > 0)
  }

  return (
    <>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Controller
            control={control}
            name={"mbdbSearchInput"}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <TextField
                error={errors.mbdbSearchInput ? true : false}
                helperText={errors.mbdbSearchInput ? errors.mbdbSearchInput.message : ''}
                fullWidth
                label={"Search"}
                type={"search"}
                value={value}
                onChange={onChange}
                onBlur={() => {
                  onBlur()
                  // setValue("end_mjd", (parseFloat(getValues("start_mjd")) + 90).toString()) 
                }}
              />
            )}
          />
        </Grid>
        {/* Re-enable me for password input */}
        <Grid item xs={2}>
          <Button sx={{ marginTop: 1 }}
            color="primary" variant="contained"
            fullWidth
            disabled={searchDisabled()}
            onClick={onSearch}>
            Search
          </Button>
        </Grid>

      </Grid>

      {searchResult &&
        <>
          <Grid container spacing={2}>
            {"fullName" in searchResult &&
              <>
                <Grid item xs={5}>
                  {`Horizons returned object: ${searchResult.fullName}`}
                </Grid>
                <Grid item xs={3}>

                  {`Orbital type: ${searchResult.orbitClassName}`}
                </Grid>
              </>
            }


            {"message" in searchResult &&
            <Grid item xs={5}>
            
            <Alert sx={{ marginTop: 3 }} severity="error">
                <AlertTitle>Error</AlertTitle>
                {//@ts-ignore
                searchResult.message.charAt(0).toUpperCase() + searchResult.message.slice(1)}
              </Alert>
          </Grid>
            }

          </Grid>
        </>
      }

      <br></br>
      <br></br>
    </>

  )

}


export default SBDBSearchForm