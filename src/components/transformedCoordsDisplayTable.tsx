import '../css/App.css';
import '../vendor/bootstrap/css/bootstrap.min.css'
import '../vendor/bootstrap-icons/bootstrap-icons.css'
import '../vendor/boxicons/css/boxicons.min.css'
import '../vendor/glightbox/css/glightbox.min.css'
import '../vendor/remixicon/remixicon.css'
import '../vendor/swiper/swiper-bundle.min.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';



interface OrbElement {
  key: string
  value: number
}


const createData = (orbElement: OrbElement) => {
  return { key: orbElement.key, value: orbElement.value };
}


const convertToCSV = (arr: Array<OrbElement>) => {
 
  // @ts-ignore:
  const array = [Object.keys(arr[0])].concat(arr)

  return array.map(it => {
    return Object.values(it).toString()
  }).join('\n')
}

const capitalizeFirstLetter = (inString: String) => { 
  return inString.charAt(0).toUpperCase() + inString.slice(1);
}

const TransformedCoordsDisplayTable = (props: any) => {

  const { transformedElements } = props

  const rows = transformedElements.orbElements.map((orbElement: OrbElement ) => createData(orbElement))

  console.log(rows)
  return (
    <>
    <div>{capitalizeFirstLetter(transformedElements.coordSystem)}</div>
    <TableContainer component={Paper} sx={{ marginTop: 2, maxWidth: 320 }}>
    <Table  size="small" aria-label="a dense table">
      <TableBody>

        {/* @ts-ignore: */}
        {rows.map((row) => (
          <TableRow
            key={row.key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.key}
            </TableCell>
            <TableCell align="right">{row.value.toFixed(8)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <Button onClick={() => {navigator.clipboard.writeText(convertToCSV(transformedElements.orbElements))}}>Copy To CSV</Button>
  </>


  )


}

export default TransformedCoordsDisplayTable