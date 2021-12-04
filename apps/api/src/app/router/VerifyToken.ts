import * as jwt from 'jsonwebtoken';



class VerifyToken {
  
  public static verifyToken = (req,res,next) => {
  const authHeader = req.headers.token
  if(authHeader) {
    const token = authHeader.split(" ")[1] // (BEARER *HDHJU*&^etFHGjh#gjhEJH ) TOKEN LIKE THAT SO I WANT What is after Bearer
    jwt.verify(token,process.env.JWT_SEC, (err, user) => {
      if(err) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    })
  }else {
    return res.status(401).json("You are not authenticated")
  }
};

public static verifyTokenAndAuthrization = (req,res,next) => {
 this.verifyToken(req,res, () => {
    if(req.user.id === req.params.id || req.user.isAdmin) {
      next()
    }else {
      res.status(403).json("You are not alowed to do hhat!")
    }
  })
}

public static verifyTokenAndAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

}

export default  VerifyToken

