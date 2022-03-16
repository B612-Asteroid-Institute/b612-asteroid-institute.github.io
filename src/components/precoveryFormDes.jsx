// import { render } from '../@testing-library/react';
import { useFormik } from 'formik';
// import { Formik, Field, Form } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Grid from '@mui/material/Grid';


const axios = require('axios').default;

const validationSchema = yup.object({
});

const PrecoveryFormDes = () => {

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const onFormSubmit = async (values) => {
    debugger
    await sleep(3000);
    console.log("DONE")
    // alert(JSON.stringify(values, null, 2));
  }
  const formik = useFormik({
    initialValues: {
      desInput: 'S0000001a  COM 1.251458729448 0.382243999742 9.304721017758 252.063850160767 185.610748171983 54067.969963746829 10.315000000000 54466.000000000000 1 6 -1 MOPS',
    },
    validationSchema: validationSchema,
    onSubmit: onFormSubmit
  });
  return (
    <>
      {/* {
        postResult ?
          <div>"Loading" </div> :
          <div>Complete </div>
      } */}
      <div>
        <form onSubmit={formik.handleSubmit}>
          <br></br>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="desInput"
                name="desInput"
                label="DesInput"
                multiline
                rows={4}
                value={formik.values.desInput}
                onChange={formik.handleChange}
                error={formik.touched.desInput && Boolean(formik.errors.desInput)}
                helperText={formik.touched.desInput && formik.errors.desInput}
              />
            </Grid>

          </Grid>
          <br></br>
          <Button color="primary" variant="contained" fullWidth onClick={formik.handleSubmit}>
            Submit
          </Button>
        </form>
      </div>
    </>
  )
}

export default PrecoveryFormDes