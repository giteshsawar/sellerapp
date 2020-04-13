
const Company = {
  Name: 'Shri shani handloom', // String
  email: 'shrishanihandloom@gmail.com', // String
  otherEmails: [
    // Array of strings
    'info_shrishanihandloom@gmail.com',
    'support_shrishanihandloom@gmail.com'
  ], // Multiple inputs with + and - button to add new and remove
  phone: 9878654532, // Number
  otherPhones: [7865451223, 9878545632], // Array of numbers (NR)                                    // Multiple inputs with + and - button to add new and remove
  website: 'https://www.shrinshanihandloom.com', // String (NR)
  GSTNo: '09234JDHDSD34H34W223', // String
  Address: '343, Industrial area', // String
  Zipcode: 132103, // Number
  City: 'panipat', // String                                               // Dropdown field
  State: 'haryana', // String                                               // Dropdown field
  Country: 'India', // String                                               // Dropdown field
  Logo:
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg', // String (NR)               // Upload field
  Products: [Products],
  Services: [Services],
  Clients: [Clients],
  Industry: 'Handloom', // String
  Fiscalyear: {
    start: 1585699200000, // Timestamp: 1st april 2020                            // Dropdown with options (apr-mar and jan-dec)
    end: 1585612800000 // Timestamp: 31st mar 2021
  },
  Users: [{ role: 'owner', user: User }] // Array of reference of users
};

const Warehouses = {
  Company: Company, // Reference of the company (NR)
  Warehouses: [
    {
      Address: '343, Industrial area', // String
      Zipcode: 132103, // Number
      City: 'panipat', // String
      State: 'haryana', // String
      Country: 'India' // String
    }
  ]
};

const User = {
  Name: 'Prince Jain', // String
  email: 'loveforever1prince@gmail.com', // String
  otherEmails: ['prince@gmail.com', 'jain.prince@yahoo.com'], // Array of Strings (NR)
  phone: 9878654532, // Number
  otherPhones: [7865451223, 9878545632], // Array of numbers (NR)
  Address: '343, Industrial area', // String (NR)
  Zipcode: 132103, // Number (NR)
  City: 'panipat', // String (NR)
  State: 'haryana', // String (NR)
  Country: 'India', // String (NR)
  Company: [Company] // Reference of companies
};

const Clients = {
  Name: 'Blue Lagoon', // String
  email: 'bluelagoon@gmail.com', // String
  otherEmails: ['sandy@gmail.com', 'shubham@yahoo.com'], // Array of Strings
  phone: 9878654532, // Number
  otherPhones: [7865451223, 9878545632], // Array of numbers
  Contacts: [User], // Array of reference to the users
  companyProfile: 'https://ledgerapp/company/bluelagoon', // String
  GSTNo: '09234JDHDSD34H34W223', // String
  Address: '343, Industrial area', // String
  Zipcode: 132103, // Number
  City: 'panipat', // String
  State: 'haryana', // String
  Country: 'India', // String
  Website: 'https://www.bluelagoon.com',
  ClosedBy: User,
  Service: Expenses, // Reference to expenses
  DeliveryAddresses: [
    // Array of objects
    {
      Address: '343, Industrial area', // String
      Zipcode: 132103, // Number
      City: 'panipat', // String
      State: 'haryana', // String
      Country: 'India' // String
    }
  ],
  Creditlimit: 2000000, // Number
  Openingbalance: 250000, // Number
  curentOutstanding: 100000, // Number
  Products: [Products], // Array of reference of products
  Services: [Services]
};

const Views = {
  name: 'All delhi clients', // String
  ref: 'products', // String                             // Product or party
  filters: {
    minAmount: 10000, // Number
    maxAmount: 100000, // Number
    location: {
      key: 'city', // String
      value: 'panipat' // String
    }
  }
};

