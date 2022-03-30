// import { render } from '../@testing-library/react';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';
import { useForm, FormProvider, Controller, useFormContext } from 'react-hook-form';

const PrecoveryFormDes = () => {

  const { register, control, setValue } = useFormContext();


  const uploadFile = (event: any) => {
    let file = event.target.files[0];
    console.log(file);
    const reader = new FileReader()

    reader.onload = function () {
      setValue('desInput', reader.result)
    }
    if (file) {
      reader.readAsText(file)
      console.log(reader.result)
      // axios.post('/files', data)...
    }
  }


  return (
    <>
      <div>
        <br></br>
        <Grid container spacing={2}>
          <Grid item xs={12}>

            <Controller
              control={control}
              name="desInput"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <TextField
                  fullWidth
                  label="DesInput"
                  multiline
                  rows={4}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />

              )}

            />
            <br></br>

            <br></br>
            <Button
              variant="contained" fullWidth
              component="label"
            >
              Upload File
              <input
                {...register("desFile")}
                onChange={uploadFile}
                type="file"
                hidden
              />
            </Button>
          </Grid>

        </Grid>
        <br></br>
      </div>
    </>
  )
}

export default PrecoveryFormDes