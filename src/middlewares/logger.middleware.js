const logger = (req, res, next) => {
    const now = new Date();
    console.log(`${now.toISOString()} - ${req.method} ${req.path}`);
    next();
  };
  
  export default logger;
  