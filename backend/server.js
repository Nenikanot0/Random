import "dotenv/config";
import app from "./src/app.js";
import connectDB from "./src/config/connect.js"

const PORT=process.env.PORT || 5000;

const startServer = async() => {
    try{
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server is running in port ${PORT}`);
        }); 

    }catch(error){
        console.error("Failed to start server: ", error);
        process.exit(1);
    }
};
    
startServer();