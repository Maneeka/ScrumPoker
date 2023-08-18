import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from "@mui/material/colors";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#262545',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
      color: theme.palette.common.white,
      fontWeight: 'bold'
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: '#6b7a99'
    },
    '&:nth-of-type(even)': {
      backgroundColor: '#92a7ba',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

export function MemberTable({members, isValidVote, showVotes}) {
    return (
        <TableContainer component={Paper} style={{ width: 550, margin: 'auto' }}>
            <Table aria-label="customized table" style={{ width: 550, margin: 'auto' }}>
            <TableHead>
                <TableRow>
                    <StyledTableCell>Members </StyledTableCell>
                    <StyledTableCell align="right">Votes</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {Object.keys(members).map((memberId) => (
                <StyledTableRow key={memberId}>
                    <StyledTableCell component="th" scope="row">
                    {members[memberId].name} 
                    {isValidVote(members[memberId].vote)  ? <CheckCircleOutlineIcon sx={{ color: '#faf3dd', fontSize: 18, marginLeft: 1 }}/> : ''}
                    </StyledTableCell>
                    
                    <StyledTableCell align="right" style={{fontSize: 17}}>{(showVotes && isValidVote(members[memberId].vote)) ? `${members[memberId].vote}` : ''}</StyledTableCell>
                </StyledTableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    );
}
  