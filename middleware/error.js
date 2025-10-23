const errorHandler = (err, req, res, next) => {
  if(err.status){
    return res.status(err.status).json({ message: err.message });
  } else{
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
  return next();
}

export default errorHandler;