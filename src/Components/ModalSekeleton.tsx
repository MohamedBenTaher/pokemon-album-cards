import { Skeleton,Grid } from '@mui/material'
const ModalSkeleton = () => {
  return (
    <div data-testid="modal-skeleton">
         <Grid container spacing={2} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={6}>
         <Skeleton variant="rectangular" width={'100%'} height={310} />
         </Grid>
         <Grid item container flexDirection={'column'}>
         <Grid item xs={6}>
         <Skeleton variant="rectangular" width={'100%'} height={190} />
         </Grid>
         <Grid item xs={6}>
         <Skeleton variant="rectangular" width={'100%'} height={190} />
         </Grid>
         </Grid>
         </Grid>
    </div>
  )
}

export default ModalSkeleton