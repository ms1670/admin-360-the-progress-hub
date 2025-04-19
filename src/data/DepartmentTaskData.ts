export type Task = {
    id: number;
    title: string;
    department: string;
    member_name: string;
    attachment: string;
    due_date: string;
    status: "Pending" | "In Progress" | "Completed";
  };
  
  export type DepartmentTaskGroup = {
    department: string;
    tasks: Task[];
  };
  export const departmentTasks = [
    {
      department: "Agriculture - Farmers Welfare Department",
      tasks: [
        {
          id: 1,
          title: "Vivasaaya Panigal Muraimaiyaga Nadavadikkappadum",
          department: "Agriculture - Farmers Welfare Department",
          member_name: "Ramya",
          attachment: "/uploads/agriculture/task_1.pdf",
          due_date: "2025-04-20T12:00",
          status: "In Progress",
        },
        {
          id: 2,
          title: "Uzhavar Kootam Amaippu",
          department: "Agriculture - Farmers Welfare Department",
          member_name: "Lakshmi",
          attachment: "/uploads/agriculture/task_2.pdf",
          due_date: "2025-04-22T10:30",
          status: "Pending",
        },
      ],
    },
    {
      department: "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare",
      tasks: [
        {
          id: 3,
          title: "Aattu Maadu Suvaikkum Maruthuvam",
          department: "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare",
          member_name: "Ganesh",
          attachment: "/uploads/animal_husbandry/task_3.pdf",
          due_date: "2025-04-18T14:00",
          status: "Completed",
        },
        {
          id: 4,
          title: "Meen Valarppu Kalanjiyam Urpathi",
          department: "Animal Husbandry, Dairying, Fisheries and Fishermen Welfare",
          member_name: "Sindhu",
          attachment: "/uploads/animal_husbandry/task_4.pdf",
          due_date: "2025-04-24T16:00",
          status: "Pending",
        },
      ],
    },
    {
      department: "Co-operation, Food and Consumer Protection Department",
      tasks: [
        {
          id: 5,
          title: "Samaathana Vilai Nilaiyaith Thayaarippathu",
          department: "Co-operation, Food and Consumer Protection Department",
          member_name: "Karthik",
          attachment: "/uploads/food_protection/task_5.pdf",
          due_date: "2025-04-21T11:00",
          status: "In Progress",
        },
        {
          id: 6,
          title: "Vazhangum Porulgalai Paathukaappathu",
          department: "Co-operation, Food and Consumer Protection Department",
          member_name: "Devi",
          attachment: "/uploads/food_protection/task_6.pdf",
          due_date: "2025-04-25T15:00",
          status: "Pending",
        },
      ],
    },
    {
      department: "Natural Resources Department",
      tasks: [
        {
          id: 7,
          title: "Aayul Vaazhvum Iyarkkaiyum Kaappom",
          department: "Natural Resources Department",
          member_name: "Suresh",
          attachment: "/uploads/natural_resources/task_7.pdf",
          due_date: "2025-04-19T13:30",
          status: "Completed",
        },
        {
          id: 8,
          title: "Thanneerum Kaaduum Paathukaappu Seyal",
          department: "Natural Resources Department",
          member_name: "Meena",
          attachment: "/uploads/natural_resources/task_8.pdf",
          due_date: "2025-04-27T09:00",
          status: "In Progress",
        },
      ],
    },
    {
      department: "Rural Development and Panchayat Raj Department",
      tasks: [
        {
          id: 9,
          title: "Gramam Valarchi Thittam",
          department: "Rural Development and Panchayat Raj Department",
          member_name: "Vignesh",
          attachment: "/uploads/rural_development/task_9.pdf",
          due_date: "2025-04-26T10:00",
          status: "In Progress",
        },
        {
          id: 10,
          title: "Thittathil Thunai Nirvaagam",
          department: "Rural Development and Panchayat Raj Department",
          member_name: "Pavithra",
          attachment: "/uploads/rural_development/task_10.pdf",
          due_date: "2025-04-29T12:00",
          status: "Pending",
        },
      ],
    },
    {
      department: "Health and Family Welfare Department",
      tasks: [
        {
          id: 11,
          title: "Maruthuva Sevai Paridhigal",
          department: "Health and Family Welfare Department",
          member_name: "Saravanan",
          attachment: "/uploads/health/task_11.pdf",
          due_date: "2025-04-18T11:00",
          status: "Completed",
        },
        {
          id: 12,
          title: "Kudumba Marunthu Edukka Seyal",
          department: "Health and Family Welfare Department",
          member_name: "Anjali",
          attachment: "/uploads/health/task_12.pdf",
          due_date: "2025-04-22T09:30",
          status: "Pending",
        },
      ],
    },
    {
      department: "School Education Department",
      tasks: [
        {
          id: 13,
          title: "Palli Ariviyal Munaivor Paadippu",
          department: "School Education Department",
          member_name: "Murugan",
          attachment: "/uploads/school_education/task_13.pdf",
          due_date: "2025-04-24T14:30",
          status: "In Progress",
        },
        {
          id: 14,
          title: "Vidyalaya Thittam Nokku",
          department: "School Education Department",
          member_name: "Nithya",
          attachment: "/uploads/school_education/task_14.pdf",
          due_date: "2025-04-28T16:00",
          status: "Pending",
        },
      ],
    },
    {
      department: "Higher Education Department",
      tasks: [
        {
          id: 15,
          title: "Kalvi Maanavarukku Thunaivugal",
          department: "Higher Education Department",
          member_name: "Kannan",
          attachment: "/uploads/higher_education/task_15.pdf",
          due_date: "2025-04-21T10:30",
          status: "Completed",
        },
        {
          id: 16,
          title: "Palkalaikazhagam Kaatchigal",
          department: "Higher Education Department",
          member_name: "Divya",
          attachment: "/uploads/higher_education/task_16.pdf",
          due_date: "2025-04-25T11:45",
          status: "Pending",
        },
      ],
    },
    {
      department: "Home, Prohibition and Excise Department",
      tasks: [
        {
          id: 17,
          title: "Samuga Suraksha Seyal",
          department: "Home, Prohibition and Excise Department",
          member_name: "Ravi",
          attachment: "/uploads/home_department/task_17.pdf",
          due_date: "2025-04-23T13:00",
          status: "In Progress",
        },
        {
          id: 18,
          title: "Madhubaanam Niruththiya Kootani",
          department: "Home, Prohibition and Excise Department",
          member_name: "Aarthi",
          attachment: "/uploads/home_department/task_18.pdf",
          due_date: "2025-04-30T15:30",
          status: "Pending",
        },
      ],
    },
    {
      department: "Human Resources Management Department",
      tasks: [
        {
          id: 19,
          title: "Udyogathil Arimugam Thittam",
          department: "Human Resources Management Department",
          member_name: "Harish",
          attachment: "/uploads/hrm/task_19.pdf",
          due_date: "2025-04-26T09:00",
          status: "Completed",
        },
        {
          id: 20,
          title: "Anubavathin Paadhaiyum Valarchi",
          department: "Human Resources Management Department",
          member_name: "Shalini",
          attachment: "/uploads/hrm/task_20.pdf",
          due_date: "2025-05-01T14:00",
          status: "Pending",
        },
      ],
    },
  ];
  