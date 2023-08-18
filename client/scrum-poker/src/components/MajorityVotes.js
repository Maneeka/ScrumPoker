import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export function MajorityVotes({topVotes}){
    const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
    return (
        <div style={{ display:'flex', justifyContent:'center' }}>
            <Card sx={{ width: 150, height: 100, textAlign:'center' }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Majority Vote{topVotes.length > 1 ? 's' : ''}:
                    </Typography>
                    <Typography variant="h5" component="div" sx={{fontWeight:'bold'}}>
                    {topVotes.join(', ')}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}