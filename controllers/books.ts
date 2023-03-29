//@ts-nocheck

// @desc get all books
// @route GET /api/v1/books
// @access Public
export function getBooks(req, res, next) {
  res.status(200).json({success: true, msg: 'show all books'})
}
// @desc get a book by ID
// @route GET /api/v1/books/:id
// @access Public
export function getBook(req, res, next) {
  res.status(200).json({success: true, msg: `show book ${req.params.id}`})
}
// @desc get all books
// @route CREATE /api/v1/books
// @access Private
export function createBooks(req, res, next) {
  res.status(200).json({success: true, msg: 'create a book'})
}
// @desc get all books
// @route UPDATE /api/v1/books
// @access Public
export function updateBook(req, res, next) {
  res.status(200).json({success: true, msg: `Update book ${req.params.id}`})
}
// @desc get all books
// @route DELETE /api/v1/books
// @access Public
export function deleteBook(req, res, next) {
  res.status(200).json({success: true, msg: `Delete book ${req.params.id}`})
}