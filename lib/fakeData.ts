import { Parent, Student } from "./utils";

export const students: Student[] = [
    { name: "Nathan Martin", class: "JSS2", studentId: "STU001", outstandingFees: 0 },
    { name: "Sophia Martin", class: "SS1", studentId: "STU002", outstandingFees: 5000 }

]

export const parents: Parent[]  = [
  {
    id: "PAR001",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    phoneNumber: "+2348012345678",
    status: "active",
    gender: "Female",
    address: "15 Ikoyi Crescent, Lagos",
    relationship: "Mother",
    occupation: "Accountant",
    lastLogin: "2025-05-01T08:15:00Z",
    linkedStudents: [
      { name: "Nathan Martin", class: "JSS2", studentId: "STU001", outstandingFees: 0 },
      { name: "Sophia Martin", class: "SS1", studentId: "STU002", outstandingFees: 5000 }
    ]
  },
  {
    id: "PAR002",
    name: "James Owens",
    email: "james.owens@example.com",
    phoneNumber: "+2348098765432",
    status: "pending",
    gender: "Male",
    address: "22 Admiralty Way, Lekki",
    relationship: "Father",
    occupation: "Engineer",
    lastLogin: null,
    linkedStudents: [
      { name: "Ella Owens", class: "Primary 4", studentId: "STU003", outstandingFees: 10000 }
    ]
  },
  {
    id: "PAR003",
    name: "Grace Okafor",
    email: "grace.okafor@example.com",
    phoneNumber: "+2348134567890",
    status: "active",
    gender: "Female",
    address: "8 Banana Island Road, Lagos",
    relationship: "Mother",
    occupation: "Nurse",
    lastLogin: "2025-04-27T13:00:00Z",
    linkedStudents: [
      { name: "Chidi Okoro", class: "JSS1", studentId: "STU004", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR004",
    name: "Tunde Adewale",
    email: "tunde.adewale@example.com",
    phoneNumber: "+2348023456781",
    status: "active",
    gender: "Male",
    address: "5 Bourdillon, Ikoyi",
    relationship: "Father",
    occupation: "Architect",
    lastLogin: "2025-04-30T17:25:00Z",
    linkedStudents: [
      { name: "Kelechi Adewale", class: "SS2", studentId: "STU005", outstandingFees: 15000 },
      { name: "Ada Adewale", class: "SS1", studentId: "STU006", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR005",
    name: "Funmi Balogun",
    email: "funmi.balogun@example.com",
    phoneNumber: "+2348145678902",
    status: "active",
    gender: "Female",
    address: "23 Herbert Macaulay Way, Yaba",
    relationship: "Mother",
    occupation: "Teacher",
    lastLogin: "2025-05-02T08:00:00Z",
    linkedStudents: [
      { name: "Ife Balogun", class: "Primary 5", studentId: "STU007", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR006",
    name: "Peter Igwe",
    email: "peter.igwe@example.com",
    phoneNumber: "+2348176543210",
    status: "pending",
    gender: "Male",
    address: "9 Allen Avenue, Ikeja",
    relationship: "Father",
    occupation: "Banker",
    lastLogin: null,
    linkedStudents: [
      { name: "Femi Igwe", class: "JSS2", studentId: "STU008", outstandingFees: 10000 }
    ]
  },
  {
    id: "PAR007",
    name: "Ngozi Udo",
    email: "ngozi.udo@example.com",
    phoneNumber: "+2348123456711",
    status: "active",
    gender: "Female",
    address: "11 Chevron Drive, Lekki",
    relationship: "Mother",
    occupation: "Businesswoman",
    lastLogin: "2025-04-28T10:45:00Z",
    linkedStudents: [
      { name: "Ngozi Udo", class: "SS1", studentId: "STU009", outstandingFees: 0 },
      { name: "Chuka Udo", class: "Primary 4", studentId: "STU010", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR008",
    name: "Ifeanyi Nwankwo",
    email: "ifeanyi.nwankwo@example.com",
    phoneNumber: "+2348011223344",
    status: "active",
    gender: "Male",
    address: "3 Broad Street, Marina",
    relationship: "Guardian",
    occupation: "Trader",
    lastLogin: "2025-04-25T07:40:00Z",
    linkedStudents: [
      { name: "Amaka Nwankwo", class: "JSS1", studentId: "STU011", outstandingFees: 5000 }
    ]
  },
  {
    id: "PAR009",
    name: "Yetunde Oke",
    email: "yetunde.oke@example.com",
    phoneNumber: "+2348033344556",
    status: "active",
    gender: "Female",
    address: "6 Freedom Way, Lekki",
    relationship: "Mother",
    occupation: "Consultant",
    lastLogin: "2025-04-30T09:30:00Z",
    linkedStudents: [
      { name: "Tobi Oke", class: "Primary 5", studentId: "STU012", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR010",
    name: "Kunle Ajayi",
    email: "kunle.ajayi@example.com",
    phoneNumber: "+2348056677889",
    status: "active",
    gender: "Male",
    address: "13 Agungi Road, Lekki",
    relationship: "Father",
    occupation: "Civil Servant",
    lastLogin: "2025-04-29T12:15:00Z",
    linkedStudents: [
      { name: "Bola Ajayi", class: "SS2", studentId: "STU013", outstandingFees: 10000 },
      { name: "Seyi Ajayi", class: "JSS2", studentId: "STU014", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR011",
    name: "Aisha Bello",
    email: "aisha.bello@example.com",
    phoneNumber: "+2348067890123",
    status: "pending",
    gender: "Female",
    address: "10 Gwarinpa Estate, Abuja",
    relationship: "Mother",
    occupation: "Pharmacist",
    lastLogin: null,
    linkedStudents: [
      { name: "Halima Bello", class: "JSS1", studentId: "STU015", outstandingFees: 5000 }
    ]
  },
  {
    id: "PAR012",
    name: "Emeka Okoro",
    email: "emeka.okoro@example.com",
    phoneNumber: "+2348033211455",
    status: "active",
    gender: "Male",
    address: "88 Ogui Road, Enugu",
    relationship: "Father",
    occupation: "Civil Engineer",
    lastLogin: "2025-04-21T14:30:00Z",
    linkedStudents: [
      { name: "Chinedu Okoro", class: "SS2", studentId: "STU016", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR013",
    name: "Titi Adebayo",
    email: "titi.adebayo@example.com",
    phoneNumber: "+2348154443322",
    status: "active",
    gender: "Female",
    address: "12 Akin Adesola St, Victoria Island",
    relationship: "Mother",
    occupation: "HR Manager",
    lastLogin: "2025-04-22T08:20:00Z",
    linkedStudents: [
      { name: "Tola Adebayo", class: "Primary 6", studentId: "STU017", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR014",
    name: "Samuel Yusuf",
    email: "samuel.yusuf@example.com",
    phoneNumber: "+2348180001111",
    status: "pending",
    gender: "Male",
    address: "15 Ring Road, Ibadan",
    relationship: "Guardian",
    occupation: "Farmer",
    lastLogin: null,
    linkedStudents: [
      { name: "Zainab Yusuf", class: "JSS2", studentId: "STU018", outstandingFees: 10000 }
    ]
  },
  {
    id: "PAR015",
    name: "Lilian Umeh",
    email: "lilian.umeh@example.com",
    phoneNumber: "+2348099988776",
    status: "active",
    gender: "Female",
    address: "3 Park Avenue, Awka",
    relationship: "Mother",
    occupation: "Lawyer",
    lastLogin: "2025-05-01T09:15:00Z",
    linkedStudents: [
      { name: "Adaeze Umeh", class: "SS1", studentId: "STU019", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR016",
    name: "Abdulrahman Musa",
    email: "abdul.musa@example.com",
    phoneNumber: "+2348076543221",
    status: "active",
    gender: "Male",
    address: "47 Zaria Road, Kano",
    relationship: "Father",
    occupation: "Lecturer",
    lastLogin: "2025-04-28T10:00:00Z",
    linkedStudents: [
      { name: "Usman Musa", class: "JSS3", studentId: "STU020", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR017",
    name: "Esther Alabi",
    email: "esther.alabi@example.com",
    phoneNumber: "+2348123456781",
    status: "active",
    gender: "Female",
    address: "21 Akure Road, Akure",
    relationship: "Mother",
    occupation: "Trader",
    lastLogin: "2025-05-03T11:45:00Z",
    linkedStudents: [
      { name: "Gbenga Alabi", class: "Primary 5", studentId: "STU021", outstandingFees: 0 },
      { name: "Tolu Alabi", class: "JSS1", studentId: "STU022", outstandingFees: 15000 }
    ]
  },
  {
    id: "PAR018",
    name: "Femi Olagunju",
    email: "femi.olagunju@example.com",
    phoneNumber: "+2348031234567",
    status: "pending",
    gender: "Male",
    address: "5 Challenge Street, Ibadan",
    relationship: "Father",
    occupation: "IT Consultant",
    lastLogin: null,
    linkedStudents: [
      { name: "Kenny Olagunju", class: "Primary 6", studentId: "STU023", outstandingFees: 5000 }
    ]
  },
  {
    id: "PAR019",
    name: "Ngozi Eze",
    email: "ngozi.eze@example.com",
    phoneNumber: "+2348165432198",
    status: "active",
    gender: "Female",
    address: "1 Garki Close, Abuja",
    relationship: "Mother",
    occupation: "Banker",
    lastLogin: "2025-04-26T13:55:00Z",
    linkedStudents: [
      { name: "Chika Eze", class: "SS2", studentId: "STU024", outstandingFees: 0 }
    ]
  },
  {
    id: "PAR020",
    name: "Jide Lawal",
    email: "jide.lawal@example.com",
    phoneNumber: "+2348051112233",
    status: "active",
    gender: "Male",
    address: "44 Allen Avenue, Ikeja",
    relationship: "Father",
    occupation: "Accountant",
    lastLogin: "2025-04-29T18:30:00Z",
    linkedStudents: [
      { name: "Moji Lawal", class: "SS1", studentId: "STU025", outstandingFees: 0 }
    ]
  }
];



//students fake datas

// types.ts or wherever you define table props
export type StudentRow = {
  id: string
  name: string
  studentId: string
  class: string
  gender: string
}

  



export const studentColumns: { accessor: keyof StudentRow; header: string }[] = [
  { accessor: "name", header: "Name" },
  { accessor: "studentId", header: "ID" },
  { accessor: "class", header: "Class" },
  { accessor: "gender", header: "Gender" },
];


export const studentRows: StudentRow[] = [
  { id: "1", name: "Kingsley Ekong", studentId: "STU-2025-0148", class: "Year 7A", gender: "Male" },
  { id: "2", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 7B", gender: "Female" },
  { id: "3", name: "Benita Gabriels", studentId: "STU-2025-0148", class: "Year 9A", gender: "Female" },
  { id: "4", name: "Kingsley Ekong", studentId: "STU-2025-0148", class: "Year 10A", gender: "Male" },
  { id: "5", name: "Ore Gabriels", studentId: "STU-2025-0148", class: "Year 7A", gender: "Female" },
  { id: "6", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 12A", gender: "Male" },
  { id: "7", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 9C", gender: "Male" },
  { id: "8", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 8B", gender: "Male" },
  { id: "9", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 10C", gender: "Male" },
  { id: "10", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 11A", gender: "Male" },
  { id: "11", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 12C", gender: "Male" },
  { id: "12", name: "Benita Gabriels", studentId: "STU-2025-0148", class: "Year 7C", gender: "Female" },
  { id: "13", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 7A", gender: "Male" },
  { id: "14", name: "Ore Gabriels", studentId: "STU-2025-0148", class: "Year 9B", gender: "Female" },
  { id: "15", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 11B", gender: "Male" },
  { id: "16", name: "Kingsley Ekong", studentId: "STU-2025-0148", class: "Year 8A", gender: "Male" },
  { id: "17", name: "Benita Gabriels", studentId: "STU-2025-0148", class: "Year 10B", gender: "Female" },
  { id: "18", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 9D", gender: "Female" },
  { id: "19", name: "Ore Gabriels", studentId: "STU-2025-0148", class: "Year 11C", gender: "Female" },
  { id: "20", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 7B", gender: "Male" },
  { id: "21", name: "Kingsley Ekong", studentId: "STU-2025-0148", class: "Year 9A", gender: "Male" },
  { id: "22", name: "Benita Gabriels", studentId: "STU-2025-0148", class: "Year 12A", gender: "Female" },
  { id: "23", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 10C", gender: "Female" },
  { id: "24", name: "Ore Gabriels", studentId: "STU-2025-0148", class: "Year 7C", gender: "Female" },
  { id: "25", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 11A", gender: "Male" },
  { id: "26", name: "Kingsley Ekong", studentId: "STU-2025-0148", class: "Year 12C", gender: "Male" },
  { id: "27", name: "Jenny Johnson", studentId: "STU-2025-0148", class: "Year 10A", gender: "Female" },
  { id: "28", name: "Benita Gabriels", studentId: "STU-2025-0148", class: "Year 9C", gender: "Female" },
  { id: "29", name: "Franklin Akhabue", studentId: "STU-2025-0148", class: "Year 8B", gender: "Male" },
  { id: "30", name: "Ore Gabriels", studentId: "STU-2025-0148", class: "Year 12B", gender: "Female" },
]

//classes fake data
export type ClassRow = {
  id: string;
  class: string;
  teacher: string;
  assistant: string;
  count: number;
  type: string;
};

export const classColumns: { accessor: keyof ClassRow; header: string }[] = [
  { accessor: "class", header: "Class" },
  { accessor: "teacher", header: "Class Teacher" },
  { accessor: "assistant", header: "Assistant Teacher" },
  { accessor: "count", header: "Students Count" },
  { accessor: "type", header: "Classification" },
];

export const classRows: ClassRow[] = [
  { id: 'year-7A', class: 'Year 7A', teacher: 'Anthony Allen', assistant: 'Samuel Olera', count: 20, type: 'Science' },
  { id: 'year-7B', class: 'Year 7B', teacher: 'Samuel Olera', assistant: 'Betty Jacobs', count: 20, type: 'Commercial' },
  { id: 'year-7C', class: 'Year 7C', teacher: 'Susan Oyii', assistant: 'Anthony Allen', count: 20, type: 'Art' },
  { id: 'year-8A', class: 'Year 8A', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Science' },
  { id: 'year-8B', class: 'Year 8B', teacher: 'Michael Aigboka', assistant: 'Annabella Adu', count: 20, type: 'Art' },
  { id: 'year-8C', class: 'Year 8C', teacher: 'Eduard Cole', assistant: '', count: 20, type: 'Commercial' },
  { id: 'year-9A', class: 'Year 9A', teacher: 'Justin Ogbo', assistant: 'Michael Aigboka', count: 20, type: 'Art' },
  { id: 'year-9B', class: 'Year 9B', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Science' },
  { id: 'year-9C', class: 'Year 9C', teacher: 'Eduard Cole', assistant: '', count: 20, type: 'Commercial' },
  { id: 'year-10A', class: 'Year 10A', teacher: 'Elizabeth Arii', assistant: '', count: 20, type: 'Science' },
  { id: 'year-10B', class: 'Year 10B', teacher: 'Kore Ogbei', assistant: '', count: 20, type: 'Art' },
  { id: 'year-10C', class: 'Year 10C', teacher: 'Susan Oyii', assistant: 'Justin Ogbo', count: 20, type: 'Science' },
  { id: 'year-11A', class: 'Year 11A', teacher: 'Samuel Olera', assistant: 'Susan Oyii', count: 20, type: 'Commercial' },
  { id: 'year-11B', class: 'Year 11B', teacher: 'Kore Ogbei', assistant: 'Betty Jacobs', count: 20, type: 'Art' },
  { id: 'year-11C', class: 'Year 11C', teacher: 'Eduard Cole', assistant: 'Michael Aigboka', count: 20, type: 'Science' },
  { id: 'year-12A', class: 'Year 12A', teacher: 'Michael Aigboka', assistant: 'Eduard Cole', count: 20, type: 'Commercial' },
  { id: 'year-12B', class: 'Year 12B', teacher: 'Michael Aigboka', assistant: 'Kore Ogbei', count: 20, type: 'Science' },
];

