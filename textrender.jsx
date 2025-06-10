import React from 'react';
import {
  Typography,
  List,
  ListItem,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableContainer,
  Box,
  Card
} from '@mui/material';

const TextRender = ({ content = [] }) => {
  return (
    <Card sx={{height:432, overflow:'auto'}}>
      {content.map((item, index) => {
        switch (item.type) {
          case 'heading':
            return (
              <Typography key={index} variant="h3" gutterBottom>
                {item.content}
              </Typography>
            );

          case 'paragraph':
            return (
              <Typography key={index} variant="body2" paragraph>
                {item.content}
              </Typography>
            );

          case 'list':
            return (
              <List key={index} dense>
                {item.content.map((line, i) => (
                  <ListItem key={i} sx={{ display: 'list-item', pl: 2 }}>
                    {i+1}. {line}
                  </ListItem>
                ))}
              </List>
            );

          case 'table':
            if (!item.content || item.content.length === 0) return null;

            const columns = Object.keys(item.content[0]);

            return (
              <TableContainer key={index} component={Paper} sx={{ my: 2 }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      {columns.map((col, i) => (
                        <TableCell key={i} sx={{ fontWeight: 'bold' }}>
                          {col}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.content.map((row, i) => (
                      <TableRow hover key={i}>
                        {columns.map((col, j) => (
                          <TableCell key={j}>{row[col]}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );

          default:
            return null;
        }
      })}
    </Card>
  );
};

export default TextRender;