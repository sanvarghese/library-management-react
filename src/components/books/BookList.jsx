import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Tooltip, Chip } from '@mui/material';
import { Edit, Delete, Book, BookmarkAdded, Padding } from '@mui/icons-material';
import BorrowButton from '../borrowing/BorrowButton';
import ReturnButton from '../borrowing/ReturnButton';

const BookList = ({ books, page, count, onPageChange, onEdit, onDelete, isAdmin, onRefresh }) => {

    const handleOperationSuccess = () => {
        onRefresh(); // Trigger refresh after operation
    };
    return (

        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>ISBN</TableCell>
                            <TableCell>Available Copies</TableCell>
                            {/* <TableCell>Status</TableCell> */}
                            {/* {isAdmin ? ( */}
                            <TableCell>Actions</TableCell>
                            {/* // ):(
                        //         <></>
                        //     )} */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book._id}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.author}</TableCell>
                                <TableCell>{book.isbn}</TableCell>
                                <TableCell>{book.availableCopies}</TableCell>

                                <TableCell>
                                    {isAdmin ? (
                                        <>
                                            <Tooltip title="Edit">
                                                <IconButton onClick={() => onEdit(book)}>
                                                    <Edit color="primary" />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton onClick={() => onDelete(book._id)}>
                                                    <Delete color="error" />
                                                </IconButton>
                                            </Tooltip>
                                        </>
                                    ) : (
                                        <>

                                            {book.availableCopies > 0 && (
                                                <BorrowButton bookId={book._id} sx={{ margin: '0 12px' }} onSuccess={handleOperationSuccess}
                                                />
                                            )}
                                            <ReturnButton bookId={book._id} onSuccess={handleOperationSuccess}
                                            />
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10]}
                component="div"
                count={count * 10}
                rowsPerPage={10}
                page={page}
                onPageChange={onPageChange}
            />
        </Paper>
    );
};

export default BookList;