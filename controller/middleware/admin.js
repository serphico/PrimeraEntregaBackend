function adminMid (req, res, next){
   req.admin = true;
   next()
}

export default adminMid;