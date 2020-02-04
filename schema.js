const company = {
  Name: "Shri shani handloom",                      // String
  email: "shrishanihandloom@gmail.com",             // String
  otherEmails: [                                    // Array of strings
    "info_shrishanihandloom@gmail.com",
    "support_shrishanihandloom@gmail.com"
  ],                                                                                                        // Multiple inputs with + and - button to add new and remove
  phone: 9878654532,                                // Number
  otherPhones: [7865451223, 9878545632],            // Array of numbers                                     // Multiple inputs with + and - button to add new and remove
  GSTNo: "09234JDHDSD34H34W223",                    // String
  Address: "343, Industrial area",                  // String
  Zipcode: 132103,                                  // Number
  City: "panipat",                                  // String                                               // Dropdown field
  State: "haryana",                                 // String                                               // Dropdown field 
  Country: "India",                                 // String                                               // Dropdown field
  Logo:
    "https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg",      // String               // Upload field
  Transports: [Transports],                         // Array of references to the transport object
  Industry: "Handloom",                             // String
  Fiscalyear: {                                     
    start: 1585699200000,                           // Timestamp: 1st april 2020                            // Dropdown with options (apr-mar and jan-dec)              
    end: 1585612800000                              // Timestamp: 31st mar 2021                                            
  },
  Warehouses: [Warehouses],                         // Array of reference to the warehouses
  Users: [User]                                     // Array of reference of users
};

const Transports = {
  Company: Company,                                 // Reference of the company
  Name: "LK transports",                            // String
  Contact: "Raju",                                  // String
  GSTNo: "09234JDHDSD34H34W223",                    // String
  Phone: 9845653245,                                // Number
  Address: "343, Industrial area",                  // String
  Zipcode: 132103,                                  // Number
  City: "panipat",                                  // String
  State: "haryana",                                 // String
  Country: "India",                                 // String
};

const Warehouses = {
  Company: Company,                                 // Reference of the company
  Warehouses: [
    {
      Address: "343, Industrial area",              // String
      Zipcode: 132103,                              // Number
      City: "panipat",                              // String
      State: "haryana",                             // String
      Country: "India",                             // String
    }
  ]
};

const User = {
  Name: "Prince Jain",                              // String
  Role: "Owner",                                    // String
  email: "loveforever1prince@gmail.com",            // String
  otherEmails: ["prince@gmail.com", "jain.prince@yahoo.com"],   // Array of Strings
  phone: 9878654532,                                // Number
  otherPhones: [7865451223, 9878545632],            // Array of numbers
  Address: "343, Industrial area",                  // String
  Zipcode: 132103,                                  // Number
  City: "panipat",                                  // String
  State: "haryana",                                 // String
  Country: "India",                                 // String
  Company: Company                                  // Reference of company
};

const Clients = {
  Name: "Blue Lagoon",                              // String
  email: "bluelagoon@gmail.com",                    // String
  otherEmails: ["sandy@gmail.com", "shubham@yahoo.com"],        // Array of Strings
  phone: 9878654532,                                // Number
  otherPhones: [7865451223, 9878545632],            // Array of numbers
  Contacts: [User],                                 // Array of reference to the users
  GSTNo: "09234JDHDSD34H34W223",                    // String
  Address: "343, Industrial area",                  // String
  Zipcode: 132103,                                  // Number
  City: "panipat",                                  // String
  State: "haryana",                                 // String
  Country: "India",                                 // String
  DeliveryAddresses: [                              // Array of objects
    {
      Address: "343, Industrial area",              // String
      Zipcode: 132103,                              // Number
      City: "panipat",                              // String
      State: "haryana",                             // String
      Country: "India",                             // String
    }
  ],
  Creditlimit: 2000000,                             // Number
  Openingbalance: 250000,                           // Number
  Transports: Transports,                           // Reference of transports
  Products: [Products]                              // Array of reference of products
};

const BankAccount = {
  Bankname: "ICICI",                                // String
  Accno: 23408324082203,                            // Number
  IFSCcode: "ICIC000023"                            // String
};

const Products = {
  Name: "Carpet",                                   // String
  Displayname: "Blue velvet carpet",                // String
  Coverimage:                                       // String
    "https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg",
  GaleryImages: [                                   // Array of strings
    "https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg",
    "https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg"
  ],
  HSNcode: 5454,                                    // Number
  Taxcategory: Taxes,                               // Reference of tax
  Properties: productProperties,                    // Reference of product properties
  Unit: "pcs",                                      // String   
  Defaultprice: 210,                                // Number
  Stock: 500,                                       // Number
  Expiry: 1585699200000,                            // Timestamp
  Comment: "additional comment",                    // String
  Clients: [Clients]                                // Array of reference of clients
};

const productProperties = {
  product: Products,                                // String
  Properties: [                                     // Array of objects
    { key: "weight", value: 100 },
    { key: "color", value: "blue" },
    { key: "height", value: 40 },
    { key: "width", value: 50 }
  ]
};

const bills = {
  BillNumber: "213/2020-04",                        // String
  Date: 1585699200000,                              // Timestamp
  Client: Clients,                                  // Refernce of client
  Ewaybillno: 2398428934829,                        // Number
  Bankaccount: BankAccount,                         // Reference of account
  Products: [                                       // Array of products
    {
        Product: Products,                          // Reference of products
        Totalunits: 20,                             // Number
        price: 200,                                 // Number
        Othercharges: [                             // Array of other charges
            {
                reason: 'packing',                  // String
                amount: 20                          // Number
            }
        ],
        Discount: 3000,                             // Number
        Tax: Taxes,                                 // Reference of taxes
    }
  ],                             
  Totalamount: 33000,                               // Number
  Finalamount: 30000,                               // Number
  Transport: {                                      // Reference of transport
      Transport: Transport,
      Date: "",
      VehicleNo: "",
      Distance: 0,
      Mode: "",
  },                            
  Duedate: 1585699200000,                           // Timestamp
  Comment: "asdf asdfas",                           // String
  Billimage: "https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg",           // String
  PaymentMode: "cash"                               // String
};

const Taxes = {
  name: "5% IGST",                                         // String
  value: 5                                                 // Number
};
// CGST+SGST/IGST
