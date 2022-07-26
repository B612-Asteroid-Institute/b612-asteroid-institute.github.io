import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
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

const jdToMjd = (jd: number) => {
  return jd - 2400000.5
}

const SBDBSearchForm = (props: any) => {

  const [searchResult, setSearchResult] = useState<HorizonsSearchResult>();
  const { control, getValues, formState, trigger, getFieldState, setValue } = useFormContext();
  const { errors } = formState

  const setFormFromSearchResult = () => {
    setValue("coordinateSystem", 'cometary', { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("sampleObjectPicker", 'default', { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("q", searchResult?.q, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("e", searchResult?.e, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("i", searchResult?.i, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("an", searchResult?.an, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("ap", searchResult?.ap, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("tp", searchResult?.tp, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
    setValue("mjd_tdbCom", searchResult?.mjd_tdb, { shouldTouch: true, shouldValidate: true, shouldDirty: true })
  }

  // Set the form state once searchResult is updated
  useEffect(() => {
    setFormFromSearchResult()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchResult]);

  const onSearch = async () => {
    setSearchResult(undefined)
    const searchStr = getValues("mbdbSearchInput")
    const querystr = `https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${searchStr}&full-prec=true&soln-epoch=true`
    const req: any = await axios.get(querystr)

    console.log(req)
    if (req.status === 200 && "object" in req.data) {
      const getElementsValueByName = (k: string) => {
        return req.data.orbit.elements.find((obj: any) => obj.name === k).value
      }
      const foundObj: HorizonsSearchResult = {
        fullName: req.data.object.fullname,
        orbitClassName: req.data.object.orbit_class.name,
        q: getElementsValueByName("q"),
        e: getElementsValueByName("e"),
        i: getElementsValueByName("i"),
        an: getElementsValueByName("om"),
        ap: getElementsValueByName("w"),
        tp: jdToMjd(parseFloat(getElementsValueByName("tp"))),
        mjd_tdb: jdToMjd(parseFloat(req.data.orbit.epoch )),
      }
      setSearchResult(foundObj)
    }
    if (req.status === 200 && "message" in req.data) {
      setSearchResult({ message: req.data.message })
    }
    trigger()
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