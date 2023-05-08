import { Skeleton,Grid } from '@mui/material'
const LoadingSkeleton = () => {
  return (
    <div data-testid="loading-skeleton">
         <Grid container spacing={2} width={'100%'} alignItems={'center'} justifyContent={'center'}>
          <Grid item xs={4}>
         <Skeleton variant="rectangular" width={'100%'} height={310} />
         </Grid>
         <Grid item xs={4}>
         <Skeleton variant="rectangular" width={'100%'} height={310} />
         </Grid>
         <Grid item xs={4}>
         <Skeleton variant="rectangular" width={'100%'} height={310} />
         </Grid>
         </Grid>
    </div>
  )
}

export default LoadingSkeleton