import { Box, Typography, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Email, Person, CalendarToday } from '@mui/icons-material';

const Profile = ({ user, history }) => {

    console.log(user,'userr', history,'history')
    return (
        <Box>
            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h5" gutterBottom>
                    User Information
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Person sx={{ mr: 1 }} />
                    <Typography>Name: {user.name}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Email sx={{ mr: 1 }} />
                    <Typography>Email: {user.email}</Typography>
                </Box>
                {/* <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarToday sx={{ mr: 1 }} />
                    <Typography>Member since: {new Date(user.createdAt).toLocaleDateString()}</Typography>
                </Box> */}
            </Paper>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
                Borrowing History
            </Typography>
            {history.length === 0 ? (
                <Typography>No borrowing history found.</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Book Title</TableCell>
                                <TableCell>Borrow Date</TableCell>
                                <TableCell>Return Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                {history.map((record) => (
                                    <TableRow key={record._id}>
                                        <TableCell>{record.bookId.title}</TableCell>  {/* Changed from record.book.title */}
                                        <TableCell>{new Date(record.borrowDate).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : '-'}
                                        </TableCell>
                                        <TableCell>
                                            {record.actualReturnDate ? 'Returned' : 'Borrowed'}  {/* Changed from record.returnDate */}
                                        </TableCell>
                                        <TableCell>
                                            {record.actualReturnDate ? (
                                                <span style={{ color: 'green' }}>Returned</span>
                                            ) : new Date() > new Date(record.returnDate) ? (
                                                <span style={{ color: 'red' }}>Overdue</span>
                                            ) : (
                                                <span style={{ color: 'blue' }}>Borrowed</span>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
};

export default Profile;