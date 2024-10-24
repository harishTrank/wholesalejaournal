const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");

// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/errorController");
// const budgetRouter = require("./routes/budgetRoutes");
const flightRouter = require("./routes/flightRoutes");

const app = express();

//Helmet
//app.use(helmet());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
//       baseUri: ["'self'"],
//       fontSrc: ["'self'", 'https:', 'http:', 'data:'],
//       scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
//       styleSrc: ["'self'", 'https:', 'http:', 'unsafe-inline'],
//     },
//   })
// );

/*app.options(
  "*",
  cors({
    // origin: 'http://127.0.0.1:3000',
    origin:
      process.env.NODE_ENV === "development"
        ? process.env.APP_URL_FRONT
        : process.env.APP_URL,
    //preflightContinue: true,
    credentials: true,
    //exposedHeaders: ['Set-Cookie'],
  })
);*/

app.use(cors());

// Add headers
app.use(function (req, res, next) {
 const allowedOrigins = [
     "http://aerorisefly.com",
	 "http://www.aerorisefly.com",
	 "https://aerorisefly.com",
	 "https://www.aerorisefly.com",
    "http://trianfly.com",
    "http://www.trianfly.com",
    "https://www.trianfly.com",
    "https://trianfly.com",
    "https://flighttripcharge.com",
    "https://www.flighttripcharge.com",
    "https://flymydeal.com",
    "https://www.flymydeal.com",
    "https://dealforflights.com",
    "https://www.dealforflights.com",
    "https://zenstar.dealforflights.com",
    "https://goglaxytravels.dealforflights.com",
    "https://flybirdtrips.dealforflights.com",
    "https://flighthubdeal.com",
    "https://www.flighthubdeal.com",
    "https://ca.flighthubdeal.com",
    "https://au.flighthubdeal.com",
    "https://in.flighthubdeal.com",
    "https://id.flighthubdeal.com",
    "https://my.flighthubdeal.com",
    "https://nz.flighthubdeal.com",
    "https://ph.flighthubdeal.com",
    "https://qa.flighthubdeal.com",
    "https://sg.flighthubdeal.com",
    "https://sa.flighthubdeal.com",
    "https://th.flighthubdeal.com",
    "https://en.flighthubdeal.com",
    "https://es.flighthubdeal.com",
    "https://uk.flighthubdeal.com",
    "https://vn.flighthubdeal.com",
    "https://happytobook.com",
    "https://www.happytobook.com",
    "https://travels-services.com",
    "https://www.travels-services.com",
    "https://flightticketcharge.com",
    "https://www.flightticketcharge.com",
    "https://travelgency.com",
    "https://www.travelgency.com",
    "https://www.flightfarecharge.com",
    "https://flightfarecharge.com",
    "https://www.tripnair.com",
    "https://tripnair.com",
    "https://gogalaxytravels.com",
    "https://www.gogalaxytravels.com",
    "https://flybirdtrips.com",
    "https://www.flybirdtrips.com",
	"https://flyingrules.com",
    "https://www.flyingrules.com",
    "https://www.zenstartravels.com",
    "https://zenstartravels.com",
    "https://delta.flighttripcharge.com",
    "http://localhost:3000",
    "http:localhost:8000",
     "http://127.0.0.1:8000",
	 "https://flighthubdeal.co",
	 "https://flighthubdeal.org",
	 "http://flighthubdeal.co",
	 "http://flighthubdeal.org",
     "https://www.flyingrules.com",
    "https://www.trianfly.com",
	 "https://airfarefees.com",
	  "http://airfarefees.com",
	      "https://www.airfarefees.com",
          "http://www.airfarefees.com",
 "http://www.globalfarehub.com",
	 "http://globalfarehub.com",
	 "https://globalfarehub.com",
	 "https://www.globalfarehub.com",
]

const origin = req.headers.origin;
if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  //console.log('Req Heraders', req.headers);
  // Website you wish to allow to connect
 // if (process.env.NODE_ENV === "development") {
    // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
	//res.setHeader("Access-Control-Allow-Origin", req.get("origin"));    
//	res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
  //} else {
	//res.setHeader("Access-Control-Allow-Origin", req.get("origin"));
    //res.setHeader("Access-Control-Allow-Origin", process.env.APP_URL);
 // }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Set-Cookie,access-control-allow-credentials,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

//Morgan for Dev only
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Body Parser - reading data from body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

//Data Sanitization against noSQL query injection
//app.use(mongoSanitize());

//Mounting Router
// app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/flight", flightRouter);

//If Production then serve from build
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

//Global Error Handler

// app.use(globalErrorHandler);

module.exports = app;
