export type Department = {
    id: number;
    name: string;
  };
  
  export type DepartmentCategory = {
    category: string;
    departments: Department[];
  };
  
  export const departmentData: DepartmentCategory[] = [
    {
      category: "Agriculture, Rural & Natural Resources",
      departments: [
        { id: 1, name: "Agriculture - Farmers Welfare Department" },
        { id: 2, name: "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare" },
        { id: 3, name: "Co-operation, Food and Consumer Protection Department" },
        { id: 4, name: "Natural Resources Department" },
        { id: 5, name: "Rural Development and Panchayat Raj Department" },
      ],
    },
    {
      category: "Health & Education",
      departments: [
        { id: 6, name: "Health and Family Welfare Department" },
        { id: 7, name: "School Education Department" },
        { id: 8, name: "Higher Education Department" },
      ],
    },
    {
      category: "Administration, Law & Governance",
      departments: [
        { id: 9, name: "Home, Prohibition and Excise Department" },
        { id: 10, name: "Human Resources Management Department" },
        { id: 11, name: "Law Department" },
        { id: 12, name: "Legislative Assembly Department" },
        { id: 13, name: "Mudalvarin Mugavari Department" },
        { id: 14, name: "Public Department" },
        { id: 15, name: "Public (Elections) Department" },
        { id: 16, name: "Revenue and Disaster Management Department" },
      ],
    },
    {
      category: "Welfare & Social Services",
      departments: [
        { id: 17, name: "Adi Dravidar and Tribal Welfare Department" },
        { id: 18, name: "BC, MBC & Minorities Welfare Department" },
        { id: 19, name: "Labour Welfare and Skill Development Department" },
        { id: 20, name: "Social Reforms Department" },
        { id: 21, name: "Social Welfare and Women Empowerment Department" },
        { id: 22, name: "Welfare of Differently Abled Persons" },
        { id: 23, name: "Youth Welfare and Sports Development Department" },
      ],
    },
    {
      category: "Infrastructure & Energy",
      departments: [
        { id: 24, name: "Energy Department" },
        { id: 25, name: "Highways and Minor Ports Department" },
        { id: 26, name: "Housing and Urban Development Department" },
        { id: 27, name: "Municipal Administration and Water Supply Department" },
        { id: 28, name: "Public Works Department" },
        { id: 29, name: "Transport Department" },
        { id: 30, name: "Water Resources Department" },
      ],
    },
    {
      category: "Finance, Economy & Planning",
      departments: [
        { id: 31, name: "Commercial Taxes and Registration Department" },
        { id: 32, name: "Finance Department" },
        { id: 33, name: "Planning, Development and Special Initiatives Department" },
        { id: 34, name: "Special Programme Implementation" },
      ],
    },
    {
      category: "Industries, IT & Commerce",
      departments: [
        { id: 35, name: "Handlooms, Handicrafts, Textiles and Khadi Department" },
        { id: 36, name: "Industries, Investment Promotion & Commerce Department" },
        { id: 37, name: "Information Technology and Digital Services Department" },
        { id: 38, name: "Micro, Small and Medium Enterprises Department" },
      ],
    },
    {
      category: "Culture, Environment & Tourism",
      departments: [
        { id: 39, name: "Environment, Climate Change and Forests Department" },
        { id: 40, name: "Tamil Development and Information Department" },
        { id: 41, name: "Tourism, Culture and Religious Endowments Department" },
      ],
    },
  ];
  
  