const BankAccount = {
  Bankname: 'ICICI', // String
  Accno: 23408324082203, // Number
  CurrentBalance: 500000, // Number
  IFSCcode: 'ICIC000023' // String
};

const ProductCategory = {
  name: 'Carpets', // String
  units: {
    base: 'kg', // base unit
    secondary: 'bundle', // secondary unit
    equivalent: 5 // base*eq = secondary
  },
  Properties: [
    // Array of objects
    { key: 'weight', unit: 'kg' },
    { key: 'color' },
    { key: 'height', unit: 'cm' },
    { key: 'width', unit: 'cm' }
  ]
};

const Products = {
  Name: 'Blue velvet carpet', // String
  Categoy: ProductCategory, // String
  // String
  Coverimage:
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg',
  GaleryImages: [
    // Array of strings
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg',
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg'
  ],
  HSNcode: 5454, // Number
  Taxcategory: Taxes, // Reference of tax
  Properties: [
    // Array of all product properties
    { key: 'weight', value: 100 },
    { key: 'color', value: 'blue' },
    { key: 'height', value: 40 },
    { key: 'width', value: 50 }
  ], // String
  Defaultprice: 210, // Number
  Stock: 500, // Number
  Expiry: 1585699200000, // Timestamp
  Comment: 'additional comment', // String
  Clients: [Clients] // Array of reference of clients
};

const Services = {
  Name: 'Transport', // Name
  Clients: [Clients] // Clients
};

const Sales = {
  BillNumber: '213/2020-04', // String
  Date: 1585699200000, // Timestamp
  Client: Clients, // Refernce of client
  Ewaybillno: 2398428934829, // Number
  Bankaccount: BankAccount, // Reference of account
  Products: [
    // Array of products
    {
      Product: Products, // Reference of products
      Totalunits: 20, // Number
      price: 200, // Number
      Othercharges: [
        // Array of other charges
        {
          reason: 'packing', // String
          amount: 20 // Number
        }
      ],
      Discount: 3000, // Number
      Tax: Taxes // Reference of taxes
    }
  ],
  Services: [{}],
  Totalamount: 33000, // Number
  Finalamount: 30000, // Number
  Transport: {
    // Reference of transport
    Transport: Transport,
    Date: '',
    VehicleNo: '',
    Distance: 0,
    Mode: ''
  },
  Duedate: 1585699200000, // Timestamp
  Comment: 'asdf asdfas', // String
  Billimage:
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg', // String
  PaymentMode: PaymentMode // String
};

const Purchase = {
  BillNumber: '213/2020-04', // String
  Date: 1585699200000, // Timestamp
  Client: Clients, // Refernce of client
  Ewaybillno: 2398428934829, // Number
  Bankaccount: BankAccount, // Reference of account
  Products: [
    // Array of products
    {
      Product: Products, // Reference of products
      Totalunits: 20, // Number
      price: 200, // Number
      Othercharges: [
        // Array of other charges
        {
          reason: 'packing', // String
          amount: 20 // Number
        }
      ],
      Discount: 3000, // Number
      Tax: Taxes // Reference of taxes
    }
  ],
  Services: [{}],
  Totalamount: 33000, // Number
  Finalamount: 30000, // Number
  Transport: {
    // Reference of transport
    Transport: Transport,
    Date: '',
    VehicleNo: '',
    Distance: 0,
    Mode: ''
  },
  Duedate: 1585699200000, // Timestamp
  Comment: 'asdf asdfas', // String
  Billimage:
    'https://images.freeimages.com/images/large-previews/72c/fox-1522156.jpg', // String
  PaymentMode: PaymentMode // String
};

const Taxes = {
  name: '5% IGST', // String
  value: 5 // Number
};

const PaymentMode = {
  name: 'cash'
};


Should we keep reference of products/services and clients in company object?
How to save user role?
How to save company reference in user?
Contacts in clients objects, should it be referenced to user?
Where to save clients delivery address?
How to save payment mode?

