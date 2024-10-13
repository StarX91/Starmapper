const admin = require("firebase-admin");

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  try {
    let authToken = token;
    if (authToken.startsWith("Bearer ")) {
      authToken = authToken.replace("Bearer ", "");
    }
    const decodedToken = await admin.auth().verifyIdToken(authToken);
    req.uid = decodedToken.uid; // Store the user ID in request for future use
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return next(error);
  }
};

module.exports = verifyFirebaseToken;
